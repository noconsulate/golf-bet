<template>
  <div class="space-y-3">
    <div>
      9 or 18 holes?
    </div>
    <div class="space-x-3">
      <button
        :class="[holes == '9' ? activeClass : inactiveClass]"
        @click="selectHoles('9')"
      >
        9
      </button>
      <button
        :class="[holes == '18' ? activeClass : inactiveClass]"
        @click="selectHoles('18')"
      >
        18
      </button>
    </div>
    <div>
      <button @click="goForward" class="btn">Confirm</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "holes",
  data() {
    return {
      holes: "9",
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
  },
};
</script>
