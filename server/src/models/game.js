import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  _id: String,
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
