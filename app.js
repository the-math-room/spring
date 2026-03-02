import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from './config.js';
import * as db from './services/db.js';
import * as ui from './services/ui.js';
import * as auth from './services/auth.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// 1. Safe Element Selection
const elements = {
  output: document.getElementById('output'),
  status: document.getElementById('connectionStatus'),
  loginBtn: document.getElementById('loginBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
  resetBtn: document.getElementById('resetBtn'), // New: The Reset Trigger
  emailInput: document.getElementById('teacherEmail'),
  passInput: document.getElementById('teacherPassword'),
  loginZone: document.getElementById('login-zone'),
  teacherActions: document.getElementById('teacher-actions'),
};

// 2. Handlers
const handleLogin = async () => {
  const email = elements.emailInput?.value;
  const password = elements.passInput?.value;

  if (!email || !password) return;

  try {
    ui.updateStatus(elements.output, 'Logging in...', 'loading');
    await auth.signInWithPassword(supabase, email, password);
    await initApp();
  } catch (err) {
    ui.updateStatus(elements.output, 'Login Failed: ' + err.message, 'error');
  }
};

const handleLogout = async () => {
  try {
    await auth.signOut(supabase);
    await initApp();
  } catch (err) {
    console.error('Logout error:', err);
  }
};

const handleClassReset = async () => {
  // 1. Safety check so you don't accidentally reset mid-lesson
  if (!confirm("Reset all students to 'Present' for the new period?")) return;

  try {
    ui.setButtonLoading(elements.resetBtn, true, 'Resetting...');

    // 2. The Server Call
    await db.resetAllAttendance(supabase);

    // 3. Success Feedback
    ui.updateStatus(
      elements.output,
      'Success: All students are now Active.',
      'success'
    );
  } catch (err) {
    console.error('Reset failed:', err);
    ui.updateStatus(elements.output, 'Error: ' + err.message, 'error');
  } finally {
    ui.setButtonLoading(elements.resetBtn, false);
  }
};

// 3. Initialization Logic
const initApp = async () => {
  try {
    const user = await auth.getCurrentUser(supabase);

    if (!user) {
      if (elements.loginZone) elements.loginZone.style.display = 'block';
      if (elements.teacherActions)
        elements.teacherActions.style.display = 'none';
      if (elements.status) elements.status.innerText = 'Not Connected';
    } else {
      if (elements.loginZone) elements.loginZone.style.display = 'none';
      if (elements.teacherActions)
        elements.teacherActions.style.display = 'block';
      if (elements.status) elements.status.innerText = 'Connected';

      // Quick Roster Check
      const students = await db.fetchPresentStudents(supabase);
      ui.updateStatus(
        elements.output,
        `${students.length} students in the room. Ready!`,
        'success'
      );
    }
  } catch (err) {
    console.error('Init error:', err);
  }
};

// 4. Safe Listener Binding
elements.loginBtn?.addEventListener('click', handleLogin);
elements.logoutBtn?.addEventListener('click', handleLogout);
elements.resetBtn?.addEventListener('click', async () => {
  console.log('Reset button clicked!'); // If you don't see this in F12, the ID is wrong.
  await handleClassReset();
});

initApp();
