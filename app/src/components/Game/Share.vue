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
        Waiting for {{ PlayersLeftToJoin }} to join.
      </p>
    </div>
    <div class="flex justify-center">
      <div v-if="status == 'cancelled'" class="flex flex-col">
        <p class="text-red-500">MATCH CANCELLED</p>
        <button class="btn w-24 self-center mt-4" @click="newMatch">
          New Match
        </button>
      </div>
      <button
        v-if="status == 'waiting' && isCreator"
        class="btn w-24"
        @click="cancelMatch"
      >
        Cancel Match
      </button>
      <button
        v-if="status == 'waiting' && !isCreator"
        class="btn w-24"
        @click="cancelMatch"
      >
        Leave Match
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
      // url: this.$hostname,
      cancelled: false,
      subscription: {},
    };
  },
  computed: {
    isCreator() {
      return this.$store.getters.user.id == this.$store.state.match.creator;
    },
    url() {
      return process.env.VUE_APP_HOSTNAME;
    },
    matchId() {
      return this.$store.state.match.id;
    },
    link2Share() {
      return `${this.url}/join?match=${this.matchId}`;
    },

    PlayersLeftToJoin() {
      const playersLeft =
        this.$store.state.match.players -
        this.$store.state.match.players_joined;
      const appendage = playersLeft > 1 ? "players" : "player";

      return String(playersLeft + " " + appendage);
    },
    status() {
      return this.$store.state.match.status;
    },
  },
  methods: {
    copy2Clipboard() {
      navigator.clipboard.writeText(this.link2Share);
    },
    async cancelMatch() {
      const { data, error } = await cancelMatch(this.$store.state.user.id);
      console.log(data);
      if (!data.success || error) {
        console.error("cancel error");
      }
    },
    async newMatch() {
      this.$store.dispatch("resetInputValues");
      this.$store.dispatch("resetMatchValues");
    },
  },
  async created() {
    this.$store.dispatch("setController", "waitingForPlayers");
  },
};
</script>
