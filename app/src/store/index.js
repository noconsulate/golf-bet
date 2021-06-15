import Vue from "vue";
import Vuex from "vuex";

import router from "../router/";
import { getUser, getUserDetails } from "../utilities/bridges/auth";

import { user } from "./userModule";
import { match } from "./matchModule";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    navOpen: false,
    controller: "",
    input: {
      players: "2",
      points: "20",
      holes: "18",
      scoringStyle: "solo",
    },
    playerNum: null,
    playersJoined: 0,
    allPlayersJoined: false,
    error: "",
    scores: [],
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
        scores.push(scoreObj);
      });
      return scores;
    },
    allPlayersJoined: (state) => {
      let result;
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
      state.input.players = payload;
    },
    UPDATE_POINTS(state, payload) {
      state.input.points = payload;
    },
    UPDATE_HOLES(state, payload) {
      state.inpout.holes = payload;
    },
    INITIALIZE_SCORES(state, payload) {
      window.payload = payload;
      payload.map((item) => {
        state.scores.push(item);
      });
    },

    UPDATE_PLAYER_NUM(state, payload) {
      state.playerNum = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.match.players_joined = payload;
    },
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.allPlayersJoined = true;
    },
    UPDATE_SCORING_STYLE(state, payload) {
      state.input.scoringStyle = payload;
    },
    UPDATE_ERROR(state, payload) {
      state.error = payload;
    },
    UPDATE_SCORE_ROW(state, payload) {
      const index = payload.player - 1;
      state.scores[index] = payload.score;
      state.scores = [...state.scores];
    },

    RESET_INPUT_VALUES(state) {
      state.input.players = "";
      state.input.points = "";
      state.input.holes = "";
      state.input.scoringStyle = "";
    },

    UPDATE_SUBSCRIPTION(state, payload) {
      state.subscription = payload;
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

    setPlayerNum(context, value) {
      context.commit("UPDATE_PLAYER_NUM", value);
    },
    setPlayersJoined(context, payload) {
      context.commit("UPDATE_PLAYERS_JOINED", payload);
      console.log("setPlayersJoined");
    },
    setAllPlayersJoined(context) {
      context.commit("UPDATE_ALL_PLAYERS_JOINED");
      context.commit("UPDATE_MATCH_STATIUS", "started");
      router.push("/scorecard");
    },
    setScoringStyle(context, value) {
      context.commit("UPDATE_SCORING_STYLE", value);
      console.log("scoringstyle action", value);
    },
    setError(context, value) {
      context.commit("UPDATE_ERROR", value);
    },
    setScoreRow(context, value) {
      context.commit("UPDATE_SCORE_ROW", value);
    },

    resetInputValues(context) {
      context.commit("RESET_INPUT_VALUES");
    },

    setSubscription(context, value) {
      context.commit("UPDATE_SUBSCRIPTION", value);
    },

    // trying to move all fetches here
    async initOnLoad(context) {
      const user = await getUser();
      if (!user) {
        return;
      }
      context.commit("UPDATE_USER", user);

      const { data, error } = await getUserDetails(user.id);
      if (error) {
        console.log(error);
      }

      if (data) {
        context.commit("UPDATE_USER_DETAILS", data);

        if (data.active_match)
          context.dispatch("getAndSetMatch", data.active_match);
      }
    },
  },
  modules: {
    user,
    match,
  },
});
