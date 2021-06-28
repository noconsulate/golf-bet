<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 grid-rows-12-static gap-2 h-full">
      <div class="col-span-2 row-span-1">
        <div class="flex justify-center items-center h-full">
          <p>Confirm Totals</p>
        </div>
      </div>
      <PlayerCard :playerNum="0" />
      <PlayerCard :playerNum="1" />
      <PlayerCard :playerNum="2" />
      <PlayerCard :playerNum="3" />
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