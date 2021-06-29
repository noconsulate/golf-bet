<template>
  <div class="h-screen">
    <div v-if="isWinner" class="grid grid-cols-1 grid-rows-9-static h-full">
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
    </div>
    <div v-else class="grid grid-cols-1 grid-rows-9-static h-full">
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
    </div>
  </div>
</template>

<script>
import App from "../../App.vue";
export default {
  components: { App },
  name: "AfterTotals",
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
  },
  methods: {
    playerHandle(player) {
      return this.scores[player - 1].handle;
    },
  },
};
</script>