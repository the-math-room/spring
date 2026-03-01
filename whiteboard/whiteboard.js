import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from '../config.js';
import * as db from '../services/db.js';

// 1. Initialize Supabase
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

const state = {
  students: [],
  currentStudent: null,
  level: 1,
};

const elements = {
  nameDisplay: document.getElementById('student-name'),
  masteryDisplay: document.getElementById('confidence-interval'),
  nextBtn: document.getElementById('btn-next-student'),
  levelBtns: document.querySelectorAll('.level-btn'),
  correctBtn: document.getElementById('btn-correct'),
  incorrectBtn: document.getElementById('btn-incorrect'),
  absentBtn: document.getElementById('btn-absent'),
};

/**
 * Initialization: Setup roster and initial mastery view
 */
async function init() {
  try {
    // Check if user is logged in (Security Guard)
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = '../index.html';
      return;
    }

    // Load roster and initial stats
    state.students = await db.fetchStudents(supabase);

    if (state.students.length === 0) {
      elements.nameDisplay.innerText = 'No Students Found';
    } else {
      elements.nameDisplay.innerText = 'Ready!';
      // Optional: Fetch current mastery from DB so it's not "0%" on refresh
      // refreshMasteryDisplay();
    }
  } catch (err) {
    console.error('Initialization failed:', err);
    elements.nameDisplay.innerText = 'Connection Error';
  }
}

/**
 * Random Selection: Uniform with Replacement
 */
function pickStudent() {
  if (!state.students.length) return;

  const randomIndex = Math.floor(Math.random() * state.students.length);
  const picked = state.students[randomIndex];
  state.currentStudent = picked;

  // High-visibility update
  elements.nameDisplay.classList.add('shuffling');

  // Use timeout to allow CSS transition to trigger
  setTimeout(() => {
    elements.nameDisplay.innerText = picked.displayName;
    elements.nameDisplay.classList.remove('shuffling');
  }, 150);
}

/**
 * Outcome Handling: Server-side Exponential Smoothing
 */
async function handleResult(outcome) {
  // Guard: Don't record if no student is currently picked
  if (!state.currentStudent) {
    alert('Please pick a student first!');
    return;
  }

  try {
    // 1. Send to Supabase RPC (Server-side smoothing math)
    const newPercent = await db.recordAttemptAndGetStats(supabase, {
      student_id: state.currentStudent.id,
      level: state.level,
      outcome: outcome,
    });

    // 2. Update Mastery UI (Exponential Smoothing Result)
    if (elements.masteryDisplay) {
      elements.masteryDisplay.innerText = `Mastery: ${Number(newPercent).toFixed(0)}%`;
    }

    // 3. Auto-pick next student for classroom flow
    pickStudent();
  } catch (err) {
    console.error('Mastery update failed:', err);
    alert('Error saving data. Check connection.');
  }
}

// --- Event Listeners ---

elements.nextBtn.onclick = pickStudent;
elements.correctBtn.onclick = () => handleResult('correct');
elements.incorrectBtn.onclick = () => handleResult('incorrect');
elements.absentBtn.onclick = () => handleResult('absent');

elements.levelBtns.forEach((btn) => {
  btn.onclick = () => {
    // UI Toggle
    elements.levelBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // State Update
    state.level = parseInt(btn.dataset.level);

    // Clear display for new level context
    elements.nameDisplay.innerText = `Level ${state.level} Ready`;
    state.currentStudent = null;
  };
});

// Run Init
init();
