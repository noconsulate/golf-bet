import { getScores } from "../utilities/bridges/score";

export const scores = {
  state: {},

  getters: {},

  mutuations: {},
  actions: {
    async initScores(context) {
      const matchId = context.rootState.match.match.id;
      console.log(matchId);
      const { data, error } = await getScores();
    },
  },
};
