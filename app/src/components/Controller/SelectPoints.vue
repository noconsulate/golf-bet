<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Number of Points</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">prev</div>
      <div class="flex-grow flex flex-wrap justify-center content-center">
        <input type="number" v-model="points" class="h-8 w-16 border" />
      </div>
      <div v-if="isReady" class="controller-next-ready" @click="next">next</div>
      <div v-else class="controller-next-notReady">next</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // classes
      selected: "border",
      points: "",
    };
  },
  computed: {
    isReady() {
      return this.$store.state.match.players != "" && this.points != "";
    },
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectPlayers");
    },
    next() {
      if (this.points != null) {
        this.$store.dispatch("setPoints", this.points);
        this.$store.dispatch("setController", "selectHoles");
      } else {
        console.log("select some points");
      }
    },
  },
  created() {
    this.points = this.$store.state.input.points;
  },
};
</script>
