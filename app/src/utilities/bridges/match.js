import { createClient } from "@supabase/supabase-js";
import store from "../../store";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

// FOR DEV
window.supabase = supabase;

export async function newMatch(values) {
  const { players, points, is_18_holes, is_classic_scoring, creator } = values;

  const { data, error } = await supabase.rpc("new_match", {
    players,
    points,
    is_18_holes,
    is_classic_scoring,
    creator,
  });

  console.log(data);

  return { data, error };
}

const startMatch = async function(id) {
  console.log("updating match status");
  const { data, error } = await supabase
    .from("match")
    .update({ status: "playing" }, { returning: "minimal" })
    .match({ id: id });

  console.log("START MATCH, DO SOMETHING", data, error);
};

export const setStatus = async function(status) {
  const id = store.getters.match.id;
  const { data, error } = await supabase
    .from("match")
    .update({ status: status }, { returning: "minimal" })
    .match({ id: id });

  console.log(data, error);
  return { data, error };
};

export const matchListener = async function(id) {
  // const id = store.state.match.match.id;
  const subscription = supabase
    .from(`match:id=eq.${id}`)
    .on("UPDATE", (payload) => {
      console.log("change received", payload);
      store.dispatch("setMatch", payload.new);
      // store.dispatch("setMatchStatus", payload.new.status);
      // store.dispatch("setPlayersJoined", payload.new.players_joined);
      if (payload.new.players_joined >= payload.new.players) {
        console.log("all playesr joined. do something and unsubscribe!");
        //Should be new action that incorporates startGame()
        // store.dispatch("setAllPlayersJoined");

        if (store.state.ui.playerNum === 1) {
          startMatch(id);
        }

        unsubscribe();
      }
      if (payload.new.status == "cancelled") {
        unsubscribe();
      }
    })
    .subscribe();
  console.log("subscribed to matchListener for match_id: " + id);
  console.log(subscription);
  store.dispatch("setSubscription", subscription);

  const unsubscribe = function() {
    console.log("unsubscribe in mathcListener");
    supabase.removeSubscription(subscription);
    let subs = supabase.getSubscriptions();
    console.log("sub removed?", subs, "subscription: " + subscription);
  };

  return subscription;
};

export async function getMatch(id) {
  console.log("getMatch", id);
  const { data, error } = await supabase
    .from("match")
    .select("*")
    .match({ id: id });

  console.log(data, error);
  return { data, error };
}

export async function confirmJoin(match_id, player_id) {
  console.log(match_id, player_id);
  const { data, error } = await supabase.rpc("join_match", {
    match_id,
    player_id,
  });

  console.log(data, error);
  return { data, error };
}

export async function forfeitMatch() {
  const score_id = store.getters.user.active_score;
  const { data, error } = await supabase.rpc("forfeit_match", {
    score_id,
  });

  return { data, error };
}

export async function cancelMatch() {
  const player_id = store.getters.user.id;
  console.log(player_id);
  const { data, error } = await supabase.rpc("cancel_match", {
    player_id,
  });

  return { data, error };
}

export async function unsubscribe() {
  supabase.removeSubscription(store.state.ui.subscription);
}

export async function leaveMatch(user_id) {
  const { data, error } = await supabase
    .from("users")
    .update(
      {
        active_match: null,
        active_score: null,
        player_num: null,
      },
      { returning: "minimal" }
    )
    .match({ id: user_id });

  return { data, error };
}
