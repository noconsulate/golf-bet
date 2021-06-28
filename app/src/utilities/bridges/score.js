import { createClient } from "@supabase/supabase-js";
import store from "../../store";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

export async function getScores(match_id) {
  const { data, error } = await supabase
    .from("score")
    .select(`*, player_id ( handle )`)
    .match({ match_id })
    .order("player_num", { ascending: true });

  return { data, error };
}

export async function updateScore(match_id, player_num, hole, score) {
  const { data, error } = await supabase
    .from("score")
    .update({ [hole]: score })
    .match({ match_id, player_num });

  return { data, error };
}

export async function toggleConfirmScores() {
  const id = store.getters.user.active_score;
  const fetch = await supabase
    .from("score")
    .select("confirm")
    .match({ id: id });

  console.log(fetch);
  if (fetch.error) {
    console.error(fetch.error);
    return;
  }

  const state = fetch.data[0].confirm;
  console.log(state);

  const { data, error } = await supabase
    .from("score")
    .update({ confirm: !state }, { returning: "minimal" })
    .match({ id: id });

  console.log(data, error);
}

export async function scoreListener() {
  const match_id = store.state.match.match.id;
  console.log(match_id);

  const subscription = supabase
    .from(`score:match_id=eq.${match_id}`)
    .on("UPDATE", (payload) => {
      console.log("score change", payload);
      const { player_num } = payload.new;
      store.dispatch("setScoreCell", payload.new);
    })
    .subscribe();

  console.log("scoreListener subscribed");
  return subscription;
}
