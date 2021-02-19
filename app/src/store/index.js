import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // @AUSTIN change this one to whatever particular "page" in the gameplay you want to see. "splash" is default because that's where the app starts. e.g. use
    // sequence: "finalScore",
    // to start it out at the Final Score page
    sequence: "finalScore",
    players: "2",
    points: "",
    holes: "18",
    // @AUSTIN uncomment the following entries for myScore and opponentScore to provide default values that will make the finalScore pages easier to work with so you don't have to input them in every time yourself. just make sure to comment out the two lines after it!

    // @AUSTIN you can make a selection and do ctrl + / to comment/uncomment. or do ctrl + / when your to do so to a line where your curser is
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
    // @AUSTIN comment out these next two lines if you uncomment the two above!
    // myScore: [],
    // opponentScore: [],
  },
  mutations: {
    UPDATE_SEQUENCE(state, payload) {
      state.sequence = payload;
    },
    UPDATE_PLAYERS(state, payload) {
      state.players = payload;
      console.log("updateplayers" + payload);
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
  },
  actions: {
    setSequence(context, value) {
      context.commit("UPDATE_SEQUENCE", value);
    },
    setPlayers(context, value) {
      console.log(value);
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
  },

  modules: {},
});
