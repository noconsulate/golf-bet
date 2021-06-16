import { getScores } from "../utilities/bridges/score";

export const scores = {
  state: {
    scores: [],
    loaded: false,
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
      payload.map((item) => {
        state.scores.push(item);
      });
    },
    UPDATE_LOADED(state) {
      state.loaded = true;
    },
  },
  actions: {
    async initScores(context) {
      const matchId = context.rootState.match.match.id;
      const { data, error } = await getScores(matchId);

      if (error) {
        console.log(error);
      }
      if (data) {
        context.commit("INITIALIZE_SCORES", data);
        context.commit("UPDATE_LOADED");
      }
    },
  },
};
