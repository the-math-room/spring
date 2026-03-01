export const signInAnonymously = async (supabase) => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
};

export const getCurrentUser = async (supabase) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
