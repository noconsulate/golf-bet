<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @click="prev">prev</div>
      <div
        class="
          flex flex-grow
          cursor-pointer
          justify-center
          items-center
          text-4xl
        "
        @click="confirm"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready" @click="confirm">next</div>
    </div>
  </div>
</template>

<script>
import {
  newMatch,
  getMatch,
  matchListener,
} from "../../utilities/bridges/match";

export default {
  name: "confirmGame",
  computed: {
    // is this nessessessaryy?
    matchInfo() {
      return {
        players: this.$store.state.input.players,
        points: this.$store.state.input.points,
        is_18_holes: this.is18Holes,
        is_classic_scoring: this.isClassicScoring,
        creator: this.$store.state.user.id,
      };
    },
    players() {
      return this.$store.state.input.players;
    },
    points() {
      return this.$store.state.input.points;
    },
    holes() {
      return this.$store.state.input.holes;
    },
    is18Holes() {
      if (this.$store.state.input.holes == 18) return true;
      else return false;
    },
    scoringStyle() {
      return this.$store.state.input.scoringStyle;
    },
    isClassicScoring() {
      if (this.$store.state.scoringStyle == "classic") return true;
      else return false;
    },
    creator() {
      return this.$store.state.user.id;
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

      this.$store.dispatch("getAndSetNewMatch", this.matchInfo);
    },
  },
};
</script>
