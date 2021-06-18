<template>
  <div>
    <Solo />
  </div>
</template>

<script>
import Solo from "../components/Scorecard/Solo.vue";
export default {
  name: "scoredcard",
  components: {
    Solo,
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
