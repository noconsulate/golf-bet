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
