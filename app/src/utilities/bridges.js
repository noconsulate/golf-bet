import { firebase } from "@firebase/app";
import { db } from "./firebase";

import store from "../store/";

export async function createGame(gameInfo) {
  let docRef;
  try {
    docRef = await db.collection("games").add({
      gameInfo: gameInfo,
      playersJoined: [1],
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
      maxPlayer = gameData.playersJoined[gameData.playersjoined.length - 1];
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
