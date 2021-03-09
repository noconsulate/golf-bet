<template>
  <div class="space-y-4 flex flex-col py-2">
    <p class="text-center text-2xl">SHARE GAME</p>
    <p class="text-center">{{ link2Share }}</p>
    <div class="flex justify-center">
      <button class="btn w-24" @click="copy2Clipboard">
        Copy to clipboard
      </button>
    </div>
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
    copy2Clipboard() {
      navigator.clipboard.writeText(this.link2Share);
    },
  },
  async created() {
    playersJoinedListener(this.gameId);
  },
};
</script>
