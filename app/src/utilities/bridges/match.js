import { createClient } from "@supabase/supabase-js";
import store from "../../store";

const supabase = createClient(
  "https://jmbttvgyclmljkuzemvq.supabase.co",
  process.env.VUE_APP_SUPABASE_KEY
);

// FOR DEV
window.supabase = supabase;

export async function newMatch(
  players,
  points,
  is_18_holes,
  is_classic_scoring,
  creator
) {
  const { data, error } = await supabase.rpc("new_match", {
    players,
    points,
    is_18_holes,
    is_classic_scoring,
    creator,
  });

  console.log(data);

  store.dispatch("setMatchStatus", "waiting");

  return { data, error };
}

export const matchListener = async function() {
  const id = store.state.match.id;
  const subscription = supabase
    .from(`match:id=eq.${id}`)
    .on("UPDATE", (payload) => {
      console.log("change received", payload);
      store.dispatch("setMatchStatus", payload.new.status);
      store.dispatch("setPlayersJoined", payload.new.players_joined);
      if (payload.new.players_joined >= payload.new.players) {
        console.log("all playesr joined. do something and unsubscribe!");
        store.dispatch("setAllPlayersJoined");
        unsubscribe();
      }
    })
    .subscribe();
  console.log("subscribed to matchListener for match_id: " + id);
  console.log(subscription);

  const unsubscribe = function() {
    supabase.removeSubscription(subscription);
    let subs = supabase.getSubscriptions();
    console.log("sub removed?", subs);
  };

  return subscription;
};

export const unsubscribeListener = function(subscription) {
  console.log(subscription);
  supabase.removeSubscription(subscription);
  let subs = supabase.getSubscriptions();
  console.log("sub removed?", subs);
};

async function checkConfirmed(id) {
  if (!id) return false;

  const player = store.state.user.id;
  console.log(player, id);

  // to be handled better when no user is generally handled
  if (!player) return false;

  let { data, error } = await supabase
    .from("score")
    .select("*")
    .match({ match_id: id, player_id: player });

  console.log(data, error);

  if (data.length == 0) return false;
  else return true;
}

export async function getMatch(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("match")
    .select("*")
    .match({ id: id });

  const {
    players,
    points,
    is_18_holes,
    is_classic_scoring,
    status,
    players_joined,
  } = data[0];

  // store.dispatch("setMatchId", id);
  // store.dispatch("setPlayers", players);
  // store.dispatch("setPoints", points);
  // store.dispatch("setHoles", is_18_holes ? 18 : 9);
  // store.dispatch("setScoringStyle", is_classic_scoring ? "classic" : "solo");
  // store.dispatch("setMatchStatus", status);
  // store.dispatch("setPlayersJoined", players_joined);
  // put all match data in one object in store, get rid of the other ones
  store.dispatch("setMatch", data[0]);

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

  return { data, error };
}
