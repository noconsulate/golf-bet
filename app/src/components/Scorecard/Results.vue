<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 grid-rows-12-static gap-2 h-full">
      <div class="col-span-2 row-span-1">
        <div class="flex justify-center items-center h-full">
          <p>Confirm Totals</p>
        </div>
      </div>
      <PlayerCard :playerNum="0" />
      <PlayerCard v-if="results.length > 1" :playerNum="1" />
      <div v-else class="col-span-2 row-span-2"></div>

      <PlayerCard v-if="results.length > 2" :playerNum="2" />
      <div v-else class="col-span-2 row-span-2"></div>
      <PlayerCard v-if="results.length > 3" :playerNum="3" />
      <div v-else class="col-span-2 row-span-2"></div>

      <Controller />
    </div>
  </div>
</template>

<script>
import PlayerCard from "./PlayerCard.vue";
import Controller from "../Controller/Controller-grid.vue";
export default {
  components: { PlayerCard, Controller },
  name: "Results",
  data() {
    return {
      card: "h-full border shadow shadow-lg mx-2",
    };
  },
  computed: {
    results() {
      return this.$store.getters.results;
    },
  },
};
</script>