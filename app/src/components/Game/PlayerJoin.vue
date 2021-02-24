<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>Welcome Player {{ playerNum }}</p>
  </div>
</template>

<script>
export default {
  name: "playerJoin",
  computed: {
    playerNum() {
      return this.$store.state.playerNum;
    },
  },
};
</script>
