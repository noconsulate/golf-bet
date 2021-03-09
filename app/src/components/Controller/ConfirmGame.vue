<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
      <div
        class="flex flex-grow bg-yellow-400 cursor-pointer justify-center items-center text-4xl"
        @click="confirm"
      >
        LET'S GO!!
      </div>
      <div class="controller-next" @click="confirm">next</div>
    </div>
  </div>
</template>

<script>
import { createGame } from "../../utilities/bridges";

export default {
  name: "confirmGame",
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
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    async confirm() {
      const docRefId = await createGame(this.gameInfo);
      this.$store.dispatch("setGameId", docRefId);
      this.$store.dispatch("setPlayerNum", 1);
      this.$store.dispatch("setController", "waitingForPlayers");
    },
  },
};
</script>
