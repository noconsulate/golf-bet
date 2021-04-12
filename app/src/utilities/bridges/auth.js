import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzgxODEwNCwiZXhwIjoxOTMzMzk0MTA0fQ.LJUy3zUrdXgqQ7dwDqb-iKnSJ_YiQ98FeQJg2mhan1k"
);

export async function signUpWithEmail(email, password) {
  console.log(email, password);
  const { user, session, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) throw error;

  console.log(user, session, error);

  return { user, session };
}
