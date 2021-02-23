<template>
  <div class="space-y-3 flex items-center flex-col">
    <p>SHARE GAME</p>
    <img class="block w-48 h-full" src="../../assets/qr-code.png" />
    <button class="btn block" @click="goForward">Continue</button>
    <button class="btn" @click="back">Back</button>
  </div>
</template>

<script>
export default {
  name: "share",
  methods: {
    goForward() {
      this.$store.dispatch("setSequence", "gameplay");
    },
    back() {
      this.$store.dispatch("setSequence", "confirmation");
    },
  },
};
</script>
