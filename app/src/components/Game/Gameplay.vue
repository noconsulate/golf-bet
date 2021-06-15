<template>
  <div>
    <!-- @AUSTIN "v-for" is a loop, in this case referencing the value "holes" found in the script under "data". 
    <template> is just a VUE tag that doesn't get rendered, so we don't have an empty div or other element-->
    <template v-for="index in holes">
      <!-- @AUSTIN the v-for above would normally repeat the same <div> a bunch of times with a few variances. So the following div has a "v-if" which means it will render only if its unique "index" == currentHole. currentHole gets incremented each timme "next hole" is clicked upon. -->
      <div
        v-if="index == currentHole"
        :key="index"
        class="space-y-3 flex flex-col items-center"
      >
        <p>Hole {{ currentHole }}</p>
        <p>Your Score</p>
        <input type="number" v-model="myScore[index]" />
        <p>Opponent Score</p>
        <input type="number" v-model="opponentScore[index]" />
        <div class="space-x-2">
          <button @click="previous" class="btn">Previous Hole</button>
          <button @click="next" class="btn">Next Hole</button>
        </div>
      </div>
    </template>
    <div v-if="currentHole == holes" class="flex justify-center pt-3">
      <button @click="goForward" class="btn">Continue</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "gameplay",
  data() {
    return {
      // classes
      // data
      myScore: [],
      opponentScore: [],
      currentHole: 1,
    };
  },
  computed: {
    holes() {
      return Number(this.$store.state.match.match.holes);
    },
  },
  methods: {
    previous() {
      if (this.currentHole > 1) {
        this.currentHole--;
      }
    },
    next() {
      if (this.currentHole < this.holes) {
        this.currentHole++;
      }
    },
    goForward() {
      const scoresObj = {
        myScore: this.myScore,
        opponentScore: this.opponentScore,
      };
      this.$store.dispatch("setScores", scoresObj);
      this.$store.dispatch("setSequence", "finalScore");
    },
  },
};
</script>
