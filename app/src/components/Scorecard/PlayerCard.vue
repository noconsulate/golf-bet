<template>
  <div class="col-span-2 row-span-2 grid grid-cols-5 mx-2">
    <div class="col-span-2 flex flex-col justify-center">
      <p>Player {{ playerNum + 1 }}</p>
      <p>{{ results[playerNum].handle }}</p>
      <p>Handicap xx</p>
    </div>
    <div
      class="
        col-span-1
        flex flex-col
        justify-center
        items-center
        divide-y divide-black
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