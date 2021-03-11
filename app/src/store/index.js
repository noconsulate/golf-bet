import Vue from "vue";
import Vuex from "vuex";

import router from "../router/";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    controller: "selectPlayers",
    players: "",
    points: "",
    holes: "",

    myScore: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    opponentScore: [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
    ],
    gameId: "",
    playerNum: "",
    // myScore: [],
    // opponentScore: [],
    playersJoined: [],
    allPlayersJoined: false,
    scoringStyle: null,
  },
  mutations: {
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
    UPDATE_GAME_ID(state, payload) {
      state.gameId = payload;
    },
    UPDATE_PLAYER_NUM(state, payload) {
      state.playerNum = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.playersJoined = payload;
    },
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.players;
    },
    UPDATE_SCORING_STYLE(state, payload) {
      state.scoringStyle = payload;
    },
  },
  actions: {
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
    setScores(context, value) {
      context.commit("UPDATE_SCORES", value);
    },
    resetValues(context) {
      context.commit("RESET_VALUES");
    },
    setGameId(context, value) {
      context.commit("UPDATE_GAME_ID", value);
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
    },
  },

  modules: {},
});
