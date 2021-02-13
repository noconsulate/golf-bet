<template>
  <div class="space-y-3">
    <p>
      Make it happen!
    </p>
    <p>
      (By clicking confirm you agree to handle disputes among your selves)
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
      this.$store.dispatch("setSequence", "share");
    },
    back() {
      this.$store.dispatch("setSequence", "holes");
    },
  },
};
</script>
