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
    .from("user")
    .insert({ id, handle, balance });

  return { data, error2 };
}

export function currentUser() {
  const user = supabase.auth.user();
  return user;
}

export async function getUserDetails(id) {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .match({ id });
  console.log(data, error);

  return { data: data[0], error: error };
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

// ** turn OFF reatlime for AUTH database ** //
/*
/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.

begin; 
  -- remove the realtime publication
  drop publication if exists supabase_realtime; 

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;  
commit;

-- add a table to the publication
alter publication supabase_realtime add table products;

-- add other tables to the publication
alter publication supabase_realtime add table posts;
 */
