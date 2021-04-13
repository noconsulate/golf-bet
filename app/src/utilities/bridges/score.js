import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

export async function getScores(match_id) {
  const { data, error } = await supabase
    .from("score")
    .select("*")
    .match({ match_id })
    .order("player_num", { ascending: true });

  console.log(data, error);

  return { data, error };
}

export async function updateScore(match_id, player_num, hole, score) {
  console.log(match_id, player_num, hole, score);
  const { data, error } = await supabase
    .from("score")
    .update(
      // { 1: 3 } ** what I'm trying to do
      `{
        ${hole}: ${score}
    }`
    )
    .match({ match_id, player_num });

  console.log(data, error);
}
