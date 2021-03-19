<template>
  <div class="w-full h-screen flex flex-col \">
    <div class="flex-grow min-w-full overflow-auto \">
      <div class="grid grid-cols-8 \">
        <div :class="cell" class="col-span-4">Handicap</div>
        <div :class="[scoringFor.includes(1) ? activeCol : cell]"></div>
        <div :class="[scoringFor.includes(2) ? activeCol : cell]"></div>
        <div :class="[scoringFor.includes(3) ? activeCol : cell]"></div>
        <div :class="[scoringFor.includes(4) ? activeCol : cell]"></div>

        <div :class="cell">Hole</div>
        <div :class="cell">Tee</div>
        <div :class="cell">Par</div>
        <div :class="cell">HR</div>
        <div :class="[scoringFor.includes(1) ? activeCol : cell]">P1</div>
        <div :class="[scoringFor.includes(2) ? activeCol : cell]">P2</div>
        <div :class="[scoringFor.includes(3) ? activeCol : cell]">P3</div>
        <div :class="[scoringFor.includes(4) ? activeCol : cell]">P4</div>

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
              scoringFor.includes(1) ? activeCol : null,
            ]"
          >
            {{ scoresObj[index][1] }}
          </div>
          <div
            :class="[
              index == activeHole ? activeRow : cell,
              index == activeHole && activePlayer == 2 ? activeCell : cell,
              scoringFor.includes(2) ? activeCol : null,
            ]"
          >
            {{ scoresObj[index][2] }}
          </div>
          <div
            :class="[
              index == activeHole ? activeRow : cell,
              index == activeHole && activePlayer == 3 ? activeCell : cell,
              scoringFor.includes(3) ? activeCol : null,
            ]"
          >
            {{ scoresObj[index][3] }}
          </div>
          <div
            :class="[
              index == activeHole ? activeRow : cell,
              index == activeHole && activePlayer == 4 ? activeCell : cell,
              scoringFor.includes(4) ? activeCol : null,
            ]"
          >
            {{ scoresObj[index][4] }}
          </div>
        </template>
        <div :class="cell">Total</div>
        <div :class="cell">{{ courseData.teesTotal() }}</div>
        <div :class="cell">{{ courseData.parsTotal() }}</div>
        <div :class="cell">{{ courseData.ratingsTotal() }}</div>
        <div :class="[scoringFor.includes(1) ? activeCol : cell]">
          {{ totalScores.player1() }}
        </div>
        <div :class="[scoringFor.includes(2) ? activeCol : cell]">
          {{ totalScores.player2() }}
        </div>
        <div :class="[scoringFor.includes(3) ? activeCol : cell]">
          {{ totalScores.player3() }}
        </div>
        <div :class="[scoringFor.includes(4) ? activeCol : cell]">
          {{ totalScores.player4() }}
        </div>
      </div>
    </div>
    <div class="flex flex-col border space-y-2 object-none object-bottom">
      <div class="flex justify-center space-x-1">
        <button @click="prevHole" class="btn">previous hole</button>
        <button @click="enterScore" class="btn">enter score</button>
        <button @click="nextHole" class="btn">next hole</button>
      </div>
      <div class="flex justify-center">Hole {{ activeHole }}</div>
      <div class="flex justify-center">Player {{ activePlayer }}</div>
      <div class="flex justify-center space-x-1">
        <button @click="prevPlayer" class="btn">prev. player</button>
        <input ref="score" type="number" class="border w-12" v-model="score" />
        <button @click="nextPlayer" class="btn">next player</button>
      </div>
    </div>
  </div>
</template>

<script>
import { blankScoresGen, blankScoresObj } from "../../utilities/functions.js";
import { submitScores } from "../../utilities/bridges";

export default {
  name: "players4",

  data() {
    return {
      // classes
      cell: "border",
      activeRow: "border bg-gray-100",
      activeCell: "border bg-blue-100",
      activeCol: "border bg-gray-400",

      activeHole: 1,
      activePlayer: null,
      score: null,
      scores: [],
      scoresObj: {},
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
    gameId() {
      return this.$store.state.gameId;
    },
    scoringFor() {
      const thisPlayer = this.$store.state.playerNum;
      switch (thisPlayer) {
        case 1:
          return [1, 2];
        case 2:
          return [2, 3];
        case 3:
          return [3, 4];
        case 4:
          return [4, 1];
      }
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
        teesTotal: function() {
          let total = 0;
          this.tees.map((tee) => (total += tee));
          return total;
        },
        pars: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        parsTotal: function() {
          let total = 0;
          this.pars.map((par) => (total += par));
          return total;
        },
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
        ratingsTotal: function() {
          let total = 0;
          this.ratings.map((rating) => (total += rating));
          return total;
        },
      };
    },
    totalScores() {
      return {
        scores: this.scores,
        player1: function() {
          let total = 0;
          this.scores.map((hole) => {
            total += Number(hole[0]);
          });
          return total;
        },
        player2: function() {
          let total = 0;
          this.scores.map((hole) => {
            total += Number(hole[1]);
          });
          return total;
        },
        player3: function() {
          let total = 0;
          this.scores.map((hole) => {
            total += Number(hole[2]);
          });
          return total;
        },
        player4: function() {
          let total = 0;
          this.scores.map((hole) => {
            total += Number(hole[3]);
          });
          return total;
        },
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
    async enterScore() {
      const scores = this.scoresObj[this.activeHole];

      // if local scores are null, don't do anything
      if (
        scores[this.scoringFor[0]] == null &&
        scores[this.scoringFor[1]] == null
      ) {
        console.log("nothing to submit");
        return;
      }

      const result = await submitScores(this.gameId, this.activeHole, scores);
      console.log(result);
    },
    prevPlayer() {
      const thisPlayer = this.scoringFor[0];
      const otherPlayer = this.scoringFor[1];

      this.scoresObj[this.activeHole][this.activePlayer] = this.score;

      if (this.activePlayer == thisPlayer && this.activeHole == 1) {
        this.activePlayer = otherPlayer;
        this.activeHole = this.holes;
        this.$refs.score.focus();
        return;
      }

      if (this.activePlayer == otherPlayer) {
        this.activePlayer = thisPlayer;
        this.$refs.score.focus();
      } else {
        this.activePlayer = otherPlayer;
        this.activeHole--;
        this.$refs.score.focus();
      }
    },
    nextPlayer() {
      const thisPlayer = this.scoringFor[0];
      const otherPlayer = this.scoringFor[1];

      this.scoresObj[this.activeHole][this.activePlayer] = this.score;

      if (this.activePlayer == otherPlayer && this.activeHole == this.holes) {
        this.activePlayer = thisPlayer;
        this.activeHole = 1;
        this.$refs.score.focus();
        return;
      }

      if (this.activePlayer == thisPlayer) {
        this.activePlayer = otherPlayer;
        this.$refs.score.focus();
      } else {
        this.activePlayer = thisPlayer;
        this.activeHole++;
        this.$refs.score.focus();
      }
    },
  },
  watch: {
    activePlayer: function(neww, old) {
      this.score = this.scoresObj[this.activeHole][this.activePlayer];
    },
    activeHole: function(neww, old) {
      this.score = this.scoresObj[this.activeHole][this.activePlayer];
    },
  },
  created() {
    this.activePlayer = this.scoringFor[0];

    this.scoresObj = blankScoresObj(this.players, Number(this.holes));

    this.scoresObj[1][2] = 3;
    this.scoresObj[1][3] = 4;
  },
};
</script>
