<template>
  <div class="w-full h-screen flex flex-col">
    <div class="flex-grow min-w-full overflow-auto">
      <div class="grid grid-cols-8" v-if="loaded">
        <div :class="cell(1)" class="col-span-4">Handicap</div>
        <div :class="cell(1)" class="invisible"></div>
        <div :class="cell(1)" class="invisible"></div>
        <div :class="cell(1)" class="invisible"></div>
        <div :class="cell(1)" class="invisible"></div>

        <div :class="cell(1)">Hole</div>
        <div :class="cell(1)">Tee</div>
        <div :class="cell(1)">Par</div>
        <div :class="cell(1)">HR</div>
        <div :class="cell(1)">P1</div>
        <div :class="cell(1)">P2</div>
        <div :class="cell(1)">P3</div>
        <div :class="cell(1)">P4</div>

        <template v-for="index in holes">
          <div
            :class="stylePicker(1, index)"
            @click="selectRow(index)"
            :key="String(index) + '0'"
          >
            {{ index }}
          </div>
          <div :class="stylePicker(1, index)" :key="String(index) + '1'">H</div>
          <div :class="stylePicker(1, index)" :key="String(index) + '2'">T</div>
          <div :class="stylePicker(1, index)" :key="String(index) + '3'">P</div>
          <div
            :class="[
              stylePicker(1, index, 1),
              isMaster ? 'cursor-pointer' : null,
            ]"
            @click="selectCell(1, index)"
            :key="String(index) + '4'"
          >
            {{ scores[0][index] }}
          </div>
          <div
            :class="[
              stylePicker(2, index, 2),
              isMaster ? 'cursor-pointer' : null,
            ]"
            @click="selectCell(2, index)"
            :key="String(index) + '5'"
          >
            {{ scores[1][index] }}
          </div>
          <div
            :class="[
              stylePicker(3, index, 3),
              isMaster ? 'cursor-pointer' : null,
            ]"
            @click="selectCell(3, index)"
            :key="String(index) + '6'"
          >
            {{ scores[2][index] }}
          </div>
          <div
            :class="[
              stylePicker(4, index, 4),
              isMaster ? 'cursor-pointer' : null,
            ]"
            @click="selectCell(4, index)"
            :key="String(index) + '7'"
          >
            {{ scores[3][index] }}
          </div>
        </template>
        <div :class="cell(1)">Total</div>
        <div :class="cell(1)">TT</div>
        <div :class="cell(1)">PP</div>
        <div :class="cell(1)">RR</div>
        <div :class="cell(1)">{{ totalScore(1) }}</div>
        <div :class="cell(1)">{{ totalScore(2) }}</div>
        <div :class="cell(1)">{{ totalScore(3) }}</div>
        <div :class="cell(1)">{{ totalScore(4) }}</div>
      </div>
      <div v-if="isScoringComplete" class="flex flex-col space-y-2">
        <div v-if="!isConfirmScores">
          <p class="flex justify-center">Scoring complete?</p>
          <div class="flex justify-center">
            <button class="btn" @click="toggleConfirmScores">confirm</button>
          </div>
        </div>
        <div v-else>
          <p class="flex justify-center">Scores confirmed</p>
          <div class="flex justify-center">
            <button class="btn" @click="toggleConfirmScores">cancel</button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="isMaster"
      class="flex flex-col border space-y-2 object-none object-bottom"
    >
      <div class="flex justify-center space-x-1">
        <button @click="prevHole" class="btn">previous hole</button>
        <button @click="enterScore" class="btn">enter score</button>
        <button @click="nextHole" class="btn">next hole</button>
      </div>
      <div class="flex justify-center">Hole {{ activeHole }}</div>
      <div class="flex justify-center">Player {{ activePlayer }}</div>
      <div class="flex justify-center space-x-1">
        <button @click="prevPlayer" class="btn">prev. player</button>
        <input
          ref="score"
          type="number"
          class="border w-12"
          v-model="scoreInput"
        />
        <button @click="nextPlayer" class="btn">next player</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "solo4Players",
  data() {
    return {
      // styles
      cellStyle: "border",
      activeRowStyle: "border bg-gray-100",
      activeCell: "border bg-blue-100",
      // other
      activeHole: 1,
      activePlayer: 1,
      key: 1,
      // loaded: false,
      scoreInput: 3,
    };
  },
  computed: {
    // visibilityP3() {
    //   if (this.players < 3) return "invisible";
    // },
    isMaster() {
      return this.$store.getters.user.player_num === 1 ? true : false;
    },
    matchId() {
      return this.$store.state.match.match.id;
    },
    scores() {
      return this.$store.getters.scores;
    },
    holes() {
      return Number(this.$store.getters.match.holes);
    },
    players() {
      return this.$store.state.match.match.players;
    },
    loaded() {
      return this.$store.state.scores.loaded;
    },
    isScoringComplete() {
      return this.$store.getters.isScoringComplete;
    },
    isConfirmScores() {
      return this.$store.state.scores.confirmScores;
    },
  },
  methods: {
    stylePicker(p, i, a) {
      if (!this.isMaster) {
        return this.cellStyle;
      }
      if (i == this.activeHole) {
        if (a == this.activePlayer) {
          return this.activeCell;
        } else {
          return this.activeRow(p);
        }
      } else return this.cell(p);
    },
    cell(p) {
      return this.cellStyle;
      switch (p) {
        case undefined: {
          return this.cellStyle;
        }
        case 1: {
          return this.cellStyle;
        }
        case 2: {
          return this.players < 2 ? "invisible" : this.cellStyle;
        }
        case 3: {
          return this.players < 3 ? "invisible" : this.cellStyle;
        }
        case 4: {
          return this.players < 4 ? "invisible" : this.cellStyle;
        }
      }
    },
    activeRow(p) {
      switch (p) {
        case undefined: {
          return this.activeRowStyle;
        }
        case 1: {
          return this.activeRowStyle;
        }
        case 2: {
          return this.players < 2 ? "invisible" : this.activeRowStyle;
        }
        case 3: {
          return this.players < 3 ? "invisible" : this.activeRowStyle;
        }
        case 4: {
          return this.players < 4 ? "invisible" : this.activeRowStyle;
        }
      }
    },
    selectRow(hole) {
      this.activeHole = hole;
    },
    selectCell(player, hole) {
      this.activePlayer = player;
      this.activeHole = hole;
    },
    totalScore(player) {
      const index = player - 1;
      let total = 0;
      for (let i = 1; i <= this.holes; i++) {
        let value = this.scores[index][i];
        if (Number.isFinite(value)) total += value;
      }
      return total > 0 ? total : null;
    },
    prevHole() {
      if (this.activeHole > 1) {
        this.activeHole--;
      }
    },
    nextHole() {
      if (this.activeHole < this.holes) {
        this.activeHole++;
      }
    },
    prevPlayer() {
      if (this.activePlayer > 1) {
        this.activePlayer--;
      } else {
        if (this.activeHole > 1) {
          this.activePlayer = this.players;
          this.activeHole--;
        }
      }
    },
    nextPlayer() {
      if (this.activePlayer < this.players) {
        this.activePlayer++;
      } else {
        if (this.activeHole < this.holes) {
          this.activePlayer = 1;
          this.activeHole++;
        }
      }
    },
    enterScore() {
      const values = {
        matchId: this.matchId,
        player: this.activePlayer,
        hole: this.activeHole,
        score: this.scoreInput,
      };
      this.$store.dispatch("setScore", values);

      if (this.activePlayer === this.players && this.activeHole == this.holes) {
        console.log("game over??");
      }
      this.nextPlayer();
    },
    fillScores() {
      console.log("hi");
    },
    toggleConfirmScores() {
      this.$store.dispatch("setConfirmScores");
    },
  },
  async beforeMount() {
    fillScores = () => {
      this.fillScores();
    };

    window.fillScores = fillScores();
  },
};
</script>

<style scoped>
</style>