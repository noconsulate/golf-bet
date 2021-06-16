import Vue from "vue";
import Vuex from "vuex";

import { getUser, getUserDetails } from "../utilities/bridges/auth";

import { user } from "./userModule";
import { match } from "./matchModule";
import { ui } from "./uiModule";
import { scores } from "./scoresModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    INITIALIZE_SCORES(state, payload) {
      window.payload = payload;
      payload.map((item) => {
        state.scores.push(item);
      });
    },
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.allPlayersJoined = true;
    },
    UPDATE_SCORE_ROW(state, payload) {
      const index = payload.player - 1;
      state.scores[index] = payload.score;
      state.scores = [...state.scores];
    },
  },
  actions: {
    // initScores(context, value) {
    //   context.commit("INITIALIZE_SCORES", value);
    // },
    setScoreRow(context, value) {
      context.commit("UPDATE_SCORE_ROW", value);
    },

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
    ui,
    scores,
  },
});
