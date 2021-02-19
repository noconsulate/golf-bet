<template>
  <div class>
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
      </div>
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
      return Number(this.$store.state.holes);
    },
  },
  methods: {},
};
</script>
