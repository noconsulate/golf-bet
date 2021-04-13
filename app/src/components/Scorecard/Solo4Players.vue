<template>
  
</template>

<script>
import {getScores} from '../../utilities/bridges/match'
export default {
  name: "solo4Players",
  computed: {
    matchId() {
      return this.$store.state.matchId;
    }
  },
  async beforeMount() {
    const {data, error} = await getScores(this.matchId);
    if (error) console.error(error);
    if (data) this.$store.dispatch("initScores", data)
  }
}
</script>