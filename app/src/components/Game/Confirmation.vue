<template>
  <div class="space-y-3">
    <p>
      Make it happen!
    </p>
    <button class="btn" @click="confirm">Confirm game</button>
    <button @click="back" class="btn block">Back</button>
  </div>
</template>

<script>
export default {
  name: "confirmation",
  methods: {
    confirm() {
      this.$store.dispatch("setSequence", "gameplay");
    },
    back() {
      this.$store.dispatch("setSequence", "holes");
    },
  },
};
</script>
