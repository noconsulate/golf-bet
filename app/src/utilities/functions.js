export function blankScoresGen(players, holes) {
  console.log(players, holes);
  let scores = [];

  for (let i = 0; i < holes; i++) {
    scores.push([]);
    for (let j = 0; j < players; j++) {
      scores[i].push(null);
    }
  }

  return scores;
}

export function blankScoresObj(players, holes) {
  console.log("hi");
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
