import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  gameInfo: {
    players: String,
    holes: String,
    points: String,
    scoringStyle: String,
  },
  playersJoined: Array,
  scores: Object,
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
