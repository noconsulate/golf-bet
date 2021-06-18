import {
  getScores,
  updateScore,
  scoreListener,
} from "../utilities/bridges/score";

export const scores = {
  state: {
    scores: [],
    loaded: false,
    subscription: null,
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
      const { matchId, player, hole, score } = values;
      const { data, error } = await updateScore(matchId, player, hole, score);

      console.log(data, error);
    },
    setScoreCell(context, value) {
      let player = value.player_num;
      const holes = context.getters.match.holes;
      value.holes = holes;
      // context.commit("UPDATE_SCORE_ROW", value);

      for (let i = 1; i <= 18; i++) {
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
  },
};
