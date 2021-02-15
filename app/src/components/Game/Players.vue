<template>
  <div class="space-y-3">
    <div class="flex justify-center">
      <p>NUMBER OF PLAYERS</p>
    </div>
    <div class="flex justify-center">
      <input v-model="players" type="number" class="w-16 block pl-2" />
    </div>
    <div class="flex justify-center">
      <button @click="confirm" class="btn">Confirm</button>
    </div>
    <div class="flex justify-center">
      <p>(2-4 Limit)</p>
    </div>
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
