import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  return res.send("games route");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const game = await req.context.models.Game.create({
    gameInfo: {
      players: req.body.players,
      points: req.body.points,
      holes: req.body.holes,
      scoringStyle: req.body.scoringStyle,
    },
    playersJoined: [1],
  });

  return res.send(game);
});

export default router;
