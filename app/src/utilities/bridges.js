import axios from "axios";

import { blankScoresDatabaseGen, blankScoresObj } from "./functions";

import store from "../store/";

const serverUrl = "http://localhost:3000";

export async function createGame(gameInfo) {
  const scores = blankScoresObj(
    Number(gameInfo.players),
    Number(gameInfo.holes)
  );
  console.log(gameInfo);
  console.log(scores);

  const res = await axios.post(`${serverUrl}/games`, {
    gameInfo: gameInfo,
    scores: scores,
  });

  const gameId = res.data;
  console.log(gameId);
  return gameId;
}

export async function joinGame(gameId) {
  let docRef = db.collection("games").doc(gameId);

  let doc, gameData;

  try {
    doc = await docRef.get();
    if (doc.exists) {
      gameData = doc.data();
    } else {
      console.log("no such game");
      throw "no such game";
    }
  } catch (error) {
    console.log(error);
  }

  // tell db player has arrived

  return gameData;
}

export async function playerConfirm(gameId) {
  let docRef = db.collection("games").doc(gameId);
  let doc, gameData, maxPlayer;

  try {
    doc = await docRef.get();
    if (doc.exists) {
      gameData = doc.data();
      const { playersJoined } = gameData;
      console.log(playersJoined);
      maxPlayer = Math.max(...playersJoined);
    } else {
      console.log("no such game");
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  maxPlayer++;
  console.log(maxPlayer);
  store.dispatch("setPlayerNum", maxPlayer);

  try {
    await docRef.update({
      playersJoined: firebase.firestore.FieldValue.arrayUnion(maxPlayer),
    });
    console.log(`player ${maxPlayer} joined the game`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// this requires some learnin'/thinkin/
export function playersJoinedListener(gameId) {
  const players = store.state.players;
  let playersJoined = 0;

  console.log("in listener");

  function interval() {
    console.log("hi");
  }
  setInterval(interval, 1000);
}

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
