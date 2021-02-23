<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>Final Score</p>

    <!-- @AUSTIN Both tables use v-for in the <td> elements, referencing "holes" in the script as before. Vue creates individual and unique cells according to the number of holes
      
    You can do a lot to style the tables with Tailwind. We might consider finding a library for our tables because they ugly! -->
    <table>
      <thead>
        <tr>
          <th :colspan="holes">Your Score</th>
        </tr>
      </thead>
      <tbody>
        <!-- @AUSTIN the v-if statement in the following <tr> means to render this only if holes == 9 -->
        <tr v-if="holes == 9">
          <td v-for="index in holes" :key="index">
            {{ myScore[index - 1] }}
          </td>
        </tr>
        <!-- @AUSTIN the following two <tr> mean render only if holes == 18. I've done this just to have two rows when there's 18 holes. The rows in the opponent score table are the same way. -->
        <tr v-if="holes == 18">
          <td v-for="index in 9" :key="index">
            {{ myScore[index - 1] }}
          </td>
        </tr>
        <tr v-if="holes == 18">
          <td v-for="index in 9" :key="index">
            {{ myScore[index + 8] }}
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
        <tr v-if="holes == 9">
          <td v-for="index in holes" :key="index">
            {{ opponentScore[index - 1] }}
          </td>
        </tr>
        <tr v-if="holes == 18">
          <td v-for="index in 9" :key="index">
            {{ opponentScore[index - 1] }}
          </td>
        </tr>
        <tr v-if="holes == 18">
          <td v-for="index in 9" :key="index">
            {{ opponentScore[index + 8] }}
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
