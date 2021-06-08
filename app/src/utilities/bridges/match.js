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
    .update({ status: "started" }, { returning: "minimal" })
    .match({ id: id });

  console.log(data, error);
};

export const matchListener = async function() {
  const id = store.state.match.id;
  const subscription = supabase
    .from(`match:id=eq.${id}`)
    .on("UPDATE", (payload) => {
      console.log("change received", payload);
      store.dispatch("setMatch", payload.new);
      // store.dispatch("setMatchStatus", payload.new.status);
      // store.dispatch("setPlayersJoined", payload.new.players_joined);
      if (payload.new.players_joined >= payload.new.players) {
        console.log("all playesr joined. do something and unsubscribe!");
        store.dispatch("setAllPlayersJoined");

        if (store.state.playerNum === 1) {
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

export async function forfeitMatch(score_id) {
  console.log(score_id);
  const { data, error } = await supabase.rpc("forfeit_match", {
    score_id,
  });

  return { data, error };
}

export async function cancelMatch(player_id) {
  console.log(player_id);
  const { data, error } = await supabase.rpc("cancel_match", {
    player_id,
  });

  if (data.success == true) {
    console.log("cancelMatch");
    store.dispatch("setController", "joinGame");
    store.dispatch("setActiveMatch", null);
    store.dispatch("setMatchStatus", "cancelled");

    supabase.removeSubscription(store.state.subscription);
    store.dispatch("setSubscription", {});
    let subs = supabase.getSubscriptions();
    console.log("subs unsubbed?", subs);
  }

  return { data, error };
}
