import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

export async function signUpWithEmail(email, password) {
  console.log(email, password);
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { user, session, error };
}

export function currentUser() {
  const user = supabase.auth.user();
  return user;
}

export async function signOut() {
  const error = await supabase.auth.signOut();

  return error;
}

export async function signIn(email, password) {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  return { user, session, error };
}
