<template>
  <div class="space-y-3">
    <div>
      Number of players
    </div>
    <div>
      <input v-model="players" type="number" />
      <button @click="confirm" class="btn">Confirm</button>
    </div>
    <div>
      (1-4 limit)
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
    },
  },
};
</script>
