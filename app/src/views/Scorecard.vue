<template>
  <div>
    <Solo4Players v-if="players == 1 && scoringStyle == 'solo'" />
    <Solo4Players
      v-if="players == '4' && scoringStyle == 'solo' && playerNum == '1'"
    />
    <Classic4Players v-if="players == '4' && scoringStyle == 'classic'" />
  </div>
</template>

<script>
import Solo2Players from "../components/Scorecard/Solo2Players.vue";
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
      return this.$store.state.match.match.players;
    },
    scoringStyle() {
      return this.$store.state.match.match.scoringStyle;
    },
    playerNum() {
      return this.$store.state.ui.playerNum;
    },
  },
};
</script>
