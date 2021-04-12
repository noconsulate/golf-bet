<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
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
import { createMatch } from "../../utilities/bridges";
import { newMatch} from "../../utilities/bridges/match"

export default {
  name: "confirmGame",
  computed: {
    matchInfo() {
      return {
        players: this.$store.state.players,
        points: this.$store.state.points,
        holes: this.$store.state.holes,
        scoringStyle: this.$store.state.scoringStyle,
        owner: this.$store.state.user.id
      };
    },
    players() {
      return this.$store.state.players;
    },
    points() {
      return this.$store.state.points;
    },
    holes() {
      return this.$store.state.holes;
    },
    is18Holes() {
      if (this.$store.state.holes == 18) 
      return true
      else
      return false
    },
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
    isClassicScoring() {
      if (this.$store.state.scoringStyle == 'classic')
      return true;
      else
      return false;
    },
    creator() {
      return this.$store.state.user.id;
    }
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

      console.log(this.matchInfo)
      // const matchId = await createMatch(this.matchInfo);
      const {data, error} = await newMatch(
        this.players, this.points, this.is18Holes, this.isClassicScoring, this.creator
      )
      if (error) {
        console.error(error)
        return;
      }
      this.$store.dispatch("setMatchId", data.match_id);
      this.$store.dispatch("setPlayerNum", 1);
      this.$store.dispatch("setController", "waitingForPlayers");
    },
  },
};
</script>
