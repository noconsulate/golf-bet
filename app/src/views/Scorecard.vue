<template>
  <div>
    <Solo2PlayersMaster v-if="renderPicker() === 'Solo2PlayerMaster'" />
    <Solo2PlayersSlave v-if="renderPicker() === 'Solo2PlayerSlave'" />
    <Solo4Players
      v-if="players == '4' && scoringStyle == 'solo' && playerNum == '1'"
    />
    <Classic4Players v-if="players == '4' && scoringStyle == 'classic'" />
  </div>
</template>

<script>
import Solo2PlayersMaster from "../components/Scorecard/Solo2PlayersMaster.vue";
import Solo2PlayersSlave from "../components/Scorecard/Solo2PlayersSlave.vue";
import Classic4Players from "../components/Scorecard/Classic4Players.vue";
import Solo4Players from "../components/Scorecard/Solo4Players";
export default {
  name: "scoredcard",
  components: {
    Solo2PlayersMaster,
    Solo2PlayersSlave,
    Classic4Players,
    Solo4Players,
  },
  computed: {
    players() {
      return this.$store.state.match.match.players;
    },
    scoringStyle() {
      return this.$store.getters.match.scoringStyle;
    },
    playerNum() {
      return this.$store.getters.user.player_num;
    },
  },
  methods: {
    renderPicker() {
      if (
        this.players === 2 &&
        this.scoringStyle === "solo" &&
        this.playerNum === 1
      )
        return "Solo2PlayerMaster";
      if (
        this.players == 2 &&
        this.scoringStyle === "solo" &&
        this.playerNum > 1
      )
        return "Solo2PlayerSlave";
    },
  },
};
</script>
