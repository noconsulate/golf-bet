<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
      <div
        class="flex flex-grow cursor-pointer justify-center items-center text-4xl"
        @click="confirm"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready" @click="confirm">next</div>
    </div>
  </div>
</template>

<script>
import { createMatch } from "../../utilities/bridges";

export default {
  name: "confirmGame",
  computed: {
    matchInfo() {
      return {
        players: this.$store.state.players,
        points: this.$store.state.points,
        holes: this.$store.state.holes,
        scoringStyle: this.$store.state.scoringStyle,
      };
    },
    players() {
      return this.$store.state.players;
    },
    points() {
      return this.$store.state.points;
    },
    holes() {
      return this.$store.state.holes;
    },
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    async confirm() {
      if (
        this.players == "" ||
        this.holes == "" ||
        this.points == "" ||
        this.scoringStyle == ""
      ) {
        alert("finish setting up game, loser");
        return;
      }

      console.log(this.matchInfo)
      const matchId = await createMatch(this.matchInfo);
      this.$store.dispatch("setMatchId", matchId);
      this.$store.dispatch("setPlayerNum", 1);
      this.$store.dispatch("setController", "waitingForPlayers");
    },
  },
};
</script>
