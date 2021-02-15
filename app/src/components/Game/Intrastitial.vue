<template>
  <div>
    <p class="flex justify-center">LOADING</p>
  </div>
</template>

<script>
export default {
  name: "interstitial",
  created() {
    setTimeout(() => {
      this.$store.dispatch("setSequence", "gameover");
    }, 2000);
  },
};
</script>
