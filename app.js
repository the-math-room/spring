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
    elements.btn.disabled = true; // Lockdown button until auth is ready
    ui.updateStatus(elements.output, 'Initializing session...', 'loading');

    let user = await auth.getCurrentUser(supabase);

    if (!user) {
      user = await auth.signInAnonymously(supabase);
    }

    // Update UI with Auth Status
    elements.status.innerText = 'Connected';
    ui.updateStatus(
      elements.output,
      `Ready! Student ID: ${user.id.slice(0, 8)}`,
      'success'
    );
    elements.btn.disabled = false;

    // Start listening for changes
    initRealtime();
  } catch (err) {
    console.error('Initialization error:', err);
    ui.updateStatus(elements.output, 'Auth Failed: ' + err.message, 'error');
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
