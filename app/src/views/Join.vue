<template>
  <div>
    <PlayerJoin />
  </div>
</template>

<script>
import { getGame } from "../utilities/bridges";

import PlayerJoin from "../components/Game/PlayerJoin";

export default {
  name: "join",
  components: {
    PlayerJoin,
  },
  computed: {
    gameId() {
      return this.$route.query.game;
    },
  },
  async created() {
    let { gameInfo } = await getGame(this.gameId);
    console.log(gameInfo);

    this.$store.dispatch("setPlayerNum", "2");
    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
  },
};
</script>
