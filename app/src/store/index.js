import Vue from "vue";
import Vuex from "vuex";

import router from "../router/";
import { getUser, getUserDetails } from "../utilities/bridges/auth";
import { newMatch, getMatch, matchListener } from "../utilities/bridges/match";
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
    // players: "4",
    // points: "20",
    // holes: "18",
    // scoringStyle: "solo",
    matchId: "",
    playerNum: null,
    playersJoined: 0,
    allPlayersJoined: false,
    error: "",
    user: {},
    userDetails: {
      activeMatch: null,
    },
    scores: [],
    matchStatus: "",
    // I should put all match stuff here and leave the specific ones for the forms in Create.vue's state
    match: {
      id: "",
      status: "",
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
      // console.log(state.match.players_joined, state.match.players);
      state.match.players_joined == state.match.players
        ? (result = true)
        : (result = false);
      return result;
    },
    match: (state) => {
      let holes, scoringStyle;
      state.match.is_18_holes ? (holes = 18) : (holes = 9);
      state.match.is_classic_scoring
        ? (scoringStyle = "classic")
        : (scoringStyle = "solo");

      return { holes, scoringStyle };
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
      state.match.status = payload;
    },
    UPDATE_MATCH(state, payload) {
      state.match = payload;
    },
    RESET_MATCH_VALUES(state) {
      state.match = { id: "" };
      // state.matchId = "";
      state.controller = "selectPlayers";
    },
    RESET_INPUT_VALUES(state) {
      state.input.players = "";
      state.input.points = "";
      state.input.holes = "";
      state.input.scoringStyle = "";
    },
    UPDATE_ACTIVE_MATCH(state, payload) {
      state.userDetails.active_match = payload;
    },
    UPDATE_SUBSCRIPTION(state, payload) {
      state.subscription = payload;
    },
    CLEAR_USER(state) {
      state.user = {};
      state.userDetails = {};
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
    resetInputValues(context) {
      context.commit("RESET_INPUT_VALUES");
    },
    setActiveMatch(context, value) {
      context.commit("UPDATE_ACTIVE_MATCH", value);
    },
    setSubscription(context, value) {
      context.commit("UPDATE_SUBSCRIPTION", value);
    },
    setClearUser(context) {
      context.commit("CLEAR_USER");
    },

    // trying to move all fetches here
    async getAndSetUserDetails(context, userId) {
      const { data, error } = await getUserDetails(userId);
      if (error) {
        console.log(error);
      }

      if (data) {
        context.commit("UPDATE_USER_DETAILS", data);
      }
    },

    async getAndSetNewMatch(context, values) {
      const { data, error } = await newMatch(values);

      if (error) {
        console.error(error);
      }
      if (data) {
        context.commit("UPDATE_MATCH_STATUS", "waiting");
        context.commit("UPDATE_PLAYER_NUM", 1);

        const matchInfo = await getMatch(data.match_id);

        console.log(matchInfo);

        if (matchInfo.error) {
          console.error(matchInfo.error);
        }
        if (matchInfo.data) {
          context.commit("UPDATE_MATCH", matchInfo.data[0]);
          matchListener();
        }
      }
    },

    async getAndSetMatch(context, matchId) {
      const { data, error } = await getMatch(matchId);
      if (error) {
        console.error(error);
      }
      if (data) {
        context.commit("UPDATE_MATCH", data[0]);
        matchListener();
      }
    },

    async initOnLoad(context) {
      const user = await getUser();
      if (!user) {
        return;
      }
      context.commit("UPDATE_USER", user);
      // context.dispatch("getAndSetUserDetails", user.id);

      const { data, error } = await getUserDetails(user.id);
      if (error) {
        console.log(error);
      }

      if (data) {
        context.commit("UPDATE_USER_DETAILS", data);

        context.dispatch("getAndSetMatch", data.active_match);
      }
    },
  },

  modules: {},
});
