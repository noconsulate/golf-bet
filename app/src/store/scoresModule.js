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
  },
  actions: {
    async initScores(context) {
      if (context.state.subscription != null) {
        console.log("subscription found");
      }
      const matchId = context.rootState.match.match.id;
      const { data, error } = await getScores(matchId);

      if (error) {
        console.log(error);
      }
      if (data) {
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
  },
};
