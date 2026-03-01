import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from '../config.js';
import * as db from '../services/db.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

const state = {
  students: [],
  currentStudent: null,
  level: 1,
  isReady: false,
};

const elements = {
  nameDisplay: document.getElementById('student-name'),
  nextBtn: document.getElementById('btn-next-student'),
  // ... (keep your other elements)
};

async function init() {
  try {
    console.log('Fetching roster...');
    const roster = await db.fetchStudents(supabase);
    console.log('Roster loaded:', roster);

    if (!roster || roster.length === 0) {
      elements.nameDisplay.innerText = 'Error: Roster Empty';
      return;
    }

    state.students = roster;
    state.isReady = true;
    elements.nameDisplay.innerText = 'Ready!';
  } catch (err) {
    console.error('Init failed:', err);
    elements.nameDisplay.innerText = 'Connection Error';
  }
}

function pickStudent() {
  if (!state.isReady) return console.warn('Not ready yet!');

  // Uniform Sample with Replacement
  const randomIndex = Math.floor(Math.random() * state.students.length);
  const picked = state.students[randomIndex];

  console.log('Picked Student:', picked);
  state.currentStudent = picked;

  // Visual Update
  elements.nameDisplay.classList.add('shuffling');

  // Ensure we use .displayName (from your db.js transform)
  setTimeout(() => {
    elements.nameDisplay.innerText = picked.displayName || 'Unknown';
    elements.nameDisplay.classList.remove('shuffling');
  }, 150);
}

elements.nextBtn.onclick = pickStudent;
init();
