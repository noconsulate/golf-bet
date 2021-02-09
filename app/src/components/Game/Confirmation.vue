<template>
  <div class="space-y-3">
    <div>
      Make it happen!
    </div>
    <div><button class="btn" @click="confirm">Confirm game</button></div>
  </div>
</template>

<script>
export default {
  name: "confirmation",
  methods: {
    confirm() {
      this.$store.dispatch("setSequence", "gameplay");
    },
  },
};
</script>
