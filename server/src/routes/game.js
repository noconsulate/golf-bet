import { Router } from "express";
import { nanoid } from "nanoid";

const router = Router();

router.get("/", (req, res) => {
  return res.send("games route");
});

router.get("/:gameId", async (req, res) => {
  console.log(req.params.gameId);

  const game = await req.context.models.Game.findById(req.params.gameId);

  return res.send(game);
});

router.post("/", async (req, res) => {
  console.log(req.body);

  const game = await req.context.models.Game.create({
    _id: nanoid(7),
    gameInfo: req.body.gameInfo,
    playersJoined: [1],
    scores: req.body.scores,
  });

  console.log(game);
  console.log("###***777%%");
  return res.send(game._id);
});

export default router;
