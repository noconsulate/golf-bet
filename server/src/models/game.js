import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  gameInfo: {
    players: Number,
    holes: Number,
    points: Number,
    scoringStyle: String,
  },
  playersJoined: Array,
});

const Game = mongoose.model("Game", gameSchema);

export default Game;
