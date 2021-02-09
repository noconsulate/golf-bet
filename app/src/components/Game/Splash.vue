<template>
  <div class="space-y-3">
    <div>
      Welcome to Golf Bets
    </div>
    <div>
      <button @click="goForward" class="btn">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Splash",
  methods: {
    goForward() {
      this.$store.dispatch("setSequence", "points");
    },
  },
};
</script>
