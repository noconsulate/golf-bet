<template>
  <div class="space-y-4 flex flex-col py-2">
    <p class="text-center text-2xl">SHARE GAME</p>
    <p class="text-center">{{ link2Share }}</p>
    <div class="flex justify-center">
      <button class="btn w-24" @click="copy2Clipboard">
        Copy to clipboard
      </button>
    </div>
    <p class="text-center text-xl">
      Waiting for {{ waitingForPlayers }} to join.
    </p>
  </div>
</template>

<script>
import { playersJoinedListener } from "../../utilities/bridges/match";
export default {
  name: "share",
  data() {
    return {
      url: "http://localhost:8080",
      // url: "https://golf-bets.web.app/",
    };
  },
  computed: {
    matchId() {
      return this.$store.state.matchId;
    },
    link2Share() {
      return `${this.url}/join?match=${this.matchId}`;
    },

    waitingForPlayers() {
      return (
        this.$store.state.players -
        this.$store.state.playersJoined.length +
        " players"
      );
    },
  },
  methods: {
    copy2Clipboard() {
      navigator.clipboard.writeText(this.link2Share);
    },
  },
  async beforeMount() {
    playersJoinedListener(this.matchId);
  },
};
</script>
