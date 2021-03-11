<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Scoring Style</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
      <div class="bg-yellow-400 flex-grow flex flex-col">
        <div>I'll keep track</div>
        <div>Classic style</div>
      </div>
      <div class="controller-next" @click="next">next</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectScoring",
  data() {
    return {
      scoringStyle: null,
    };
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    next() {
      if (this.scoringStyle != null) {
        this.$store.dispatch("setController", "confirmGame");
      }
    },
  },
};
</script>
