import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sequence: "splash",
    players: "",
    points: "",
    holes: "",
  },
  mutations: {
    UPDATE_SEQUENCE(state, payload) {
      state.sequence = payload;
    },
    UPDATE_PLAYERS(state, payload) {
      state.players = payload;
    },
    UPDATE_POINTS(state, payload) {
      state.points = payload;
    },
    UPDATE_HOLES(state, payload) {
      state.holes = payload;
    },
  },
  actions: {
    setSequence(context, value) {
      context.commit("UPDATE_SEQUENCE", value);
    },
    setPlayers(context, value) {
      context.commit("UPDATE_PLAYERS", value);
      context.commit("UPDATE_SEQUENCE", "points");
    },
    setPoints(context, value) {
      context.commit("UPDATE_POINTS", value);
      context.commit("UPDATE_SEQUENCE", "holes");
    },
    setHoles(context, value) {
      context.commit("UPDATE_HOLES", value);
      context.commit("UPDATE_SEQUENCE", "confirmation");
    },
  },
  modules: {},
});
