import { getScores } from "./bridges";

export function blankScoresDatabaseGen(players, holes) {
  let scores = {};

  switch (players) {
    case 4:
      for (let i = 1; i <= holes; i++) {
        let hole = {};
        hole["1,2"] = {
          "1": null,
          "2": null,
        };
        hole["3,4"] = {
          "3": null,
          "4": null,
        };
        scores[i] = hole;
      }
      console.log(scores);
      return scores;
  }
}

export function blankScoresObj(players, holes) {
  let scores = {};
  for (let i = 1; i <= holes; i++) {
    let hole = {};
    for (let j = 1; j <= players; j++) {
      // Object.assign(hole, { [j]: null });
      hole[j] = null;
    }
    // Object.assign(scores, { [i]: hole });
    scores[i] = hole;
  }
  return scores;
}

export async function checkAndSubmitScores(gameId, hole, localHole, players) {
  // get scores from DB
  const remoteScores = await getScores(gameId);
  const remoteHole = remoteScores[hole][players];
  window.hole = remoteHole;
  console.log(remoteHole);

  console.log(localHole, remoteHole);

  // if remote scores null submit local scores
}
