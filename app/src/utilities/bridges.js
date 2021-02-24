import { db } from "./firebase";

export async function createGame(gameInfo) {
  let docRef;
  try {
    docRef = await db.collection("games").add({
      gameInfo: gameInfo,
    });
    console.log(docRef.id);
  } catch (error) {
    console.log(error);
  }

  console.log(docRef.id);

  return docRef.id;
}

export async function getGame(gameId) {
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

  console.log(gameData);
  return gameData;
}
