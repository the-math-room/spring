/**
 * Signs in the teacher using email and password.
 */
export const signInWithPassword = async (supabase, email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
};

export const signOut = async (supabase) => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async (supabase) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
