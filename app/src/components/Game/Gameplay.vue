<template>
  <div class="space-y-3">
    <div>
      Gameplay
    </div>
    <div :class="rowClass">
      <div class="inline-block">Your score</div>
      <input class="inline-block w-8" v-model="scores[0]" />
    </div>
    <div v-for="index in players - 1" :key="index" :class="rowClass">
      <div class="inline-block">0pponent {{ index }}</div>
      <input class="inline-block w-8" v-model="scores[index]" />
    </div>
  </div>
</template>

<script>
export default {
  name: "gameplay",
  data() {
    return {
      // classes
      rowClass: "space-x-4",
      scores: [""],
    };
  },
  computed: {
    players() {
      return Number(this.$store.state.players);
    },
  },
};
</script>
