import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sequence: "splash",
    players: "",
  },
  mutations: {
    UPDATE_SEQUENCE(state, payload) {
      state.sequence = payload;
    },
    // UPDATE_PLAYERS(state, payload) {
    //   state.players = payload;
    // },
  },
  actions: {
    setSequence(context, value) {
      context.commit("UPDATE_SEQUENCE", value);
    },
    // setPlayers(context, value) {
    //   context.commit("UPDATE_SEQUENCE", "points");
    // },
  },
  modules: {},
});
