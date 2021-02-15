<template>
  <div class="space-y-3">
    <div class="flex justify-center">
      <img src="../../assets/ACTION-logo(1).png" />
    </div>
     <div class="flex justify-center">
      <button @click="goForward" class="btn">GET STARTED</button>
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
