export const ui = {
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
    // playersJoined: 0,
    //  allPlayersJoined: false,
    error: "",
    subscription: {},
  },
  getters: {
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
      state.input.holes = payload;
    },

    UPDATE_PLAYER_NUM(state, payload) {
      state.playerNum = payload;
    },
    UPDATE_PLAYERS_JOINED(state, payload) {
      state.match.players_joined = payload;
    },
    UPDATE_SCORING_STYLE(state, payload) {
      state.input.scoringStyle = payload;
    },
    UPDATE_ERROR(state, payload) {
      state.error = payload;
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
    setPlayerNum(context, value) {
      context.commit("UPDATE_PLAYER_NUM", value);
    },
    setPlayersJoined(context, payload) {
      context.commit("UPDATE_PLAYERS_JOINED", payload);
      console.log("setPlayersJoined");
    },
    setScoringStyle(context, value) {
      context.commit("UPDATE_SCORING_STYLE", value);
      console.log("scoringstyle action", value);
    },
    setError(context, value) {
      context.commit("UPDATE_ERROR", value);
    },
    resetInputValues(context) {
      context.commit("RESET_INPUT_VALUES");
    },

    setSubscription(context, value) {
      context.commit("UPDATE_SUBSCRIPTION", value);
    },
  },
};
