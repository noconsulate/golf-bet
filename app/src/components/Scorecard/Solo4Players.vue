<template>
  <div class="w-full h-screen flex flex-col">

    <div class="flex-grow min-w-full overflow-auto">
      <div class="grid grid-cols-8" >
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
            <div :class="cell" :key="index">
              {{index}}
            </div>
            <div :class="cell" :key="index * Math.random()">
              H
            </div>
            <div :class="cell" :key="index * Math.random()">
              T
            </div>
            <div :class="cell" :key="index * Math.random">
              P
            </div>
            <div :class="cell" :key="scores[0][index]">
              S
            </div>
            <div :class="cell" :key="scores[0][index]">
              S
            </div>
            <div :class="cell" :key="scores[0][index]">
              S
            </div>
            <div :class="cell" :key="scores[0][index]">
              S
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
  }
}
</script>

<style scoped>

</style>