import Vue from "vue";
import Vuex from "vuex";

import router from "../router/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navOpen: false,
    controller: "confirmGame",
    players: "4",
    points: "20",
    holes: "18",
    scoringStyle: "solo",
    matchId: 97,
    playerNum: "1",
    playersJoined: [],
    allPlayersJoined: false,
    error: "",
    user: {},
    scores: [],
  },
  getters: {
    scores: (state) => {
      return state.scores;

      let scores = [];
      const index = Number(state.holes);
    },
  },
  mutations: {
    UPDATE_NAV_OPEN(state) {
      state.navOpen = !state.navOpen;
    },
    UPDATE_CONTROLLER(state, payload) {
      state.controller = payload;
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
    INITIALIZE_SCORES(state, payload) {
      console.log(payload);
      window.payload = payload;
      payload.map((item) => {
        state.scores.push(item);
        // Vue.set(state.scores, item.index, item);
      });
    },
    // RESET_VALUES(state) {
    //   state.players = "";
    //   state.points = "";
    //   state.holes = "";
    //   state.scores = [];
    // },
    UPDATE_MATCH_ID(state, payload) {
      state.matchId = payload;
    },
    UPDATE_PLAYER_NUM(state, payload) {
      state.playerNum = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.playersJoined = payload;
    },
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.allPlayersJoined = true;
    },
    UPDATE_SCORING_STYLE(state, payload) {
      state.scoringStyle = payload;
    },
    UPDATE_ERROR(state, payload) {
      state.error = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_SCORE_ROW(state, payload) {
      const index = payload.player - 1;
      state.scores[index] = payload.score;
      state.scores = [...state.scores];
      console.log(payload.score);
      console.log(state.scores[payload.player]);
    },
  },
  actions: {
    toggleNavOpen(context) {
      context.commit("UPDATE_NAV_OPEN");
    },
    setSequence(context, value) {
      context.commit("UPDATE_SEQUENCE", value);
    },
    setController(context, value) {
      context.commit("UPDATE_CONTROLLER", value);
    },
    setPlayers(context, value) {
      context.commit("UPDATE_PLAYERS", value);
    },
    setPoints(context, value) {
      context.commit("UPDATE_POINTS", value);
    },
    setHoles(context, value) {
      context.commit("UPDATE_HOLES", value);
    },
    initScores(context, value) {
      context.commit("INITIALIZE_SCORES", value);
    },
    // resetValues(context) {
    //   context.commit("RESET_VALUES");
    // },
    setMatchId(context, value) {
      context.commit("UPDATE_MATCH_ID", value);
    },
    setPlayerNum(context, value) {
      context.commit("UPDATE_PLAYER_NUM", value);
    },
    setPlayersJoined(context, payload) {
      context.commit("UPDATE_PLAYERS_JOINED", payload);
      console.log("setPlayersJoined");
    },
    setAllPlayersJoined(context) {
      context.commit("UPDATE_ALL_PLAYERS_JOINED");
      router.push("/scorecard");
    },
    setScoringStyle(context, value) {
      context.commit("UPDATE_SCORING_STYLE", value);
      console.log("scoringstyle action", value);
    },
    setError(context, value) {
      context.commit("UPDATE_ERROR", value);
    },
    setUser(context, value) {
      context.commit("UPDATE_USER", value);
    },
    setScoreRow(context, value) {
      context.commit("UPDATE_SCORE_ROW", value);
    },
  },

  modules: {},
});

// eeggghh

// scores: [
// {
//   1: null,
//   2: null,
//   3: null,
//   4: null,
//   5: null,
//   6: null,
//   7: null,
//   8: null,
//   9: null,
//   id: null,
//   match_id: null,
//   player_id: null,
//   player_num: null,
//   // 10: null,
//   // 11: null,
//   // 12: null,
//   // 13: null,
//   // 14: null,
//   // 15: null,
//   // 16: null,
//   // 17: null,
//   // 18: null,
// },
// ],
