<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Scoring Style</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
      <div class="bg-yellow-400 flex-grow flex flex-col">
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
      <div class="controller-next" @click="next">next</div>
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
      scoringStyle: null,
    };
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    next() {
      if (this.scoringStyle != null) {
        this.$store.dispatch("setScoringStyle", this.scoringStyle);
        this.$store.dispatch("setController", "confirmGame");
      }
    },
    select(mode) {
      this.scoringStyle = mode;
    },
  },
};
</script>
