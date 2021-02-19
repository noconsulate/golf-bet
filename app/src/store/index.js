import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sequence: "finalScore",
    players: "2",
    points: "",
    holes: "9",
    // myScore: [],
    // opponentScore: [],
    myScore: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    opponentScore: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  mutations: {
    UPDATE_SEQUENCE(state, payload) {
      state.sequence = payload;
    },
    UPDATE_PLAYERS(state, payload) {
      state.players = payload;
      console.log("updateplayers" + payload);
    },
    UPDATE_POINTS(state, payload) {
      state.points = payload;
    },
    UPDATE_HOLES(state, payload) {
      state.holes = payload;
    },
    UPDATE_SCORES(state, payload) {
      const { myScore, opponentScore } = payload;
      console.log(myScore);
      myScore.map((item) => {
        state.myScore.push(Number(item));
      });
      opponentScore.map((item) => {
        state.opponentScore.push(Number(item));
      });
    },
    RESET_VALUES(state) {
      state.players = "";
      state.points = "";
      state.holes = "";
      state.scores = [];
    },
  },
  actions: {
    setSequence(context, value) {
      context.commit("UPDATE_SEQUENCE", value);
    },
    setPlayers(context, value) {
      console.log(value);
      context.commit("UPDATE_PLAYERS", value);
    },
    setPoints(context, value) {
      context.commit("UPDATE_POINTS", value);
    },
    setHoles(context, value) {
      context.commit("UPDATE_HOLES", value);
    },
    setScores(context, value) {
      context.commit("UPDATE_SCORES", value);
    },
    resetValues(context) {
      context.commit("RESET_VALUES");
    },
  },

  modules: {},
});
