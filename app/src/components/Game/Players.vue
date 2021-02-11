<template>
  <div class="space-y-3">
    <p>Number of players</p>
    <input v-model="players" type="number" class="w-1/3 block" />
    <button @click="confirm" class="btn">Confirm</button>
    <p>(1-4 limit)</p>
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
};
</script>
