import {
  newMatch,
  getMatch,
  matchListener,
  confirmJoin,
  forfeitMatch,
  cancelMatch,
  leaveMatch,
} from "../utilities/bridges/match";

export const match = {
  state: {
    matchId: "",
    matchStatus: "",
    match: {
      id: "",
      status: "",
    },
  },

  getters: {
    match: (state) => {
      let holes, scoringStyle;
      state.match.is_18_holes ? (holes = 18) : (holes = 9);
      state.match.is_classic_scoring
        ? (scoringStyle = "classic")
        : (scoringStyle = "solo");
      const status = state.match.status;
      const players = state.match.players;
      const id = state.match.id;

      return { holes, scoringStyle, status, players, id };
    },
  },

  mutations: {
    UPDATE_MATCH_ID(state, payload) {
      state.matchId = payload;
    },
    UPDATE_MATCH(state, payload) {
      state.match = payload;
      console.log("match updated", state.match);
    },
    UPDATE_MATCH_STATUS(state, payload) {
      state.match.status = payload;
    },
    RESET_MATCH_VALUES(state) {
      state.match = { id: "" };
      // state.matchId = "";
      console.log("CHECK HERE FOR VUEX ISSUE");
      state.controller = "selectPlayers";
    },
    UPDATE_MATCH_STATIUS(state, payload) {
      state.match.status = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.match.players_joined = payload;
    },
  },

  actions: {
    setMatchId(context, value) {
      context.commit("UPDATE_MATCH_ID", value);
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
    setActiveMatch(context, value) {
      context.commit("UPDATE_ACTIVE_MATCH", value);
    },
    setPlayersJoined(context, payload) {
      context.commit("UPDATE_PLAYERS_JOINED", payload);
      console.log("setPlayersJoined");
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
          if (matchInfo.data[0].status == "waiting") {
            matchListener(matchInfo.data[0].id);
          }
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

        if (data[0].status == "waiting") {
          matchListener(data[0].id);
        }
        if (data[0].status === "playing") {
          console.log("status == playing");
          await context.dispatch("initScores");
          matchListener(data[0].id);
        }
        if (data[0].status === "gameover") {
          await context.dispatch("initScores");
        }
      }
    },

    async joinMatch(context, values) {
      const { data, error } = await confirmJoin(
        context.state.match.id,
        context.rootState.user.user.id
      );
      if (error) {
        console.error("confirmJoin error", error);
      }

      if (
        data.score_id == "00000000-0000-0000-0000-000000000000" &&
        data.players_joined_out == 9
      ) {
        console.error("GAME FULL");
        return;
      } else if (
        data.score_id == "00000000-0000-0000-0000-000000000000" &&
        data.players_joined_out == 8
      ) {
        console.log("GAME CANCELLED");
        context.dispatch("setMatchStatus", "cancelled");
        context.dispatch("setController", "waitingForPlayers");
        return;
      } else {
        console.log("game confirmed");
        context.dispatch("setController", "waitingForPlayers");
        context.dispatch("setPlayerNum", data.players_joined_out);
        context.dispatch("setPlayersJoined", data.players_joined_out);
        context.dispatch("setActiveMatch", this.matchId);
      }
    },

    async forfeitMatch(context) {
      const { data, error } = await forfeitMatch();
      console.log(data, error);
      if (!data.success || error) {
        console.log(data.success, error);
      }

      if (data.success) {
        context.dispatch("getAndSetUserDetails", context.getters.user.id);
      }
    },

    async cancelMatch(context) {
      const { data, error } = await cancelMatch();
      if (!data.success || error) {
        console.log(error, "success: " + data.success);
      }
      if (data.success == true) {
        console.log("match cancelled");
        // unsubscribe();
        context.commit("UPDATE_CONTROLLER", "joinGame");
        context.commit("UPDATE_ACTIVE_MATCH", null);
        context.commit("UPDATE_MATCH_STATUS", "cancelled");
        context.commit("UPDATE_SUBSCRIPTION", {});
      }
    },

    // just a gross way to do this with no settlements
    async leaveMatch(context, user) {
      const { data, error } = await leaveMatch(user);

      console.log(data, error, "left match idunno whatever");
    },
  },
};
