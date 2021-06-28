import store from "../store/";
import { setStatus } from "../utilities/bridges/match";

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

export function makeResults(totals, points) {
  const players = totals.length;
  const scores = store.state.scores.scores;
  const match = store.getters.match.id;

  let winner = 0;
  let winners = [];
  let losers = [];
  let results = totals;

  for (let i = 1; i < players; i++) {
    if (results[i].total < results[winner].total) {
      winner = i;
    }
  }
  console.log("winner: " + winner);

  for (let i = 0; i < players; i++) {
    if (results[i].total === results[winner].total) {
      winners.push(i);
    }
  }
  if (winners.length === 0) {
  }
  console.log("winners: " + winners);

  for (let i = 0; i < players; i++) {
    if (results[i].total > results[winner].total) losers.push(i);
  }
  console.log("losers: " + losers);

  results.map((player, index) => {
    if (winners.includes(index)) {
      player.handle = scores[index].player_id.handle;
      player.winner = true;
      player.netProfit = (points * losers.length) / winners.length;
      losers.map((loser) => {
        player.payments.push({
          player: loser + 1,
          payments: points / winners.length,
        });
      });
    } else {
      player.handle = scores[index].player_id.handle;
      player.winner = false;
      player.netProfit = points * -1;
      winners.map((winner) => {
        player.payments.push({
          player: winner + 1,
          payments: (points / winners.length) * -1,
        });
      });
    }
  });

  store.dispatch("setController", "confirmResults");

  return results;
}
