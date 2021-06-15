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

      return { holes, scoringStyle };
    },
  },

  mutations: {
    UPDATE_MATCH_ID(state, payload) {
      state.matchId = payload;
    },
    UPDATE_MATCH_STATUS(state, payload) {
      state.match.status = payload;
    },
    UPDATE_MATCH_STATUS(state, payload) {
      state.match.status = payload;
    },
    RESET_MATCH_VALUES(state) {
      state.match = { id: "" };
      // state.matchId = "";
      state.controller = "selectPlayers";
    },
    UPDATE_MATCH_STATIUS(state, payload) {
      state.match.status = payload;
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
  },
};
