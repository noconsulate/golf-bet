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
};
