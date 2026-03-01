import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { CONFIG } from './config.js';
import * as db from './services/db.js';
import * as ui from './services/ui.js';

// 1. Initialize Client
const supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);

// 2. Cache DOM Elements
const elements = {
    btn: document.getElementById('testBtn'),
    output: document.getElementById('output')
};

// 3. Main Logic: Handlers
const handleSubmission = async () => {
    const startTime = performance.now(); // Start timer for latency check
    ui.setButtonLoading(elements.btn, true);
    
    try {
        // We'll pass 'Student Alpha' or any identifier you want
        await db.recordAttempt(supabase, 'Student Alpha');
        
        const latency = (performance.now() - startTime).toFixed(2);
        const timeStr = new Date().toLocaleTimeString();
        
        ui.updateStatus(
            elements.output, 
            `Saved at ${timeStr} (Latency: ${latency}ms)`, 
            'success'
        );
    } catch (err) {
        console.error("Submission failed:", err);
        ui.updateStatus(elements.output, `Error: ${err.message}`, 'error');
    } finally {
        ui.setButtonLoading(elements.btn, false);
    }
};

// 4. Realtime Subscription: The "Live Feed"
const initRealtime = () => {
    return supabase
        .channel('classroom-activity')
        .on(
            'postgres_changes',
            { event: 'INSERT', schema: 'public', table: CONFIG.TABLES.TIMESTAMPS },
            (payload) => {
                console.log('🔔 Realtime Update:', payload.new);
                // Tip: You can trigger a UI refresh here to show other students' activity!
            }
        )
        .subscribe((status) => {
            console.log(`Realtime status: ${status}`);
        });
};

// 5. Wire up everything
elements.btn.addEventListener('click', handleSubmission);
initRealtime();