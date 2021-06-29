<template>
  <div class="h-screen">
    <div
      v-if="isWinner"
      class="grid grid-cols-1 grid-rows-9-static h-full bg-pink-200"
    >
      <div class="row-span-1 bg-blue-200"></div>
      <div class="row-span-3 bg-green-300">
        <div class="flex flex-col justify-center items-center h-full">
          <p>Contrats</p>
          <p>Player {{ player.player_num }}</p>
          <p>{{ player.handle }}</p>
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
  },
};
</script>