<template>
  <div>hi {{ gameId }}</div>
</template>

<script>
import { getGame } from "../utilities/bridges";

export default {
  name: "join",
  computed: {
    gameId() {
      return this.$route.query.game;
    },
  },
  async created() {
    let { gameInfo } = await getGame(this.gameId);
    console.log(gameInfo);

    this.$store.dispatch("setPlayers", gameInfo.players);
    this.$store.dispatch("setPoints", gameInfo.points);
    this.$store.dispatch("setHoles", gameInfo.holes);
  },
};
</script>
