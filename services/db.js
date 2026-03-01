import { CONFIG } from '../config.js'; // Add this import

export const recordAttempt = async (supabase, studentName) => {
    if (!studentName) throw new Error("Student name is required");

    const { data, error } = await supabase
        .from(CONFIG.TABLES.TIMESTAMPS)
        .insert([{ student_name: studentName }])
        .select();

    if (error) throw error;
    return data;
};