import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from './config.js';
import * as db from './services/db.js';
import * as ui from './services/ui.js';
import * as auth from './services/auth.js'; // Moved imports to top

// 1. Initialize Client
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// 2. Cache DOM Elements
const elements = {
  btn: document.getElementById('testBtn'),
  output: document.getElementById('output'),
  status: document.getElementById('connectionStatus'),
  loginBtn: document.getElementById('loginBtn'),
  emailInput: document.getElementById('teacherEmail'),
  passInput: document.getElementById('teacherPassword'),
  loginZone: document.getElementById('login-zone'),
};

// 3. Main Logic: Handlers
const handleSubmission = async () => {
  const startTime = performance.now();
  ui.setButtonLoading(elements.btn, true);

  try {
    await db.recordAttempt(supabase, 'Teacher Session'); // Updated name for clarity
    const latency = (performance.now() - startTime).toFixed(2);
    ui.updateStatus(elements.output, `Saved! Latency: ${latency}ms`, 'success');
  } catch (err) {
    ui.updateStatus(elements.output, `Error: ${err.message}`, 'error');
  } finally {
    ui.setButtonLoading(elements.btn, false);
  }
};

const handleLogin = async () => {
  const email = elements.emailInput.value;
  const password = elements.passInput.value;

  try {
    ui.updateStatus(elements.output, 'Logging in...', 'loading');

    // This will now find the function we just added to services/auth.js
    await auth.signInWithPassword(supabase, email, password);

    initApp();
  } catch (err) {
    ui.updateStatus(elements.output, 'Login Failed: ' + err.message, 'error');
  }
};

// 4. Initialization
const initApp = async () => {
  try {
    const user = await auth.getCurrentUser(supabase);

    if (!user) {
      ui.updateStatus(elements.output, 'Teacher login required.', 'info');
      elements.btn.style.display = 'none';
      elements.loginZone.style.display = 'block';
    } else {
      ui.updateStatus(elements.output, `Welcome, ${user.email}`, 'success');
      elements.btn.style.display = 'block';
      elements.loginZone.style.display = 'none';
      elements.status.innerText = 'Connected';
      initRealtime();
    }
  } catch (err) {
    ui.updateStatus(elements.output, 'Session Error: ' + err.message, 'error');
  }
};

// 5. Event Listeners
elements.btn.addEventListener('click', handleSubmission);
elements.loginBtn.addEventListener('click', handleLogin);

initApp();
