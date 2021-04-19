import { Router } from "express";
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URI,
  process.env.SUPABASE_KEY
);

const router = Router();

function randomNumber() {
  return Math.floor(Math.random() * (7 - 1 + 1)) + 1;
}
function scoresGen() {
  let scores = {};

  for (let i = 1; i <= 18; i++) {
    scores[i] = randomNumber();
  }

  return scores;
}

router.get("/", (req, res) => {
  console.log(scoresGen());
});

router.post("/initgameover", async (req, res) => {
  const alice = "545a0a22-086a-49bf-826a-9b36dc2e9b8c";
  const bob = "ecefd855-e09d-40d9-8c92-6424e946ef96";
  const cory = "3dcd632a-4766-4d78-ac73-14a11c9886ea";
  const diane = "6afb6271-875c-4a9b-b70f-488344aaaa20";

  let players = {
    1: {
      name: "alice",
      uuid: "545a0a22-086a-49bf-826a-9b36dc2e9b8c",
      score_id: "",
    },
    2: {
      name: "bob",
      uuid: "ecefd855-e09d-40d9-8c92-6424e946ef96",
      score_id: "",
    },
    3: {
      name: "cory",
      uuid: "3dcd632a-4766-4d78-ac73-14a11c9886ea",
      score_id: "",
    },
    4: {
      name: "diane",
      uuid: "6afb6271-875c-4a9b-b70f-488344aaaa20",
      score_id: "",
    },
  };

  console.log(players[1].score_id);

  const newMatch = await supabase.rpc("new_match", {
    players: 4,
    points: 69000,
    is_18_holes: true,
    is_classic_scoring: false,
    creator: players[1].uuid,
  });

  const matchId = newMatch.data.match_id;
  players[1].score_id = newMatch.data.score_id;

  console.log(players[1].score_id);

  let update = await supabase
    .from("score")
    .update(scoresGen())
    .match({ id: players[1].score_id });

  for (let i = 2; i <= 4; i++) {
    let result = await supabase.rpc("join_match", {
      match_id: matchId,
      player_id: players[i].uuid,
    });
    console.log(result);
    players[i].score_id = result.data.score_id;

    update = await supabase
      .from("score")
      .update(scoresGen())
      .match({ id: players[i].score_id });
  }

  return res.send("congrtats");
});

export default router;
