<template>
  <div>
    <Solo v-if="renderPicker == 'card'" />
    <Results v-if="renderPicker == 'results'" />
  </div>
</template>

<script>
import Solo from "../components/Scorecard/Solo.vue";
import Results from "../components/Scorecard/Results.vue";
export default {
  name: "scoredcard",
  components: {
    Solo,
    Results,
  },
  data() {
    return {
      renderPicker: "card",
    };
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
    results() {
      return this.$store.state.scores.results;
    },
  },
  methods: {
    // renderPicker() {
    //   return this.$store.getters.results.length > 0 ? "results" : "card";
    // },
  },
  watch: {
    results(oldVal, newVal) {
      console.log(this.results);
      this.results.length > 0
        ? (this.renderPicker = "results")
        : (this.renderPicker = "card");
    },
  },
};
</script>
