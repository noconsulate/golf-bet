<template>
  <div>
    <SoloMaster />
  </div>
</template>

<script>
import SoloMaster from "../components/Scorecard/SoloMaster.vue";
export default {
  name: "scoredcard",
  components: {
    SoloMaster,
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
      return "";
    },
  },
};
</script>
