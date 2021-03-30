<template>
  <div>
    <Solo4PlayersScoring v-if="
      players == '4' && scoringStyle == 'solo' && playerNum == '1' 
    " />
    <Classic4Players v-if="
    players == '4' && scoringStyle == 'classic'
    " />
  </div>
</template>

<script>
import Classic4Players from "../components/Scorecard/Classic4Players.vue";
import Solo4PlayersScoring from "../components/Scorecard/Solo4PlayersScoring"
export default {
  name: "scoredcard",
  components: {
    Classic4Players,
    Solo4PlayersScoring
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
    playerNum() {
      return this.$store.state.playerNum
    },
  },
};
</script>
