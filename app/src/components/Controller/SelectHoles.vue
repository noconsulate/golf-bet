<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Number of Holes</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">prev</div>
      <div class="grid grid-cols-2 flex-grow">
        <div
          class="flex justify-center items-center text-4xl cursor-pointer"
          :class="[holes == '9' ? selected : null]"
          @click="select('9')"
        >
          9
        </div>
        <div
          class="flex justify-center items-center text-4xl cursor-pointer"
          :class="[holes == '18' ? selected : null]"
          @click="select('18')"
        >
          18
        </div>
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
      //classes
      selected: "border",
    };
  },
  computed: {
    holes() {
      return this.$store.state.input.holes;
    },
    isReady() {
      return (
        this.$store.state.match.match.players != "" &&
        this.$store.state.match.match.points != "" &&
        this.$store.state.match.match.holes != ""
      );
    },
  },
  methods: {
    select(num) {
      this.$store.dispatch("setHoles", num);
    },
    prev() {
      this.$store.dispatch("setController", "selectPoints");
    },
    next() {
      if (
        this.holes != "" &&
        this.$store.state.match.match.players != "" &&
        this.$store.state.match.match.points != ""
      ) {
        this.$store.dispatch("setController", "selectScoring");
      }
    },
  },
  created() {
    // this.holes = this.$store.state.match.match.holes;
  },
};
</script>
