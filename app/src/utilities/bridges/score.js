import { createClient } from "@supabase/supabase-js";
import store from "../../store";

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

  return { data, error };
}

export async function updateScore(match_id, player_num, hole, score) {
  console.log(match_id, player_num, hole, score);
  const { data, error } = await supabase
    .from("score")
    .update({ [hole]: score })
    .match({ match_id, player_num });

  console.log(data, error);

  return { data, error };
}

export const playersJoinedListener = async function() {
  const id = store.state.match.match.id;
  const players = store.state.match.match.players;
  const subscription = supabase
    .from(`match:id=eq.${id}`)
    .on("UPDATE", (payload) => {
      console.log("change received", payload);
      if (payload.new.players_joined >= payload.new.players) {
        console.log("all playesr joined. do something and unsubscribe!");
        store.dispatch("setAllPlayersJoined");
        unsubscribe();
      }
    })
    .subscribe();
  console.log("subscribed to playersJoinedListener for match_id: " + id);
  console.log(subscription);

  const unsubscribe = function() {
    supabase.removeSubscription(subscription);
    let subs = supabase.getSubscriptions();
    console.log("sub removed?", subs);
  };

  return subscription;
};

export async function scoreListener() {
  const match_id = store.state.match.match.id;
  console.log(match_id);

  const subscription = supabase
    .from(`score:match_id=eq.${match_id}`)
    .on("UPDATE", (payload) => {
      console.log("score change", payload);
      const { player_num } = payload.new;
      // store.dispatch("setScoreRow", { player: player_num, score: payload.new });
      store.dispatch("setScoreRow", payload.new);
    })
    .subscribe();

  console.log("scoreListener subscribed");
  return subscription;
}

export async function scoreListenerBroken() {
  const match_id = store.state.match.match.id;
  console.log(match_id);

  const subscription = supabase
    // .from(`score:match_id=eq.${match_id}`)
    .from(`score:match_id=eq.${match_id}`)
    .on("*", (payload) => {
      console.log("score change", payload);
      const { player_num } = payload.new;
      console.log(store.state.scores[player_num - 1]);
      console.log(payload.new);
      // store.dispatch("setScoreRow", { player: player_num, score: payload.new });
    })
    // .from("*")
    // .on("*", (payload) => {
    //   console.log("change", payload);
    // })
    .subscribe();
  console.log("subscribed to score listener");

  return subscription;
}
