import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from './config.js';
import * as db from './services/db.js';
import * as ui from './services/ui.js';
import * as auth from './services/auth.js';

const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// 1. Safe Element Selection
const elements = {
  btn: document.getElementById('testBtn'),
  output: document.getElementById('output'),
  status: document.getElementById('connectionStatus'),
  loginBtn: document.getElementById('loginBtn'),
  logoutBtn: document.getElementById('logoutBtn'),
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

const handleDiagnostic = async () => {
  // 1. Turns into "Pinging..."
  ui.setButtonLoading(elements.btn, true, 'Pinging...');

  try {
    await db.recordAttempt(supabase, {
      student_id: null,
      level: 1,
      outcome: 'correct',
    });
    ui.updateStatus(elements.output, 'Database Connection: OK', 'success');
  } catch (err) {
    ui.updateStatus(elements.output, 'DB Error: ' + err.message, 'error');
  } finally {
    // 2. Turns back into "Run Diagnostic Ping" (or whatever was there)
    ui.setButtonLoading(elements.btn, false);
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

      // Verification Ping
      const students = await db.fetchStudents(supabase);
      ui.updateStatus(
        elements.output,
        `${students.length} students in roster. Ready!`,
        'success'
      );
    }
  } catch (err) {
    console.error('Init error:', err);
  }
};

// 4. Safe Listener Binding (Using Optional Chaining)
elements.loginBtn?.addEventListener('click', handleLogin);
elements.logoutBtn?.addEventListener('click', handleLogout);
elements.btn?.addEventListener('click', handleDiagnostic);

initApp();
