<template>
  <div class="h-screen">
    <div class="grid grid-cols-1 grid-rows-9-static h-full">
      <template v-if="isWinner">
        <div class="row-span-1"></div>
        <div class="row-span-3">
          <div class="flex flex-col justify-center items-center h-full">
            <p>Contrats</p>
            <p>Player {{ player.player_num }}</p>
            <p>{{ player.handle }}</p>
          </div>
        </div>
        <div class="row-span-3">
          <div class="flex flex-col h-full justify-center items-center">
            <p>You won ${{ netProfit }}</p>
            <p>**</p>
            <p v-for="payment in payments" :key="payment.player">
              ${{ payment.payment }} from {{ playerHandle(payment.player) }},
              Player {{ payment.player }}
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="row-span-1"></div>
        <div class="row-span-3">
          <div class="flex flex-col justify-center items-center h-full">
            <p>Bummer</p>
            <p>Player {{ player.player_num }}</p>
            <p>{{ player.handle }}</p>
          </div>
        </div>
        <div class="row-span-3">
          <div class="flex flex-col h-full justify-center items-center">
            <p>You lost ${{ netProfit }}</p>
            <p>**</p>
            <p v-for="payment in payments" :key="payment.player">
              ${{ -1 * payment.payment }} to {{ playerHandle(payment.player) }},
              Player {{ payment.player }}
            </p>
          </div>
        </div>
      </template>
      <div class="row-span-2">
        <div class="flex flex-col justify-center items-center">
          <button v-if="!hasLeft || activeMatch" class="btn" @click="leave">
            Leave Match
          </button>
          <button v-else class="btn" @click="newMatch">New Match</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import App from "../../App.vue";
export default {
  components: { App },
  name: "AfterTotals",
  data() {
    return {
      hasLeft: false,
    };
  },
  computed: {
    player() {
      return this.$store.getters.user;
    },
    results() {
      return this.$store.getters.results;
    },
    isWinner() {
      return this.results[this.player.player_num - 1].winner ? true : false;
    },
    netProfit() {
      return this.results[this.player.player_num - 1].netProfit;
    },
    payments() {
      return this.results[this.player.player_num - 1].payments;
    },
    scores() {
      return this.$store.getters.scores;
    },
    activeMatch() {
      return this.$store.getters.user.active_match;
    },
  },
  methods: {
    playerHandle(player) {
      return this.scores[player - 1].handle;
    },
    leave() {
      this.$store.dispatch("leaveMatch", this.player.id);
      this.hasLeft = true;
    },
    async newMatch() {
      await this.$store.dispatch("initOnLoad");
      this.$store.dispatch("resetInputValues");
      this.$store.dispatch("resetMatchValues");
      this.$store.dispatch("setController", "selectPlayers");
      this.$router.push("/");
    },
  },
};
</script>