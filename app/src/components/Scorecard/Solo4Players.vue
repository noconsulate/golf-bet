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
            <div :class="cell" :key="String(index) + '0'">
              {{index}}
            </div>
            <div :class="cell" :key="String(index) + '1'">
              H
            </div>
            <div :class="cell" :key="String(index) + '2'">
              T
            </div>
            <div :class="cell" :key="String(index) + '3'">
              P
            </div>
            <div :class="cell" :key="String(index) + '4'">
              {{scores[0][index]}}
            </div>
            <div :class="cell" :key="String(index) + '5'">
              {{scores[1][index]}}
            </div>
            <div :class="cell" :key="String(index) + '6'">
              {{scores[2][index]}}
            </div>
            <div :class="cell" :key="String(index) + '7'">
              {{scores[3][index]}}
            </div>
        </template>
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
      // other
      activeHole: 1,
      key: 1,
      loaded: false,
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
    // useKey() {
    //   console.log(this.key)
    //   this.key = this.key + 1;
    //   console.log(this.key)
    //   return this.key
    // }
  },
  methods: {

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