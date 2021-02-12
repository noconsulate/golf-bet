<template>
<div class="h-24 ...">
  <div class="space-y-3">
    <div class="flex justify-center bg-gray-200">
       <div>
      Welcome to Golf Bets
    </div>
    </div>
        <div class="flex justify-center">
    <div>
      <button @click="goForward" class="btn">Continue</button>
    </div>
        </div>
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
