import axios from "axios";
import Parse from "parse";

import { blankScoresDatabaseGen, blankScoresObj } from "./functions";

import store from "../store/";

const serverUrl = "http://localhost:2000";

Parse.initialize("1234");
Parse.serverURL = "http://localhost:2000/parse";
class Match extends Parse.Object {
  constructor() {
    super("Game");
  }
  static newGame(gameInfo, scores) {
    const game = new Game();
    game.set("players", Number(gameInfo.players));
    game.set("points", Number(gameInfo.points));
    game.set("holes", Number(gameInfo.holes));
    game.set("scoringStyle", gameInfo.scoringStyle);
    game.set("scores", scores);
    game.set("playersJoined", 1);

    return game;
  }
}

export async function createMatch(matchInfo) {
  const scores = blankScoresObj(matchInfo.players, matchInfo.holes);

  const Match = Parse.Object.extend("Match");
  const match = new Match();

  console.log(matchInfo);
  try {
    const doc = await match.save({
      players: Number(matchInfo.players),
      points: Number(matchInfo.points),
      is18Holes: Number(matchInfo.holes == 18 ? true : false),
      isSoloScoring: matchInfo.scoringStyle == "solo" ? true : false,
      scores: scores,
      playersJoined: 1,
    });
    console.log(doc.id);
    return doc.id;
  } catch (e) {
    console.log(e);
  }
}

export async function joinMatch(matchId) {
  const Match = Parse.Object.extend("Match");
  const query = new Parse.Query(Match);
  try {
    const result = await query.get(matchId);
    const matchInfo = {
      players: result.attributes.players,
      points: result.attributes.points,
      holes: result.attributes.is18Holes ? 18 : 9,
      scoringStyle: result.attributes.isSoloScoring ? "solo" : "classic",
    };
    return matchInfo;
  } catch (e) {
    console.log(e);
  }
}

export async function playerConfirm(gameId) {
  let maxPlayer;

  const thisGame = Parse.Object.extend("Game");
  const query = new Parse.Query(thisGame);
  try {
    const game = await query.get(gameId);
    try {
      game.increment("playersJoined");
      maxPlayer = game.get("playersJoined");
      console.log(maxPlayer);
      await game.save();

      store.dispatch("setPlayerNum", maxPlayer);
      return "success";
    } catch (e) {
      console.log("inner try error", e);
    }
  } catch (e) {
    console.log("outter try error", e);
  }

  maxPlayer++;
  console.log(maxPlayer);
  store.dispatch("setPlayerNum", maxPlayer);
}

// this requires some learnin'/thinkin/
export function playersJoinedListener(gameId) {}

function compareScores(remote, local) {
  let nullCheck = true;
  let allEqualCheck = true;
  let result = {};
  for (var p in remote) {
    // skip this key if it's a string
    if (typeof remote[p] == "string") continue;
    // check if ALL remote scores are null
    remote[p] != null ? (nullCheck = false) : null;
    // check agreement of individual score
    result[p] = remote[p] == local[p];
    // check if all scores are equal between remote and local
    !result[p] ? (allEqualCheck = false) : null;
  }

  console.log(result);

  if (nullCheck) return "remote is null";
  else if (allEqualCheck) return "all scores equal";
  else return result;
}

export async function getScores(gameId) {
  let docRef = db.collection("games").doc(gameId);
  let scoresObj;

  try {
    let doc = await docRef.get();
    if (doc.exists) {
      const data = doc.data();
      scoresObj = data.scores;
    } else {
      console.log("no such game");
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  return scoresObj;
}

export async function submitScores(gameId, hole, players, scores) {
  let docRef = db.collection("games").doc(gameId);

  try {
    await docRef.update({
      [`scores.${hole}.${players}`]: scores,
    });
    console.log("scores submitted");
    return;
  } catch (error) {
    console.log("scores not submitted ERROROROROR");
  }
}
