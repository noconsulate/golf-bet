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

export function makeResults(totals, points) {
  console.log("results");
  console.log(totals);
  const players = totals.length;
  const totalPoints = points * players;

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

  switch (players) {
    case 2: {
    }
    case 3: {
      switch (winners.length) {
        case 1: {
          results.map((player, index) => {
            console.log(player, index);
            if (winners.includes(index)) {
              player.winner = true;
              player.netProfit = totalPoints * (2 / 3);
              losers.map((loser) => {
                player.payments.push({
                  player: loser,
                  amount: points,
                });
              });
            } else {
              player.winner = false;
              player.netProfit = -1 * ((totalPoints * 1) / 3);
              player.payments.push({
                player: winner,
                amount: -1 * points,
              });
            }
          });
          break;
        }
        case 2: {
          console.log("two winnerse");
          results.map((player, index) => {
            if (winners.includes(index)) {
              player.winner = true;
              player.netProfit = (points * 1) / 2;
              losers.map((loser) => {
                player.payments.push({
                  player: loser,
                  amount: (points * 1) / 2,
                });
              });
            } else {
              player.winner = false;
              player.netProfit = -1 * ((totalPoints * 1) / 3);
              winners.map((winner) => {
                player.payments.push({
                  player: winner,
                  amount: (-1 * points * 1) / 2,
                });
              });
            }
          });
        }
      }
    }
  }

  return results;
}
