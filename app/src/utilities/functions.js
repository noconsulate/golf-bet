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
  // don't do anything if local scores are null
  for (item in localHole) {
    console.log(item.value);
    if (localHole[item] == null) {
      return "can't submit any null scores";
    }
  }

  // get scores from DB
  const remoteScores = await getScores(gameId);
  const remoteHole = remoteScores[hole][players];
  console.log(remoteHole);
  console.log(localHole);

  // if remote scores null submit local scores
  let allScoresNull = true;
  const scoresLength = Object.keys(remoteHole).length;
  for (let i = i; i <= scoresLength; i++) {
    if (remoteScore[i] != null) !allScoresNull;
  }
  console.log(allScoresNull);
  // if(allScoresNull) submitScores(gameId, hole, players, localHole)
}
