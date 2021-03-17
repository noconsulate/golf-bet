<template>
  <div>
    <Players4 v-if="players == '4'" />
  </div>
</template>

<script>
import Players4 from "../components/Scorecard/Players4.vue";
export default {
  name: "scoredcard",
  components: {
    Players4,
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
  },
};
</script>
