<template>
  <div class="space-y-3">
    <div class="flex justify-center">
      <p>{{ bannerMessage }}</p>
    </div>
    <div class="flex justify-center">
      <div>{{ subBannerMessage }} {{ pointsWon }} points</div>
    </div>
    <div class="flex justify-center">
      <div>from everyone else</div>
    </div>
    <div class="flex justify-center">
      <button @click="restart" class="btn">Start over</button>
    </div>
    <div class="flex justify-center">
      <button @click="transferTokens" class="btn">Transfer Tokens</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerMessage: "",
      subBannerMessage: "",
      pointsWon: "",
    };
  },
  computed: {},
  methods: {
    restart() {
      this.$store.dispatch("setSequence", "splash");
      this.$store.dispatch("resetValues");
    },
    transferTokens() {
      window.open("https://forelinx.com/dashboard/settings/billing");
    },
  },
  created() {
    // here goes a really naive way to find the winner

    const scores = this.$store.state.scores;

    const userScore = scores[0];
    const opponentScores = scores.slice(1);

    let scoresComplex = [
      {
        player: "user",
        score: userScore,
      },
    ];

    console.log(scoresComplex);

    opponentScores.map((item, index) => {
      console.log(item, index);
      scoresComplex.push({
        player: "opponent" + (Number(index) + Number(1)),
        score: item,
      });
    });

    const sortedScores = scoresComplex.sort((a, b) => a.score - b.score);

    console.log(sortedScores);

    if (scoresComplex[0].player == "user") {
      this.bannerMessage = "CONGRATS!";
      this.subBannerMessage = "You won";
    } else {
      this.bannerMessage = "Sorry";
      this.subBannerMessage = `O${scoresComplex[0].player.slice(
        1,
        8
      )} ${scoresComplex[0].player.slice(8)} won`;
    }

    this.pointsWon = this.$store.state.points * this.$store.state.players;
  },
};
</script>
