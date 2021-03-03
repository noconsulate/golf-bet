<template>
  <div class="bg-green-500 w-full flex justify-center pt-8 h-screen">
    <PlayerJoin v-if="sequence == 'playerJoin'" />
  </div>
</template>

<script>
import { joinGame } from "../utilities/bridges";

import PlayerJoin from "../components/Game/PlayerJoin";
import Gameplay from "../components/Game/Gameplay";
import FinalScore from "../components/Game/FinalScore";

export default {
  name: "join",
  components: {
    PlayerJoin,
    Gameplay,
    FinalScore,
  },
  computed: {
    gameId() {
      return this.$route.query.game;
    },
    sequence() {
      return this.$store.state.sequence;
    },
  },
  async created() {
    let { gameInfo } = await joinGame(this.gameId);
    console.log(gameInfo);

    this.$store.dispatch("setGameId", this.gameId);
    this.$store.dispatch("setPlayerNum", "2");
    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
    this.$store.dispatch("setSequence", "playerJoin");
  },
};
</script>
