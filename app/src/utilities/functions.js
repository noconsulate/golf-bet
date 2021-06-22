import store from "../store/";

export function pickWinner() {
  const scores = store.state.scores.scores;
  const players = store.state.match.match.players;
  const holes = store.getters.match.holes;

  const totals = [];

  for (let i = 0; i < players; i++) {
    let total = 0;
    for (let j = 1; j <= holes; j++) {
      total += scores[i][j];
    }
    totals.push(total);
  }

  console.log(totals);

  let winner = totals.indexOf(Math.max(...totals));
  console.log(winner);

  return winner;
}
