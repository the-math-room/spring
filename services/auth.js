/**
 * Sends a Magic Link to the teacher's email.
 */
export const signInWithMagicLink = async (supabase, email) => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: window.location.origin, // Returns you to your GH Pages site
    },
  });
  if (error) throw error;
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
