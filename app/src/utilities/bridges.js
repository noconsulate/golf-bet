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
