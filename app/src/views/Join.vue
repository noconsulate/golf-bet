<template>
  <div>
    <PlayerJoin />
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
    let { gameInfo, playersJoined } = await joinGame(this.gameId);
    console.log(gameInfo, playersJoined);

    this.$store.dispatch("setGameId", this.gameId);
    this.$store.dispatch(
      "setPlayerNum",
      playersJoined[playersJoined.length - 1] + 1
    );
    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
    this.$store.dispatch("setScoringStyle", gameInfo.scoringStyle);
  },
};
</script>
