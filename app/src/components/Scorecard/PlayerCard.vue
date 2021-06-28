<template>
  <div class="col-span-2 row-span-2 bg-green-200 grid grid-cols-5 mx-2">
    <div class="col-span-2 flex flex-col justify-center bg-blue-300">
      <p>Player {{ playerNum }}</p>
      <p>Handicap xx</p>
    </div>
    <div
      class="
        col-span-1
        flex flex-col
        justify-center
        items-center
        divide-y divide-black
        bg-yellow-200
      "
    >
      <p>Net</p>
      <p>xx</p>
    </div>
    <div
      class="
        col-span-1
        flex flex-col
        justify-center
        items-center
        divide-y divide-black
        bg-yellow-200
      "
    >
      <p>Gross</p>
      <p>xx</p>
    </div>
    <div
      class="
        col-span-1
        flex flex-col
        justify-center
        items-center
        divide-y divide-black
        bg-yellow-200
      "
    >
      <p>Total</p>
      <p>{{ results[playerNum].netProfit }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCard",
  props: ["playerNum"],
  computed: {
    results() {
      return this.$store.getters.results;
    },
  },
};
</script>