<template>
  <div>
    <Solo v-if="renderPicker == 'card'" />
    <Results v-if="renderPicker == 'results'" />
    <AfterTotals v-if="renderPicker == 'afterResults'" />
  </div>
</template>

<script>
import Solo from "../components/Scorecard/Solo.vue";
import Results from "../components/Scorecard/Results.vue";
import AfterTotals from "../components/Scorecard/AfterTotals.vue";
export default {
  name: "scoredcard",
  components: {
    Solo,
    Results,
    AfterTotals,
  },
  data() {
    return {
      // renderPicker: "card",
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
    controller() {
      return this.$store.getters.controller;
    },
    renderPicker() {
      switch (this.controller) {
        case "confirmResults": {
          return "results";
        }
        case "afterTotals": {
          return "afterResults";
        }
        default: {
          return "card";
        }
      }
    },
  },
  methods: {
    // renderPicker() {
    // },
  },
  watch: {
    // results(oldVal, newVal) {
    //   console.log(this.results);
    //   this.results.length > 0
    //     ? (this.renderPicker = "results")
    //     : (this.renderPicker = "card");
    // },
  },
  created() {
    if (!this.players) {
      console.log("no match");
      this.$router.push("/");
    }
  },
};
</script>
