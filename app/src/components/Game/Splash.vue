<template>
  <div class="flex flex-col items-center">
    <div>
      <img src="../../assets/ACTION-logo-white(1).png" class="w-full h-full" />
    </div>
    <button @click="goForward" class="btn ">GET STARTED</button>
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
  created() {},
};
</script>
