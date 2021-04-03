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

  console.log(req.context.prisma);

  const game = await req.context.prisma.game.create({
    data: {
      players: Number(req.body.players),
      holes: Number(req.body.holes),
      points: Number(req.body.points),
      scoringStyle: req.body.scoringStyle,
    },
  });

  console.log(game);
  return res.send({ gameId: game.id });
});

export default router;
