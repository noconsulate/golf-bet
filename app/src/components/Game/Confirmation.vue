<template>
  <div class="space-y-3 flex items-center flex-col">
    <p>LET'S GO!</p>
    <p>You're playing with {{ gameInfo.players }} players</p>
    <p>{{ gameInfo.holes }} holes</p>
    <p>for {{ gameInfo.points }} points.</p>
    <button class="btn" @click="confirm">Confirm game</button>
    <button @click="back" class="btn block">Back</button>
    <p>
      (By clicking confirm user agrees to terms of service. This application is
      not responsible for mitigating disputes. Disputed games will result in
      return of points to all parties.)
    </p>
  </div>
</template>

<script>
import { createGame } from "../../utilities/bridges";
export default {
  name: "confirmation",
  data() {
    return {
      gameId: "",
    };
  },
  computed: {
    gameInfo() {
      return {
        players: this.$store.state.players,
        points: this.$store.state.points,
        holes: this.$store.state.holes,
      };
    },
  },
  methods: {
    async confirm() {
      let docRefId = await createGame(this.gameInfo);
      this.$store.dispatch("setCreatedGameId", docRefId);

      this.$store.dispatch("setSequence", "share");
    },
    back() {
      this.$store.dispatch("setSequence", "holes");
    },
  },
};
</script>
