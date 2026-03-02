import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from '../config.js';
import * as db from '../services/db.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

const state = {
  allStudents: [],
  activePool: [],
  absentPool: [],
  currentStudent: null,
  level: 1,
  isReady: false,
};

const elements = {
  nameDisplay: document.getElementById('student-name'),
  masteryDisplay: document.getElementById('confidence-interval'),
  absenteeList: document.getElementById('absentee-list'),
  nextBtn: document.getElementById('btn-next-student'),
  correctBtn: document.getElementById('btn-correct'),
  incorrectBtn: document.getElementById('btn-incorrect'),
  absentBtn: document.getElementById('btn-absent'),
  levelBtns: document.querySelectorAll('.level-btn'),
};

/**
 * 1. INITIALIZATION
 * FIX: Now fetches present students so refreshes respect the "Bench".
 */
async function init() {
  try {
    // We fetch the master roster for reference, but draw from present students
    const [roster, present] = await Promise.all([
      db.fetchStudents(supabase),
      db.fetchPresentStudents(supabase),
    ]);

    if (!roster || roster.length === 0) {
      elements.nameDisplay.innerText = 'Error: Roster Empty';
      return;
    }

    state.allStudents = roster;
    state.activePool = present;
    state.isReady = true;

    elements.nameDisplay.innerText = 'Ready!';

    // Sync the sidebar UI to show who is currently benched on the server
    await syncAbsenteeUI();
  } catch (err) {
    console.error('Init failed:', err);
    elements.nameDisplay.innerText = `Error: ${err.message || 'Check Console'}`;
  }
}

/**
 * 2. SELECTION LOGIC
 */
function pickStudent() {
  if (!state.isReady) return;
  if (state.activePool.length === 0) {
    elements.nameDisplay.innerText = 'All Students Absent';
    return;
  }

  const randomIndex = Math.floor(Math.random() * state.activePool.length);
  const picked = state.activePool[randomIndex];

  state.currentStudent = picked;

  elements.nameDisplay.classList.add('shuffling');
  setTimeout(() => {
    elements.nameDisplay.innerText = picked.displayName;
    elements.nameDisplay.classList.remove('shuffling');
  }, 150);
}

/**
 * 3. OUTCOME & ABSENCE HANDLING
 * FIX: Consolidated to use the record_and_smooth RPC for all outcomes.
 */
async function handleResult(outcome) {
  if (!state.currentStudent) return;

  const studentId = state.currentStudent.id;

  // 1. Show a loading state to indicate we are waiting on the SERVER
  elements.nameDisplay.innerText = 'Syncing...';
  state.currentStudent = null;

  try {
    // 2. FORCE the server to process the result
    await db.recordAttemptAndGetStats(supabase, {
      student_id: studentId,
      level: state.level,
      outcome: outcome,
    });

    // 3. RE-FETCH the entire reality from the database
    // This is the only way state.activePool gets updated.
    state.activePool = await db.fetchPresentStudents(supabase);

    // 4. Update the sidebar based on what the database says
    await syncAbsenteeUI();

    // 5. Only now do we pick the next student
    pickStudent();
  } catch (err) {
    console.error('Server sync failed:', err);
    alert('Database Error: Action not recorded.');
    // Re-fetch to recover state
    state.activePool = await db.fetchPresentStudents(supabase);
    pickStudent();
  }
}

// Ensure the listener is correct
elements.absentBtn.onclick = () => handleResult('absent');

/**
 * 4. ABSENCE MANAGEMENT (RE-SYNC)
 */
function renderAbsenteeList() {
  if (!elements.absenteeList) return;
  elements.absenteeList.innerHTML = '';

  state.absentPool.forEach((student) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerText = student.preferred_name || student.first_name;
    btn.className = 'restore-btn';
    btn.onclick = () => restoreStudent(student.id);
    li.appendChild(btn);
    elements.absenteeList.appendChild(li);
  });
}

async function restoreStudent(studentId) {
  try {
    // Update the database presence flag
    const { error } = await supabase
      .from('students')
      .update({ is_absent: false })
      .eq('id', studentId);

    if (error) throw error;

    // Refresh everything
    state.activePool = await db.fetchPresentStudents(supabase);
    await syncAbsenteeUI();

    console.log('Student restored.');
  } catch (err) {
    console.error('Failed to restore student:', err);
    alert('Check connection: Could not un-bench student.');
  }
}

async function syncAbsenteeUI() {
  const { data } = await supabase
    .from('students')
    .select('*')
    .eq('is_absent', true);

  state.absentPool = data || [];
  renderAbsenteeList();
}

/**
 * 5. EVENT LISTENERS
 */
elements.nextBtn.onclick = pickStudent;
elements.correctBtn.onclick = () => handleResult('correct');
elements.incorrectBtn.onclick = () => handleResult('incorrect');
elements.absentBtn.onclick = () => handleResult('absent'); // Consolidate to handleResult

elements.levelBtns.forEach((btn) => {
  btn.onclick = () => {
    elements.levelBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    state.level = parseInt(btn.dataset.level);
    elements.nameDisplay.innerText = `Level ${state.level} Ready`;
    state.currentStudent = null;
  };
});

init();
