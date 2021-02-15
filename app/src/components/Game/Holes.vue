<template>
  <div class="space-y-3">
    <div class="flex justify-center">
      <p>
        NUMBER OF HOLES
      </p>
    </div>
    <div class="space-x-3">
      <div class="flex justify-center space-x-2">
        <button
          :class="[holes == '18' ? activeClass : inactiveClass]"
          @click="selectHoles('18')"
        >
          18
        </button>
        <button
          :class="[holes == '9' ? activeClass : inactiveClass]"
          @click="selectHoles('9')"
        >
          9
        </button>
      </div>
    </div>
    <div class="flex justify-center">
      <button @click="goForward" class="btn">Confirm</button>
    </div>
    <div class="flex justify-center">
      <button @click="back" class="btn block">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "holes",
  data() {
    return {
      holes: "18",
      // classes
      activeClass: "rounded border border-black bg-blue-300 w-8",
      inactiveClass: "rounded border border-black w-8",
    };
  },
  methods: {
    selectHoles(holes) {
      this.holes = holes;
    },
    goForward() {
      this.$store.dispatch("setHoles", this.holes);
      this.$store.dispatch("setSequence", "confirmation");
    },
    back() {
      this.$store.dispatch("setSequence", "points");
    },
  },
  created() {
    if (this.$store.state.holes != "") {
      this.holes = this.$store.state.holes;
    }
  },
};
</script>
