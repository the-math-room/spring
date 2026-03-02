import { CONFIG } from '../config.js'; // Add this import

export const recordAttempt = async (
  supabase,
  { student_id, level, outcome }
) => {
  const { data, error } = await supabase
    .from(CONFIG.TABLES.TIMESTAMPS)
    .insert([
      {
        student_id: student_id,
        scaffolding_level: level,
        outcome: outcome,
      },
    ])
    .select();

  if (error) throw error;
  return data;
};

export const fetchStudents = async (supabase) => {
  const { data, error } = await supabase
    .from('students')
    .select('id, first_name, last_name, preferred_name')
    .order('first_name', { ascending: true });

  if (error) throw error;

  // Transform the data so each student has a "displayName"
  return data.map((s) => ({
    id: s.id,
    fullName: `${s.first_name} ${s.last_name || ''}`.trim(),
    displayName: s.preferred_name || s.first_name, // Priority: preferred_name > First Name
  }));
};

export const recordAttemptAndGetStats = async (supabase, payload) => {
  const { error } = await supabase.rpc('record_and_smooth', {
    p_student_id: payload.student_id,
    p_level: payload.level,
    p_outcome: payload.outcome,
  });

  if (error) throw error;
};

/**
 * Verifies the database schema without inserting any data.
 */
export const validateSchema = async (supabase) => {
  // We select the specific columns we care about, with a limit of 0
  // so we don't actually pull any data.
  const { error } = await supabase
    .from(CONFIG.TABLES.TIMESTAMPS)
    .select('student_id, scaffolding_level, outcome')
    .limit(0);

  if (error) throw error;
  return true;
};

// Fetch only students who are marked as present
export const fetchPresentStudents = async (supabase) => {
  const { data, error } = await supabase
    .from('students')
    .select('id, first_name, preferred_name')
    .eq('is_absent', false)
    .order('first_name', { ascending: true });

  if (error) throw error;

  return data.map((s) => ({
    id: s.id,
    displayName: s.preferred_name || s.first_name,
  }));
};

// Toggle a student's absence on the server
export const markAbsent = async (supabase, studentId) => {
  const { error } = await supabase
    .from('students')
    .update({ is_absent: true })
    .eq('id', studentId);

  if (error) throw error;
};

// Reset everyone to present
export const resetAllAttendance = async (supabase) => {
  // This MUST match the name in your Supabase 'Functions' list
  const { error } = await supabase.rpc('reset_attendance');

  if (error) {
    console.error('RPC Reset Error:', error.message);
    throw error;
  }
  return true;
};
