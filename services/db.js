/**
 * Records a student attempt in the database.
 * @param {Object} supabase - The injected supabase client
 * @param {string} studentName 
 */
export const recordAttempt = async (supabase, studentName) => {
    if (!studentName) throw new Error("Student name is required");

    const { data, error } = await supabase
        .from('timestamps')
        .insert([{ student_name: studentName }])
        .select();

    if (error) throw error;
    return data;
};