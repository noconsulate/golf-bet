<template>
  <div class="space-y-3">
    <div class="flex justify-center bg-gray-200">
      <p>
        Welcome to Golf Bets
      </p>
    </div>
    <div class="flex justify-center">
      <button @click="goForward" class="btn">Continue</button>
    </div>
    <div class="flex justify-center">
      <img src="../../assets/ACTION-logo.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Splash",
  methods: {
    goForward() {
      this.$store.dispatch("setSequence", "players");
    },
  },
};
</script>
