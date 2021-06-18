import Vue from "vue";
import Vuex from "vuex";

import { getUser, getUserDetails } from "../utilities/bridges/auth";

import { user } from "./userModule";
import { match } from "./matchModule";
import { ui } from "./uiModule";
import { scores } from "./scoresModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    UPDATE_ALL_PLAYERS_JOINED(state) {
      state.allPlayersJoined = true;
    },
  },
  actions: {
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
