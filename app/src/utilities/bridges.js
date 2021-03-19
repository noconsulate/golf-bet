import { firebase } from "@firebase/app";
import { db } from "./firebase";
import { blankScoresGen, blankScoresObj } from "./functions";

import store from "../store/";

export async function createGame(gameInfo) {
  const scores = blankScoresObj(
    Number(gameInfo.players),
    Number(gameInfo.holes)
  );
  console.log(scores);
  let docRef;
  try {
    docRef = await db.collection("games").add({
      gameInfo: gameInfo,
      playersJoined: [1],
      scores: scores,
    });
    console.log(docRef.id);
  } catch (error) {
    console.log(error);
  }

  console.log(docRef.id);

  return docRef.id;
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

  console.log(gameId);
  let docRef = db.collection("games").doc(gameId);

  docRef.onSnapshot((doc) => {
    const data = doc.data();
    const playersJoined = data.playersJoined;
    console.log(playersJoined.length);
    store.dispatch("setPlayersJoined", playersJoined);

    if (playersJoined.length == players) {
      store.dispatch("setAllPlayersJoined");
    }
  });
}

function compareScores(remote, local) {
  console.log("local:" + local);
  const nullCheck = true;
  let result = {};
  for (var p in remote) {
    // check if ALL remote scores are null
    remote[p] != null ? nullCheck == false : null;
    // check agreement of scores
    result[p] = remote[p] == local[p];
  }
  if (nullCheck) return "remote is null";
  else return result;
}

export async function submitScores(gameId, holeNumber, localHole) {
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

  const remoteHole = scoresObj[holeNumber];
  console.log(remoteHole, localHole);

  const compared = compareScores(remoteHole, localHole);
  console.log(compared);

  if (compared === "remote is null") {
    try {
      await docRef.update({
        [`scores.${holeNumber}`]: localHole,
      });
      console.log("updated!");
    } catch (error) {
      console.log(error);
    }
  }
}
