<template>
  <div class="space-y-3">
    <p>Final Score</p>

    <table>
      <thead>
        <tr>
          <th :colspan="holes">Your Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="index in holes" :key="index">
            {{ myScore[index - 1] }}
          </td>
        </tr>
      </tbody>
    </table>
    <table>
      <thead>
        <tr>
          <th :colspan="holes">Opponent Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="index in holes" :key="index">
            {{ opponentScore[index - 1] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "finalScore",
  computed: {
    holes() {
      return Number(this.$store.state.holes);
    },
    myScore() {
      return this.$store.state.myScore;
    },
    opponentScore() {
      return this.$store.state.opponentScore;
    },
  },
};
</script>
