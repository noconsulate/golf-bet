<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @click="prev">prev</div>
      <div
        class="flex flex-grow cursor-pointer justify-center items-center text-4xl"
        @click="confirm"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready" @click="confirm">next</div>
    </div>
  </div>
</template>

<script>
import { newMatch, getMatch } from "../../utilities/bridges/match";

export default {
  name: "confirmGame",
  computed: {
    matchInfo() {
      return {
        players: this.$store.state.match.players,
        points: this.$store.state.match.points,
        holes: this.$store.state.match.holes,
        scoringStyle: this.$store.state.match.scoringStyle,
        owner: this.$store.state.user.id,
      };
    },
    players() {
      return this.$store.state.match.players;
    },
    points() {
      return this.$store.state.match.points;
    },
    holes() {
      return this.$store.state.match.holes;
    },
    is18Holes() {
      if (this.$store.state.match.holes == 18) return true;
      else return false;
    },
    scoringStyle() {
      return this.$store.state.match.scoringStyle;
    },
    isClassicScoring() {
      if (this.$store.state.match.scoringStyle == "classic") return true;
      else return false;
    },
    creator() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectHoles");
    },
    async confirm() {
      if (
        this.players == "" ||
        this.holes == "" ||
        this.points == "" ||
        this.scoringStyle == ""
      ) {
        alert("finish setting up game, loser");
        return;
      }

      console.log(this.matchInfo);
      const { data, error } = await newMatch(
        this.players,
        this.points,
        this.is18Holes,
        this.isClassicScoring,
        this.creator
      );
      if (error) {
        console.error(error);
        return;
      } else {
        const match = await getMatch(data.match_id);
        // console.log(match);

        // this.$store.dispatch("setPlayerNum", 1);
        // this.$store.dispatch("setMatchStatus", "waiting");
        // this.$store.dispatch("setMatchId", data.match_id);
        // this.$store.dispatch("setController", "waitingForPlayers");
        // this.$router.push(`/join?match=${data.match_id}`)
      }
    },
  },
};
</script>
