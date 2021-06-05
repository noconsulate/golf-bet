<template>
  <div>
    <p>You are currently in</p>
    <p>Match #{{ active_match }}</p>
  </div>
</template>

<script>
export default {
  name: "MatchInfo",
  computed: {
    activeMatch() {
      return this.$store.getters.user.active_match;
    },
  },
};
</script>