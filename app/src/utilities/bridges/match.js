import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzgxODEwNCwiZXhwIjoxOTMzMzk0MTA0fQ.LJUy3zUrdXgqQ7dwDqb-iKnSJ_YiQ98FeQJg2mhan1k"
);

export async function newMatch(
  players,
  points,
  is_18_holes,
  is_classic_scoring,
  creator
) {
  console.log(players, is_18_holes);

  const { data, error } = await supabase.rpc("new_match", {
    players,
    points,
    is_18_holes,
    is_classic_scoring,
    creator,
  });

  console.log(data, error);
  return { data, error };
}

export const playersJoinedListener = async function(id) {
  const subscription = supabase
    .from(`matches:id=eq.${id}`)
    .on("UPDATE", (payload) => {
      console.log("change received", payload);
    })
    .subscribe();
};
