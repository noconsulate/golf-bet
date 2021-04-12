import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzgxODEwNCwiZXhwIjoxOTMzMzk0MTA0fQ.LJUy3zUrdXgqQ7dwDqb-iKnSJ_YiQ98FeQJg2mhan1k"
);

const newMatchxxx = async function() {
  const { data, error } = await supabase.rpc("new_match", {
    players_num: 4,
    points_num: 30000,
    is18: true,
    is_classic: false,
  });

  console.log(error);
  console.log(data);
};

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
