<template>
  <div class="w-full">
    <div class="grid grid-cols-8">
      <div :class="cell" class="col-span-4">Handicap</div>
      <div :class="cell"></div>
      <div :class="cell"></div>
      <div :class="cell"></div>
      <div :class="cell"></div>

      <div :class="cell">Hole</div>
      <div :class="cell">Tee</div>
      <div :class="cell">Par</div>
      <div :class="cell">HR</div>
      <div :class="cell">P1</div>
      <div :class="cell">P2</div>
      <div :class="cell">P3</div>
      <div :class="cell">P4</div>

      <template v-for="index in holes">
        <div
          :class="[index == activeHole ? activeRow : cell]"
          @click="selectRow(index)"
        >
          {{ index }}
        </div>
        <div :class="[index == activeHole ? activeRow : cell]">
          {{ courseData.tees[index - 1] }}
        </div>
        <div :class="[index == activeHole ? activeRow : cell]">
          {{ courseData.pars[index - 1] }}
        </div>
        <div :class="[index == activeHole ? activeRow : cell]">
          {{ courseData.ratings[index - 1] }}
        </div>
        <div
          :class="[
            index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 1 ? activeCell : cell,
          ]"
        >
          {{ scores[index - 1][0] }}
        </div>
        <div
          :class="[
            index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 2 ? activeCell : cell,
          ]"
        >
          {{ scores[index - 1][1] }}
        </div>
        <div
          :class="[
            index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 3 ? activeCell : cell,
          ]"
        >
          {{ scores[index - 1][2] }}
        </div>
        <div
          :class="[
            index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 4 ? activeCell : cell,
          ]"
        >
          {{ scores[index - 1][3] }}
        </div>
      </template>
    </div>
    <div class="flex flex-col border mt-2 space-y-2">
      <div class="flex justify-center space-x-1">
        <button @click="prevHole" class="btn">previous hole</button>
        <button @click="enterScore" class="btn">enter score</button>
        <button @click="nextHole" class="btn">next hole</button>
      </div>
      <div class="flex justify-center">Hole {{ activeHole }}</div>
      <div class="flex justify-center">Player {{ activePlayer }}</div>
      <div class="flex justify-center space-x-1">
        <button @click="prevPlayer" class="btn">prev. player</button>
        <input type="number" class="border w-12" v-model="score" />
        <button @click="nextPlayer" class="btn">next player</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scorecard",
  data() {
    return {
      // classes
      cell: "border",
      activeRow: "border bg-gray-100",
      activeCell: "border bg-blue-100",

      activeHole: 1,
      activePlayer: 1,
      score: null,
      scores: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
      ],
    };
  },
  computed: {
    // classes
    cellClass() {
      console.log();
    },
    holes() {
      return Number(this.$store.state.holes);
    },
    players() {
      return this.$store.state.players;
    },
    courseData() {
      return {
        tees: [
          232,
          234,
          126,
          666,
          696,
          313,
          216,
          316,
          118,
          232,
          234,
          126,
          666,
          696,
          313,
          216,
          316,
          118,
        ],
        pars: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ratings: [
          12,
          18,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
        ],
      };
    },
  },
  methods: {
    selectRow(index) {
      this.activeHole = index;
    },
    prevHole() {
      --this.activeHole;
    },
    nextHole() {
      ++this.activeHole;
    },
    enterScore() {
      console.log("what");
    },
    prevPlayer() {
      if (this.activePlayer == 1 && this.activeHole == 1) {
        return;
      }
      this.scores[this.activeHole - 1][this.activePlayer - 1] = this.score;
      if (this.activePlayer > 1) {
        this.activePlayer--;
      } else {
        this.activePlayer = this.players;
        this.activeHole--;
      }
    },
    nextPlayer() {
      if (this.activePlayer == this.players && this.activeHole == this.holes) {
        return;
      }
      this.scores[this.activeHole - 1][this.activePlayer - 1] = this.score;
      if (this.activePlayer < this.players) {
        this.activePlayer++;
      } else {
        this.activePlayer = 1;
        this.activeHole++;
      }
    },
  },
  watch: {
    activePlayer: function(neww, old) {
      this.score = this.scores[this.activeHole - 1][this.activePlayer - 1];
    },
    activeHole: function(neww, old) {
      this.score = this.scores[this.activeHole - 1][this.activePlayer - 1];
    },
  },
};
</script>
