<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>Welcome Player {{ playerNum }}</p>
    <p>This game has</p>
    <p>{{ players }} players</p>
    <p>for {{ points }} points</p>
    <p>playing {{ holes }} holes</p>
    <button v-if="!waiting" @click="confirm" class="btn">Join Game</button>
    <p v-if="waiting">Waiting for the other players to join...</p>
  </div>
</template>

<script>
import { playerConfirm, playersJoinedListener } from "../../utilities/bridges";
export default {
  name: "playerJoin",
  data() {
    return {
      waiting: false,
    };
  },
  computed: {
    playerNum() {
      return this.$store.state.playerNum;
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
    gameId() {
      return this.$store.state.gameId;
    },
  },
  methods: {
    async confirm() {
      playersJoinedListener(this.gameId);

      let joinGame = await playerConfirm(this.gameId);

      if (joinGame == "success") {
        console.log("you joined the game");
        this.waiting = true;
      } else {
        console.log("something went wrong with joining games");
      }
    },
  },
};
</script>
