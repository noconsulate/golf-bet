import { createClient } from "@supabase/supabase-js";
import store from "../../store";

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

export const playersJoinedListener = async function() {
  const id = store.state.matchId;
  const players = store.state.players;
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

async function checkConfirmed(id) {
  const player = store.state.user.id;
  console.log(player, id);

  let { data, error } = await supabase
    .from("score")
    .select("*")
    .match({ match_id: id, player_id: player });

  console.log(data, error);

  if (data.length == 0) return false;
  else return true;
}

export async function getMatch(id) {
  const { data, error } = await supabase
    .from("match")
    .select("*")
    .match({ id: id });

  console.log(data, error);

  if (await checkConfirmed(id)) {
    console.log("player already present");
    store.dispatch("setController", "waitingForPlayers");
  }

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

export async function getScores(match_id) {
  const { data, error } = await supabase
    .from("score")
    .select("*")
    .match({ match_id })
    .order("player_num", { ascending: true });

  console.log(data, error);

  return { data, error };
}