<template>
  <div class="w-full h-screen flex flex-col">
    <div class="flex-grow min-w-full overflow-auto">
      <div class="grid grid-cols-8" v-if="loaded" >
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

        <template v-for="index in holes" >
            <div 
            :class="[index == activeHole ? activeRow : cell]"
            @click="selectRow(index)"
            :key="String(index) + '0'"
            >
              {{index}}
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell]"
            :key="String(index) + '1'"
            >
              H
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell]"
            :key="String(index) + '2'"
            >
              T
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell]"
            :key="String(index) + '3'"
            >
              P
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 1 ? activeCell : cell]"
            :key="String(index) + '4'"
            >
              {{scores[0][index]}}
            </div>
            <div
            :class="[index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 2 ? activeCell : cell]"
            :key="String(index) + '5'"
            >
              {{scores[1][index]}}
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 3 ? activeCell : cell]"
            :key="String(index) + '6'"
            >
              {{scores[2][index]}}
            </div>
            <div 
            :class="[index == activeHole ? activeRow : cell,
            index == activeHole && activePlayer == 4 ? activeCell : cell]"
            :key="String(index) + '7'"
            >
              {{scores[3][index]}}
            </div>
        </template>
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
        <input ref="score" type="number" class="border w-12" v-model="scoreInput" />
        <button @click="nextPlayer" class="btn">next player</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getScores} from '../../utilities/bridges/match'
export default {
  name: "solo4Players",
  data() {
    return {
      // styles
      cell: "border",
      activeRow: "border bg-gray-100",
      activeCell: "border bg-blue-100",
      // other
      activeHole: 1,
      activePlayer: 1,
      key: 1,
      loaded: false,
      scoreInput: null,
    }
  },
  computed: {
    matchId() {
      return this.$store.state.matchId;
    },
    scores() {
      return this.$store.state.scores;
    },
    holes() {
      return Number(this.$store.state.holes);
    },
    players() {
      return this.$store.state.players;
    }
    // useKey() {
    //   console.log(this.key)
    //   this.key = this.key + 1;
    //   console.log(this.key)
    //   return this.key
    // }
  },
  methods: {
    selectRow(hole) {
      this.activeHole = hole
    },
    prevHole() {
      console.log('prev')
    },
    nextHole() {
      console.log('hello');
    },
    prevPlayer() {
      console.log('sfd')
    },
    nextPlayer() {
      if (this.activePlayer < this.players) {
        this.activePlayer++
      } else {
        if (this.activeHole < this.holes) {
          this.activePlayer = 1;
          this.activeHole++;
        }
      }
    },
    enterScore() {
      console.log('enter')
    }
  },
  async beforeMount() {
    const {data, error} = await getScores(this.matchId);
    if (error) console.error(error);
    if (data) this.$store.dispatch("initScores", data)
    this.loaded = true;

    window.scores = data;
  }
}
</script>

<style scoped>

</style>