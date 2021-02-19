<template>
  <div class="space-y-3">
    <!-- "v-for" is a loop, in this case referencing the value "holes" found in the script under "data". -->
    <div id="holeCard" v-for="index in holes" :key="index">
      <div v-if="index == currentHole">
        <div class="flex justify-center">
          <p>Hole {{ currentHole }}</p>
        </div>
        <div class="flex flex-col">
          <p>Your Score</p>
          <input type="number" v-model="myScore[index]" />
        </div>
        <div class="flex flex-col">
          <p>Opponent Score</p>
          <input type="number" v-model="opponentScore[index]" />
        </div>
        <div>
          <button @click="previous" class="btn">Previous Hole</button>
          <button @click="next" class="btn">Next Hole</button>
        </div>
      </div>
    </div>
    <div v-if="currentHole == holes">
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
      currentHole: 9,
    };
  },
  computed: {
    holes() {
      return Number(this.$store.state.holes);
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
