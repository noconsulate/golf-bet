<template>
  <div class="flex flex-col">
    <div class="controller-title">Join Game</div>

    <div class="controller-panel">
      <div class="controller-prev invisible">prev</div>
      <div
        class="
          flex flex-grow
          cursor-pointer
          justify-center
          items-center
          text-4xl
        "
        @click="join"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready invisible">next</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "joinGame",
  computed: {
    gameInfo() {
      return {
        players: this.$store.state.match.match.players,
        points: this.$store.state.match.match.points,
        holes: this.$store.state.match.match.holes,
        scoringStyle: this.$store.state.match.match.scoringStyle,
      };
    },
    players() {
      return this.$store.state.match.match.players;
    },
    points() {
      return this.$store.state.match.match.points;
    },
    holes() {
      return this.$store.state.match.match.holes;
    },
    scoringStyle() {
      return this.$store.state.match.match.scoringStyle;
    },
    matchId() {
      return this.$store.state.match.match.id;
    },
    uuid() {
      console.log(this.$store.state.user.id);

      return this.$store.state.user.id;
    },
  },
  methods: {
    async join() {
      this.$store.dispatch("joinMatch");
    },
  },
};
</script>
