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
      console.log("start initOnLoad");
      const user = await getUser();
      if (!user) {
        return;
      }

      console.log("got user");
      context.commit("UPDATE_USER", user);

      const { data, error } = await getUserDetails(user.id);
      console.log("get userDetails");
      if (error) {
        console.log(error);
      }

      if (data) {
        context.commit("UPDATE_USER_DETAILS", data);
        console.log("got user details", data.active_match);

        if (data.active_match)
          context.dispatch("getAndSetMatch", data.active_match);
        console.log("getAndSetMatch returned", context.state.match.match);
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
