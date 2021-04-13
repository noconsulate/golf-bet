<template>
  <div>
    <GameFull v-if="gameFull" />
    <PlayerJoin v-else />
  </div>
</template>

<script>
import { getMatch } from "../utilities/bridges/match";

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
    // let matchInfo = await joinMatch(this.matchId);
    const {data, error} = await getMatch(this.matchId);
    const {players, points, is_18_holes, is_classic_scoring} = data[0]
    
    this.$store.dispatch("setMatchId", this.matchId);
    this.$store.dispatch("setPlayers", players);
    this.$store.dispatch("setPoints", points);
    this.$store.dispatch("setHoles", (is_18_holes ? 18 : 9));
    this.$store.dispatch("setScoringStyle", (is_classic_scoring ? 'classic' : 'solo'));
  },
};
</script>
