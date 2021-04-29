<template>
  <div class="space-y-4 flex flex-col py-2">
    <div v-if="status == 'waiting'" class="space-y-3">
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
    <div class="flex justify-center">
      <p v-if="status == 'cancelled'" class="text-red-500">MATCH CANCELLED</p>
      <button v-if="status == 'waiting'" class="btn w-24" @click="cancelMatch">
        Cancel Match
      </button>
    </div>
  </div>
</template>

<script>
import { matchListener, cancelMatch } from "../../utilities/bridges/match";
export default {
  name: "share",
  data() {
    return {
      url: this.$hostname,
      cancelled: false,
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
    status() {
      return this.$store.state.matchStatus;
    },
  },
  methods: {
    copy2Clipboard() {
      navigator.clipboard.writeText(this.link2Share);
    },
    async cancelMatch() {
      const { data, error } = await cancelMatch(this.$store.state.user.id);

      if (error) {
        console.error("cancel_match error", error);
      }
    },
  },
  async beforeMount() {
    const subscription = matchListener();
  },
};
</script>
