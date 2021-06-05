<template>
  <div>
    <p>You are currently in</p>
    <p>Match #{{ activeMatch }}</p>
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
  created() {
    console.log(this.$store.getters.user);
  },
};
</script>