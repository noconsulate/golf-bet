<template>
  <div>
    <Solo4Players
      v-if="players == '4' && scoringStyle == 'solo' && playerNum == '1'"
    />
    <Classic4Players v-if="players == '4' && scoringStyle == 'classic'" />
  </div>
</template>

<script>
import Classic4Players from "../components/Scorecard/Classic4Players.vue";
import Solo4Players from "../components/Scorecard/Solo4Players";
export default {
  name: "scoredcard",
  components: {
    Classic4Players,
    Solo4Players,
  },
  computed: {
    players() {
      return this.$store.state.match.players;
    },
    scoringStyle() {
      return this.$store.state.match.scoringStyle;
    },
    playerNum() {
      return this.$store.state.playerNum;
    },
  },
};
</script>
