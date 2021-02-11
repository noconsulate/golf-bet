<template>
  <div class="space-y-3">
    <p>{{ bannerMessage }}</p>
    <div>{{ subBannerMessage }} {{ pointsWon }} points</div>
    <div>from everyone else</div>
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
      this.bannerMessage = "Contrats";
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
