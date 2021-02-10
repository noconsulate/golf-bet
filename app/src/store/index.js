import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sequence: "splash",
    players: "",
    points: "",
    holes: "",
    scores: [],
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
      payload.map((item) => {
        state.scores.push(Number(item));
      });
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
  },

  modules: {},
});
