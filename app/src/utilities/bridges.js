import { firebase } from "@firebase/app";
import { db } from "./firebase";

export async function createGame(gameInfo) {
  let docRef;
  try {
    docRef = await db.collection("games").add({
      gameInfo: gameInfo,
      playersJoined: [],
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

  try {
    await docRef.update({
      playersJoined: firebase.firestore.FieldValue.arrayUnion("2"),
    });
    console.log("player 2 joined the game");
    return "success";
  } catch (error) {
    console.log(error);
    return "failuer";
  }
}
