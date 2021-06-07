<template>
  <div class="flex flex-col">
    <div class="controller-title">Join Game</div>

    <div class="controller-panel">
      <div class="controller-prev invisible">prev</div>
      <div
        class="
          flex flex-grow
          cursor-pointer
          justify-center
          items-center
          text-4xl
        "
        @click="join"
      >
        LET'S GO!!
      </div>
      <div class="controller-next-ready invisible">next</div>
    </div>
  </div>
</template>

<script>
import { confirmJoin, matchListener } from "../../utilities/bridges/match";

export default {
  name: "joinGame",
  computed: {
    gameInfo() {
      return {
        players: this.$store.state.match.players,
        points: this.$store.state.match.points,
        holes: this.$store.state.match.holes,
        scoringStyle: this.$store.state.match.scoringStyle,
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
    scoringStyle() {
      return this.$store.state.match.scoringStyle;
    },
    matchId() {
      return this.$store.state.match.id;
    },
    uuid() {
      console.log(this.$store.state.user.id);

      return this.$store.state.user.id;
    },
  },
  methods: {
    async join() {
      const { data, error } = await confirmJoin(this.matchId, this.uuid);
      if (error) {
        console.error("confirmJoin error", error);
      }

      // game is full according to database
      if (
        data.score_id == "00000000-0000-0000-0000-000000000000" &&
        data.players_joined_out == 9
      ) {
        console.error("GAME FULL");
        return;
      } else if (
        data.score_id == "00000000-0000-0000-0000-000000000000" &&
        data.players_joined_out == 8
      ) {
        console.log("GAME CANCELLED");
        this.$store.dispatch("setMatchStatus", "cancelled");
        this.$store.dispatch("setController", "waitingForPlayers");
        return;
      }

      // game was cancelled by creator according to DB
      else {
        console.log("game confirmed");
        this.$store.dispatch("setController", "waitingForPlayers");
        this.$store.dispatch("setPlayerNum", data.players_joined_out);
        this.$store.dispatch("setPlayersJoined", data.players_joined_out);
        this.$store.dispatch("setActiveMatch", this.matchId);
        // matchListener();
      }
    },
  },
};
</script>
