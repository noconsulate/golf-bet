<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>NUMBER OF PLAYERS</p>
    <input v-model="players" type="number" class="w-16 block pl-2" />
    <button @click="confirm" class="btn">Confirm</button>
    <p>(2-4 Limit)</p>
  </div>
</template>

<script>
export default {
  name: "Players",
  data() {
    return {
      players: "",
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("setPlayers", this.players);
      this.$store.dispatch("setSequence", "points");
    },
  },
  created() {
    if (this.$store.state.players != "") {
      this.players = this.$store.state.players;
    }
  },
};
</script>
