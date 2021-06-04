<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Scoring Style</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">prev</div>
      <div class="flex-grow flex flex-col">
        <div
          :class="[scoringStyle == 'solo' ? activeClass : null, selectorClass]"
          @click="select('solo')"
        >
          I'll keep track
        </div>
        <div
          :class="[
            scoringStyle == 'classic' ? activeClass : null,
            selectorClass,
          ]"
          @click="select('classic')"
        >
          Classic style
        </div>
      </div>
      <div v-if="isReady" class="controller-next-ready" @click="next">next</div>
      <div v-else class="controller-next-notReady">next</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectScoring",
  data() {
    return {
      selectorClass:
        "flex-auto flex justify-center items-center cursor-pointer",
      activeClass: "border",
    };
  },
  computed: {
    scoringStyle() {
      return this.$store.state.input.scoringStyle;
    },
    isReady() {
      return (
        this.$store.state.match.players != "" &&
        this.$store.state.match.points != "" &&
        this.$store.state.match.holes != "" &&
        this.$store.state.match.scoringStyle != ""
      );
    },
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    next() {
      if (this.isReady) {
        this.$store.dispatch("setController", "confirmGame");
      }
    },
    select(mode) {
      this.$store.dispatch("setScoringStyle", mode);
    },
  },
};
</script>
