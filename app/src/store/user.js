export const user = {
  state: {
    user: {},
    userDetails: {
      activeMatch: null,
    },
    fOOBANG: "peepee",
  },
  getters: {
    user: (state) => {
      if (state.user) {
        let user = { ...state.user, ...state.userDetails };
        return user;
      } else {
        return null;
      }
    },
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_USER_DETAILS(state, payload) {
      state.userDetails = payload;
    },
    CLEAR_USER(state) {
      state.user = {};
      state.userDetails = {};
    },
    TEST_MUTATION(state) {
      console.log("test mutation reached");
    },
  },
  actions: {
    setUser(context, value) {
      context.commit("UPDATE_USER", value);
    },
    setUserDetails(context, value) {
      context.commit("UPDATE_USER_DETAILS", value);
    },
    setClearUser(context) {
      context.commit("CLEAR_USER");
    },
    async getAndSetUserDetails(context, userId) {
      const { data, error } = await getUserDetails(userId);
      if (error) {
        console.log(error);
      }

      if (data) {
        context.commit("UPDATE_USER_DETAILS", data);
      }
    },
  },
};
