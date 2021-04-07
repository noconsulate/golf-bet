<template>
  <div>
    <GameFull v-if="gameFull" />
    <PlayerJoin v-else />
  </div>
</template>

<script>
import { joinMatch } from "../utilities/bridges";

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
  matchId() {
      return this.$route.query.match;
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
    let matchInfo = await joinMatch(this.matchId);

    this.$store.dispatch("setMatchId", this.matchId);
    this.$store.dispatch("setPlayers", matchInfo.players);
    this.$store.dispatch("setPoints", matchInfo.points);
    this.$store.dispatch("setHoles", matchInfo.holes);
    this.$store.dispatch("setScoringStyle", matchInfo.scoringStyle);
  },
};
</script>
