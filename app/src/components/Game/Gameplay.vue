<template>
  <div class="space-y-3">
    <div>
      Gameplay
    </div>
    <div :class="rowClass">
      <div class="inline-block">Your score</div>
      <input class="inline-block w-16" v-model="scores[0]" type="number" />
    </div>
    <div v-for="index in players - 1" :key="index" :class="rowClass">
      <div class="inline-block">0pponent {{ index }}</div>
      <input class="inline-block w-16" v-model="scores[index]" type="number" />
    </div>
    <div>
      <button @click="confirm" class="btn">Confirm</button>
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
      scores: [],
    };
  },
  computed: {
    players() {
      return Number(this.$store.state.players);
    },
  },
  methods: {
    confirm() {
      this.$store.dispatch("setScores", this.scores);
      this.$store.dispatch("setSequence", "gameover");
    },
  },
};
</script>
