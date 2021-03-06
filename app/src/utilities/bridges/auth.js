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

export async function insertUserDetails(args) {
  console.log(args);
  const { id, handle, balance } = args;
  const { data, error2 } = await supabase
    .from("users")
    .insert({ id, handle, balance });

  return { data, error2 };
}

export function getUser() {
  const user = supabase.auth.user();
  return user;
}

export async function getUserDetails(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ id });

  return { data: data[0], error: error };
}

export async function getActiveMatch(id) {
  const { data, error } = await supabase
    .from("users")
    .select("active_match")
    .match({ id });

  return { data, error };
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

export async function resetUser(id) {
  const { data, error } = await supabase
    .from("users")
    .update({
      active_match: null,
      active_score: null,
      player_num: null,
      balance: 6000000,
    })
    .match({ id });

  return { data, error };
}
