import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from '../config.js';
import * as db from '../services/db.js';
import { PROBLEM_BANK } from '../data/problemSet.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// --- 1. STATE & ELEMENTS ---
const state = {
  activePool: [],
  absentPool: [],
  currentStudent: null,
  isReady: false,
  currentLevel: 1, // Default to Level 1
};

// Tracks problem progression per level so they don't repeat immediately
const problemIndexes = { 1: 0, 2: 0 };

const elements = {
  nameDisplay: document.getElementById('student-name'),
  absenteeList: document.getElementById('absentee-list'),
  questionText: document.getElementById('question-text'),
  questionPrompt: document.getElementById('question-prompt'),
  caseSelector: document.getElementById('case-selector'),
};

const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let isEraser = false;
let penColor = '#000000';

// --- 2. DRAWING ENGINE ---
function setupCanvas() {
  const tempInk = canvas.toDataURL();
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const img = new Image();
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  img.src = tempInk;
}

window.addEventListener('resize', setupCanvas);
setupCanvas();

const getPos = (e) => {
  const rect = canvas.getBoundingClientRect();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: clientX - rect.left, y: clientY - rect.top };
};

const start = (e) => {
  isDrawing = true;
  const pos = getPos(e);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
};

const draw = (e) => {
  if (!isDrawing) return;
  const pos = getPos(e);
  ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
  ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : penColor;
  ctx.lineWidth = isEraser ? 60 : 4;
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

const endDrawing = async () => {
  if (isDrawing) {
    isDrawing = false;
    const dataUrl = canvas.toDataURL();
    try {
      await db.saveCanvasState(supabase, dataUrl);
    } catch (err) {
      console.error('Failed to save ink:', err);
    }
  }
};

canvas.addEventListener('mousedown', start);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', endDrawing);
canvas.addEventListener('touchstart', start);
canvas.addEventListener(
  'touchmove',
  (e) => {
    e.preventDefault();
    draw(e);
  },
  { passive: false }
);
window.addEventListener('touchend', endDrawing);

// --- 3. SYNC ENGINE (Multi-Device Logic) ---
function syncFromPayload(newData) {
  // Sync Ink
  if (newData.canvas_data !== undefined) {
    if (!newData.canvas_data || newData.canvas_data.length < 10) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = newData.canvas_data;
    }
  }

  // Sync Student Name & Problems
  if (newData.active_student_id) {
    const student = state.activePool.find(
      (s) => s.id === newData.active_student_id
    );
    if (student && state.currentStudent?.id !== student.id) {
      state.currentStudent = student;
      elements.nameDisplay.innerText = student.displayName;
    }
  }

  // Sync Problem Text (if you choose to persist problem state later)
  if (newData.current_problem_latex) {
    elements.questionText.innerHTML = `\\(${newData.current_problem_latex}\\)`;
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) =>
        console.log('MathJax error:', err)
      );
    } else {
      console.warn('MathJax not loaded yet. Retrying in 500ms...');
      setTimeout(() => {
        if (window.MathJax) window.MathJax.typesetPromise();
      }, 500);
    }
  }
}

async function loadRemoteState() {
  const { data, error } = await supabase
    .from('whiteboard_state')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) return console.error('Initial load failed:', error);
  if (data) syncFromPayload(data);
}

// --- 4. APP LOGIC ---
async function init() {
  state.activePool = await db.fetchPresentStudents(supabase);
  state.isReady = true;
  await syncAbsenteeUI();
  await loadRemoteState();

  // Setup Level Selector
  if (elements.caseSelector) {
    elements.caseSelector.onchange = (e) => {
      state.currentLevel = parseInt(e.target.value);
    };
  }

  // Realtime Listener
  supabase
    .channel('whiteboard_sync')
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'whiteboard_state' },
      (payload) => syncFromPayload(payload.new)
    )
    .subscribe();

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') loadRemoteState();
  });
}

async function pickStudent() {
  if (state.activePool.length === 0 || !state.isReady) return;

  // 1. Pick Student (Random)
  const picked =
    state.activePool[Math.floor(Math.random() * state.activePool.length)];

  // 2. Pick Problem (Sequential from Bank)
  const currentList = PROBLEM_BANK[state.currentLevel];
  const currentIndex = problemIndexes[state.currentLevel];
  const problem = currentList[currentIndex % currentList.length];

  // Advance index for next time
  problemIndexes[state.currentLevel]++;

  // 3. Update UI Locally (Snappy response)
  state.currentStudent = picked;
  elements.nameDisplay.innerText = picked.displayName;
  elements.questionText.innerHTML = `\\(${problem.latex}\\)`;
  if (elements.questionPrompt)
    elements.questionPrompt.innerText = problem.prompt;

  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise().catch((err) =>
      console.log('MathJax error:', err)
    );
  } else {
    console.warn('MathJax not loaded yet. Retrying in 500ms...');
    setTimeout(() => {
      if (window.MathJax) window.MathJax.typesetPromise();
    }, 500);
  }

  // 4. Update DB (Syncs other devices)
  await supabase
    .from('whiteboard_state')
    .update({
      active_student_id: picked.id,
      current_problem_latex: problem.latex,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);

  // Auto-clear ink for new student
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function handleResult(outcome) {
  if (!state.currentStudent) return;
  await db.recordAttemptAndGetStats(supabase, {
    student_id: state.currentStudent.id,
    level: state.currentLevel,
    outcome,
  });
  state.activePool = await db.fetchPresentStudents(supabase);
  await syncAbsenteeUI();
  pickStudent();
}

async function syncAbsenteeUI() {
  const { data } = await supabase
    .from('students')
    .select('*')
    .eq('is_absent', true);
  state.absentPool = data || [];
  elements.absenteeList.innerHTML = '';
  state.absentPool.forEach((s) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = s.preferred_name || s.first_name;
    btn.className = 'restore-btn';
    btn.onclick = async () => {
      await supabase
        .from('students')
        .update({ is_absent: false })
        .eq('id', s.id);
      state.activePool = await db.fetchPresentStudents(supabase);
      await syncAbsenteeUI();
    };
    li.appendChild(btn);
    elements.absenteeList.appendChild(li);
  });
}

// --- 5. TOOLBAR & CONTROLS ---
document.querySelectorAll('.color-btn').forEach((btn) => {
  btn.onclick = () => {
    isEraser = false;
    penColor = btn.dataset.color;
    document
      .querySelectorAll('.color-btn, #eraser-btn')
      .forEach((el) => el.classList.remove('active'));
    btn.classList.add('active');
  };
});

document.getElementById('eraser-btn').onclick = function () {
  isEraser = true;
  document
    .querySelectorAll('.color-btn')
    .forEach((el) => el.classList.remove('active'));
  this.classList.add('active');
};

const actionButtons = {
  'btn-next-student': pickStudent,
  'btn-correct': () => handleResult('correct'),
  'btn-incorrect': () => handleResult('incorrect'),
  'btn-absent': () => handleResult('absent'),
  'clear-canvas': async () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    await supabase
      .from('whiteboard_state')
      .update({ canvas_data: '' })
      .eq('id', 1);
  },
};

Object.entries(actionButtons).forEach(([id, func]) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      func();
    });
  }
});

init();
