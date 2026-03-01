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
    .select('id, first_name, last_name, nickname')
    .order('first_name', { ascending: true });

  if (error) throw error;

  // Transform the data so each student has a "displayName"
  return data.map((s) => ({
    id: s.id,
    fullName: `${s.first_name} ${s.last_name || ''}`.trim(),
    displayName: s.nickname || s.first_name, // Priority: Nickname > First Name
  }));
};

export const recordAttemptAndGetStats = async (
  supabase,
  { student_id, level, outcome }
) => {
  const { data, error } = await supabase.rpc('record_and_smooth', {
    p_student_id: student_id,
    p_level: level,
    p_outcome: outcome,
  });

  if (error) throw error;
  return data; // This returns the single float from your SQL function
};
