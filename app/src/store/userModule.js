import { getUserDetails } from "../utilities/bridges/auth";

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
    isUser: (state) => {
      if (Object.keys(state.user).length === 0) return false;
      else return true;
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
    UPDATE_ACTIVE_MATCH(state, payload) {
      state.userDetails.active_match = payload;
    },
    CLEAR_USER(state) {
      state.user = {};
      state.userDetails = {};
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
    async getAndSetUserDetails(context) {
      const userId = context.getters.user.id;
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
