<template>
  <div>
    <GameFull v-if="gameFull" />
    <PlayerJoin v-else />
  </div>
</template>

<script>
import { joinGame } from "../utilities/bridges";

import PlayerJoin from "../components/Game/PlayerJoin";
import GameFull from "../components/Game/GameFull";
import Gameplay from "../components/Game/Gameplay";
import FinalScore from "../components/Game/FinalScore";

export default {
  name: "join",
  components: {
    PlayerJoin,
    GameFull,
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
  data() {
    return {
      gameFull: false,
    };
  },
  async created() {
    let { gameInfo, playersJoined } = await joinGame(this.gameId);
    console.log(gameInfo, playersJoined);

    if (playersJoined.length == Number(gameInfo.players)) {
      this.gameFull = true;
    }

    this.$store.dispatch("setGameId", this.gameId);
    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
    this.$store.dispatch("setScoringStyle", gameInfo.scoringStyle);
  },
};
</script>
