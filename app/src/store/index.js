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
    playersJoined: [],
    allPlayersJoined: false,
    error: "",
    user: null,
    userDetails: {},
    scores: [],
    matchStatus: "",
  },
  getters: {
    scores: (state) => {
      let scores = [];
      const holes = Number(state.holes);
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
  },

  modules: {},
});
