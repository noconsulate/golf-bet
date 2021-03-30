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
import { playersJoinedListener } from "../../utilities/bridges";
export default {
  name: "share",
  data() {
    return {
      url: "http://localhost:8080",
      // url: "https://golf-bets.web.app/",
    };
  },
  computed: {
    gameId() {
      return this.$store.state.gameId;
    },
    link2Share() {
      return `${this.url}/join?game=${this.gameId}`;
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
  async created() {
    console.log('before listener in Share')
    playersJoinedListener(this.gameId);
  },
};
</script>
