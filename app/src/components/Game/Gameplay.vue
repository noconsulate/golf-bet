<template>
  <div class="space-y-3">
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
      myScore: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      opponentScore: [1, 2, 3, 4, 5, 6, 7, 8, 9],
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
    },
  },
};
</script>
