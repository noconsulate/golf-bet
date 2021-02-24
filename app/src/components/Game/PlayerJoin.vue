<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>Welcome Player {{ playerNum }}</p>
    <p>This game has</p>
    <p>{{ players }} players</p>
    <p>for {{ points }} points</p>
    <p>playing {{ holes }} holes</p>
    <button @click="confirm" class="btn">Confirm</button>
  </div>
</template>

<script>
export default {
  name: "playerJoin",
  computed: {
    playerNum() {
      return this.$store.state.playerNum;
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
  },
  methods: {
    confirm() {
      this.$store.dispatch("setSequence", "gameplay");
    },
  },
};
</script>
