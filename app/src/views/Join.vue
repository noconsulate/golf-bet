<template>
  <div>
    <PlayerJoin v-if="sequence == 'playerJoin'" />
    <Gameplay v-if="sequence == 'gameplay'" />
  </div>
</template>

<script>
import { getGame } from "../utilities/bridges";

import PlayerJoin from "../components/Game/PlayerJoin";
import Gameplay from "../components/Game/Gameplay";

export default {
  name: "join",
  components: {
    PlayerJoin,
    Gameplay,
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
    let { gameInfo } = await getGame(this.gameId);
    console.log(gameInfo);

    this.$store.dispatch("setPlayerNum", "2");
    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
    this.$store.dispatch("setSequence", "playerJoin");
  },
};
</script>
