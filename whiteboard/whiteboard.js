import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from '../config.js';
import * as db from '../services/db.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// --- 1. DRAWING ENGINE ---
const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let isEraser = false;
let penColor = '#000000';

function setupCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
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

  // THE MAGIC: destination-out makes pixels transparent (erasing only ink)
  ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
  ctx.strokeStyle = isEraser ? 'rgba(0,0,0,1)' : penColor;
  ctx.lineWidth = isEraser ? 60 : 4;

  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
};

const endDrawing = async () => {
  if (isDrawing) {
    isDrawing = false;
    // Save to database as a Base64 string
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

// --- 2. TOOLBAR CONTROLS ---
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

document.getElementById('clear-canvas').onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

// --- 3. APP LOGIC ---
const state = {
  activePool: [],
  absentPool: [],
  currentStudent: null,
  isReady: false,
};
const elements = {
  nameDisplay: document.getElementById('student-name'),
  absenteeList: document.getElementById('absentee-list'),
};

async function init() {
  state.activePool = await db.fetchPresentStudents(supabase);
  state.isReady = true;
  await syncAbsenteeUI();

  // NEW: Load the saved ink from the database
  const savedInk = await db.fetchCanvasState(supabase);
  if (savedInk) {
    const img = new Image();
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.src = savedInk;
  }
}

function pickStudent() {
  if (state.activePool.length === 0) return;
  const picked =
    state.activePool[Math.floor(Math.random() * state.activePool.length)];
  state.currentStudent = picked;
  elements.nameDisplay.innerText = picked.displayName;
  // Optional: ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function handleResult(outcome) {
  if (!state.currentStudent) return;
  await db.recordAttemptAndGetStats(supabase, {
    student_id: state.currentStudent.id,
    level: 1,
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

document.getElementById('btn-next-student').onclick = pickStudent;
document.getElementById('btn-correct').onclick = () => handleResult('correct');
document.getElementById('btn-incorrect').onclick = () =>
  handleResult('incorrect');
document.getElementById('btn-absent').onclick = () => handleResult('absent');

init();
