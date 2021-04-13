<template>
  <div class="flex flex-col">
    <div class="controller-title">Join Game</div>

    <div class="controller-panel">
      <div class="controller-prev invisible">
        prev
      </div>
      <div
        class="flex flex-grow cursor-pointer justify-center items-center text-4xl"
        @click="join"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready invisible">next</div>
    </div>
  </div>
</template>

<script>
import {confirmJoin} from "../../utilities/bridges/match"

export default {
  name: "confirmGame",
  computed: {
    gameInfo() {
      return {
        players: this.$store.state.players,
        points: this.$store.state.points,
        holes: this.$store.state.holes,
        scoringStyle: this.$store.state.scoringStyle,
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
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
    matchId() {
      return this.$store.state.matchId;
    },
    uuid() {
      console.log(this.$store.state.user.id)

      return this.$store.state.user.id;
    }
  },
  methods: {
    async join() {
      const joinGame = await confirmJoin(this.matchId, this.uuid)

      // let joinGame = await playerConfirm(this.matchId);

      // if (joinGame == 'doListen') {
      //   console.log("joinGame success");
      //   this.$store.dispatch("setController", "waitingForPlayers");
      // } else if (joinGame == 'doNotListen') {
      //   console.log("joingame success, going to /scorecard")
      //   this.$store.dispatch("setAllPlayersJoined"); 
      // } else {
      //   this.$store.dispatch("setError", "joinError");
      //   console.log("joinGame fail");
      // }
    },
  },
};
</script>
