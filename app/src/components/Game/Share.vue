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
      <button v-if="status == 'waiting'" class="btn w-24" @click="cancelMatch">
        Cancel Match
      </button>
    </div>
  </div>
</template>

<script>
import {
  matchListener,
  cancelMatch,
  unsubscribeListener,
} from "../../utilities/bridges/match";
export default {
  name: "share",
  data() {
    return {
      url: this.$hostname,
      cancelled: false,
      subscription: {},
    };
  },
  computed: {
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
      if (data.success == false) {
        console.error("cancel error");
      }
      if (data.success == true) {
        console.log("successful cancel");
        unsubscribeListener(this.subscription);
        // this.$store.dispatch("resetMatchValues");

        // if not creator, reset view
        if (this.$store.state.playerNum > 1) {
          this.$store.dispatch("setController", "joinGame");
        }
      }
    },
    async newMatch() {
      this.$store.dispatch("resetInputValues");
      this.$store.dispatch("resetMatchValues");
    },
  },
  async beforeMount() {},
};
</script>
