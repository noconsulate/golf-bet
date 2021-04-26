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
    <div class="flex justify-center">
      <p v-if="cancelled" class="text-red-500">
        MATCH CANCELLED
      </p>
      <button v-else class="btn w-24" @click="cancelMatch">
        Cancel Match
      </button>
    </div>
  </div>
</template>

<script>
import { playersJoinedListener, cancelMatch } from "../../utilities/bridges/match";
export default {
  name: "share",
  data() {
    return {
      url: this.$hostname,
      cancelled: false
      
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
    async cancelMatch() {
      const {data, error} = await cancelMatch(this.$store.state.user.id)

      if (error) {
        console.error("cancel_match error", error)
      }
      if (data) {
        this.cancelled = true;
      }
    }
  },
  async beforeMount() {
    const subscription = playersJoinedListener();
  },
};
</script>
