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

  let scores = {};

  const newMatch = await supabase.rpc("new_match", {
    players: 4,
    points: 69000,
    is_18_holes: true,
    is_classic_scoring: false,
    creator: alice,
  });

  console.log(newMatch);

  const matchId = newMatch.data.match_id;
  scores.alice = newMatch.data.score_id;

  const bobJoin = await supabase.rpc("join_match", {
    match_id: matchId,
    player_id: bob,
  });

  console.log(bobJoin);
  scores.bob = bobJoin.data.score_id;

  const coryJoin = await supabase.rpc("join_match", {
    match_id: matchId,
    player_id: cory,
  });
  scores.cory = coryJoin.data.player_id;

  const dianeJoin = await supabase.rpc("join_match", {
    match_id: matchId,
    player_id: diane,
  });
  scores.diane = dianeJoin.data.player_id;

  let scoresObj = scoresGen();
  let update = await supabase.from("score").update({ 1: 3 }).match(scoresGen());

  console.log(update);

  return res.send("congrtats");
});

export default router;
