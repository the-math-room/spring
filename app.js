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
};

// 3. Main Logic: Handlers
const handleSubmission = async () => {
  const startTime = performance.now();
  ui.setButtonLoading(elements.btn, true);

  try {
    // Now using the current session user ID if we wanted,
    // but sticking to your 'Student Alpha' for now.
    await db.recordAttempt(supabase, 'Student Alpha');

    const latency = (performance.now() - startTime).toFixed(2);
    ui.updateStatus(elements.output, `Saved! Latency: ${latency}ms`, 'success');
  } catch (err) {
    console.error('Submission failed:', err);
    ui.updateStatus(elements.output, `Error: ${err.message}`, 'error');
  } finally {
    ui.setButtonLoading(elements.btn, false);
  }
};

// 4. Initialization & Auth
const initApp = async () => {
  try {
    const user = await auth.getCurrentUser(supabase);

    if (!user) {
      ui.updateStatus(elements.output, 'Teacher login required.', 'error');
      elements.btn.style.display = 'none'; // Hide the button from non-teachers
      // Optional: showLoginUI();
    } else {
      ui.updateStatus(elements.output, `Welcome, ${user.email}`, 'success');
      elements.btn.style.display = 'block';
      initRealtime();
    }
  } catch (err) {
    ui.updateStatus(elements.output, 'Session Error: ' + err.message, 'error');
  }
};

// 5. Realtime Subscription
const initRealtime = () => {
  return supabase
    .channel('classroom-activity')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: CONFIG.TABLES.TIMESTAMPS },
      (payload) => {
        console.log('🔔 Realtime Update:', payload.new);
      }
    )
    .subscribe();
};

// 6. Execution
elements.btn.addEventListener('click', handleSubmission);
initApp();

const loginBtn = document.getElementById('loginBtn');
const emailInput = document.getElementById('teacherEmail');

loginBtn.addEventListener('click', async () => {
  const email = emailInput.value;
  try {
    ui.updateStatus(elements.output, 'Sending magic link...', 'loading');
    await auth.signInWithMagicLink(supabase, email);
    ui.updateStatus(
      elements.output,
      'Check your email for the login link!',
      'success'
    );
  } catch (err) {
    ui.updateStatus(elements.output, 'Login Error: ' + err.message, 'error');
  }
});
