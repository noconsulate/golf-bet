import Vue from "vue";
import Vuex from "vuex";

import router from "../router/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navOpen: false,
    controller: "",
    players: "4",
    points: "20",
    holes: "18",
    scoringStyle: "solo",
    matchId: "",
    playerNum: "1",
    playersJoined: 0,
    allPlayersJoined: false,
    error: "",
    user: null,
    userDetails: {},
    scores: [],
    matchStatus: "",
    // I should put all match stuff here and leave the specific ones for the forms in Create.vue's state
    match: {
      id: "",
    },
  },
  getters: {
    scores: (state) => {
      let scores = [];
      const holes = Number(state.match.holes);
      state.scores.map((item) => {
        let scoreObj = { player_num: item.player_num };
        for (let i = 1; i <= holes; i++) {
          scoreObj[i] = item[i];
        }
        // scoreObj[player_num] = item.player_num;
        scores.push(scoreObj);
      });
      return scores;
    },
    user: (state) => {
      if (state.user) {
        let user = { ...state.user, ...state.userDetails };
        return user;
      } else return null;
    },
    allPlayersJoined: (state) => {
      let result;
      console.log(state.match.players_joined, state.match.players);
      state.match.players_joined == state.match.players
        ? (result = true)
        : (result = false);
      return result;
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
      state.match.players = payload;
    },
    UPDATE_POINTS(state, payload) {
      state.match.points = payload;
    },
    UPDATE_HOLES(state, payload) {
      state.match.holes = payload;
    },
    INITIALIZE_SCORES(state, payload) {
      window.payload = payload;
      payload.map((item) => {
        state.scores.push(item);
        // Vue.set(state.scores, item.index, item);
      });
    },
    // RESET_VALUES(state) {
    //   state.match.players = "";
    //   state.match.points = "";
    //   state.match.holes = "";
    //   state.scores = [];
    // },
    UPDATE_MATCH_ID(state, payload) {
      state.matchId = payload;
    },
    UPDATE_PLAYER_NUM(state, payload) {
      state.playerNum = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.match.playersJoined = payload;
    },
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.allPlayersJoined = true;
    },
    UPDATE_SCORING_STYLE(state, payload) {
      state.match.scoringStyle = payload;
    },
    UPDATE_ERROR(state, payload) {
      state.error = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_USER_DETAILS(state, payload) {
      state.userDetails = payload;
    },
    UPDATE_SCORE_ROW(state, payload) {
      const index = payload.player - 1;
      state.scores[index] = payload.score;
      state.scores = [...state.scores];
    },
    UPDATE_MATCH_STATUS(state, payload) {
      state.matchStatus = payload;
    },
    UPDATE_MATCH(state, payload) {
      state.match = payload;
    },
    RESET_MATCH_VALUES(state) {
      state.match = {};
      // state.matchId = "";
      // state.match.players = null;
      // state.match.points = null;
      // state.match.holes = null;
      // state.match.scoringStyle == null;
      state.controller = "selectPlayers";
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
    setUserDetails(context, value) {
      context.commit("UPDATE_USER_DETAILS", value);
    },
    setScoreRow(context, value) {
      context.commit("UPDATE_SCORE_ROW", value);
    },
    setMatchStatus(context, value) {
      context.commit("UPDATE_MATCH_STATUS", value);
    },
    setMatch(context, value) {
      context.commit("UPDATE_MATCH", value);
    },
    resetMatchValues(context) {
      context.commit("RESET_MATCH_VALUES");
    },
  },

  modules: {},
});
