<template>
  <div class="space-y-3 flex items-center flex-col">
    <p>SHARE GAME</p>
    <p class="text-center">{{ link2Share }}</p>
    <button class="btn" @click="copy2Clipboard">Copy to clipboard</button>
    <p>Waiting for Player 2 to join the game</p>
    <button class="btn" @click="back">Back</button>
  </div>
</template>

<script>
import { playersJoinedListener } from "../../utilities/bridges";
export default {
  name: "share",
  data() {
    return {
      // url: "http://localhost:8080",
      url: "https://golf-bets.web.app/",
    };
  },
  computed: {
    gameId() {
      return this.$store.state.gameId;
    },
    link2Share() {
      return `${this.url}/join?game=${this.gameId}`;
    },
  },
  methods: {
    back() {
      this.$store.dispatch("setSequence", "confirmation");
    },
    copy2Clipboard() {
      navigator.clipboard.writeText(this.link2Share);
    },
  },
  async created() {
    playersJoinedListener(this.gameId);
    window.store = this.$store;
  },
};
</script>
