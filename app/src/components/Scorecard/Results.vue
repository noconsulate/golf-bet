<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 grid-rows-11-static gap-2 h-full bg-pink-200">
      <div class="col-span-2 row-span-1 bg-red-800">
        <div class="flex justify-center items-center h-full bg-pink-700">
          <p>Confirm Totals</p>
        </div>
      </div>
      <PlayerCard :playerNum="0" />
      <PlayerCard :playerNum="1" />
      <PlayerCard :playerNum="2" />
      <PlayerCard :playerNum="3" />
    </div>
  </div>
</template>

<script>
import PlayerCard from "./PlayerCard.vue";
export default {
  components: { PlayerCard },
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