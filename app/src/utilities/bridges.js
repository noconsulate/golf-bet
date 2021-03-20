import { firebase } from "@firebase/app";
import { db } from "./firebase";
import { blankScoresDatabaseGen, blankScoresObj } from "./functions";

import store from "../store/";

export async function createGame(gameInfo) {
  const scores = blankScoresDatabaseGen(
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

  // !!!!! not sure if this is going to work, check here if listener stops working

  var unsubscribe = docRef.onSnapshot((doc) => {
    const data = doc.data();
    const playersJoined = data.playersJoined;
    console.log(playersJoined.length);
    store.dispatch("setPlayersJoined", playersJoined);

    if (playersJoined.length == players) {
      store.dispatch("setAllPlayersJoined");
      unsubscribe();
    }
  });
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

// export async function submitScores(gameId, holeNumber, localHole, player) {
//   let docRef = db.collection("games").doc(gameId);
//   let scoresObj;

//   try {
//     let doc = await docRef.get();
//     if (doc.exists) {
//       const data = doc.data();
//       scoresObj = data.scores;
//     } else {
//       console.log("no such game");
//     }
//   } catch (error) {
//     console.log(error);
//     return error;
//   }

//   const remoteHole = scoresObj[holeNumber];

//   const compared = compareScores(remoteHole, localHole);
//   console.log(compared);

//   if (compared === "remote is null") {
//     // this player 'signs' the scores for the hole since he's first to submit
//     let localHoleCopy = localHole;
//     localHoleCopy.submittedBy = "player" + player;
//     try {
//       await docRef.update({
//         [`scores.${holeNumber}`]: localHoleCopy,
//       });
//       console.log("updated!");
//     } catch (error) {
//       console.log(error);
//     }
//     return "scores updated";
//   } else return compared;
// }
