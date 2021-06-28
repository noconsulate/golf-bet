import {
  getScores,
  updateScore,
  toggleConfirmScores,
  scoreListener,
} from "../utilities/bridges/score";
import { makeResults } from "../utilities/functions";

export const scores = {
  state: {
    scores: [],
    loaded: false,
    subscription: null,
    tally: 0,
    confirmScores: false,
    results: [],
  },

  getters: {
    scores: (state, getters, rootState) => {
      let scores = [];
      const holes = Number(getters.match.holes);
      state.scores.map((item) => {
        let scoreObj = { player_num: item.player_num };
        for (let i = 1; i <= holes; i++) {
          scoreObj[i] = item[i];
        }
        scores.push(scoreObj);
      });
      return scores;
    },
    isScoringComplete: (state, getters) => {
      const holes = getters.match.holes;
      const players = getters.match.players;
      const total = holes * players;

      return state.tally === total ? true : false;
    },
    results: (state) => {
      let res = state.results;
      res.map((result) => {
        result.netProfit = result.netProfit.toFixed(2);
      });
      return res;
    },
  },

  mutations: {
    INITIALIZE_SCORES(state, payload) {
      state.scores = [];
      payload.map((item) => {
        state.scores.push(item);
      });
    },
    UPDATE_LOADED(state) {
      state.loaded = true;
    },
    UPDATE_SUBSCRIPTION(state, payload) {
      state.subscription = payload;
    },
    UPDATE_SCORE_CELL(state, payload) {
      const { player, hole, newScore } = payload;
      state.scores[player - 1][hole] = newScore;
    },
    UPDATE_TALLY(state, payload) {
      state.tally = payload;
    },
    INCREMENT_TALLY(state) {
      state.tally++;
    },
    UPDATE_RESULTS(state, payload) {
      payload.map((result) => {
        state.results.push(result);
      });
    },
    RESET_RESULTS(state) {
      state.results = [];
    },
  },
  actions: {
    async initScores(context) {
      const matchId = context.rootState.match.match.id;
      const players = context.rootState.match.match.players;
      const holes = context.getters.match.holes;

      if (context.state.subscription != null) {
        console.log("subscription found");
      }

      console.log(matchId);

      const { data, error } = await getScores(matchId);

      console.log(data, error);

      if (error) {
        console.log(error);
      }
      if (data) {
        // count tally
        let tally = 0;
        for (let i = 0; i < players; i++) {
          for (let j = 1; j <= holes; j++) {
            data[i][j] !== null ? tally++ : null;
          }
        }
        console.log(tally);
        context.commit("UPDATE_TALLY", tally);

        // fill in blank scores for vacant player slots
        let n = 4 - players;

        for (let i = 1; i <= n; i++) {
          let row = {};
          for (let j = 1; j <= holes; j++) {
            row[j] = null;
          }
          data.push(row);
        }

        context.commit("INITIALIZE_SCORES", data);
        context.commit("UPDATE_LOADED");

        const subscription = await scoreListener();
        context.commit("UPDATE_SUBSCRIPTION", subscription);
      }
    },
    async setScore(context, values) {
      newVal;
      const { matchId, player, hole, score } = values;
      const currentValue = context.state.scores[player - 1][hole];
      if (currentValue === null) {
        context.commit("INCREMENT_TALLY");
      }
      const { data, error } = await updateScore(matchId, player, hole, score);

      console.log(data, error);
    },
    setScoreCell(context, value) {
      console.log(value);
      let player = value.player_num;
      const holes = context.getters.match.holes;
      value.holes = holes;
      // context.commit("UPDATE_SCORE_ROW", value);

      for (let i = 1; i <= holes; i++) {
        if (context.state.scores[player - 1][i] !== value[i]) {
          console.log(
            "hole " + i + " player " + player + " changed to " + value[i]
          );
          const payload = {
            player,
            hole: i,
            newScore: value[i],
          };
          context.commit("UPDATE_SCORE_CELL", payload);
        }
      }
    },
    fillScores(context) {
      const matchId = context.rootState.match.match.id;
      console.log(matchId);
      const holes = context.getters.match.holes;
      let scores = context.state.scores;
      function randInt() {
        const x = Math.floor(Math.random() * 6) + 1;
        return x;
      }

      scores.map(async (player) => {
        console.log(player);
        for (let i = 1; i <= holes; i++) {
          if (!player.player_num) break;
          let x = randInt();
          const payload = {
            matchId: matchId,
            player: player.player_num,
            hole: i,
            score: x,
          };
          await context.dispatch("setScore", payload);
          // context.commit("UPDATE_SCORE_CELL", payload);
        }
      });
    },
    setResults(context, totals) {
      const points = context.rootState.match.match.points;
      console.log(totals, points);
      const results = makeResults(totals, points);
      console.log(results);
      context.commit("UPDATE_RESULTS", results);
    },
    resetResults(context) {
      context.commit("RESET_RESULTS");
    },
  },
};
