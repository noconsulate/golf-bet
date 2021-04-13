import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

export async function updateScore(match_id, hole, score) {
  console.log(match_id, player, hole, score);
}

export async function getScores(match_id) {
  const { data, error } = await supabase
    .from("score")
    .select("*")
    .match({ match_id })
    .order("player_num", { ascending: true });

  console.log(data, error);

  return { data, error };
}
