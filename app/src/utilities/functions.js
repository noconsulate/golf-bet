export function blankScoresDatabaseGen(players, holes) {
  let scores = {};

  switch (players) {
    case 4:
      for (let i = 1; i <= holes; i++) {
        let hole = {};
        hole["1, 2"] = {
          "1": null,
          "2": null,
        };
        hole["3, 4"] = {
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

export async function checkAndSubmitScores(gameId, hole, localScores) {}
