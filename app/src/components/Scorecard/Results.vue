<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="grid grid-cols-9 gap-1 h-full">
      <div class="col-span-9 row-start-1 row-end-2 border">
        <div
          class="flex justify-center items-center h-full border border-dashed"
        >
          <p class="inline-block">Confirm Totals</p>
        </div>
      </div>
      <div class="col-span-9 border max-h-full bg-pink-300">
        <p class="z-10">Player 1</p>
      </div>
      <div class="col-span-9 border border-black bg-green-400 h-full"></div>
      <div class="border border-black bg-green-400"></div>
      <div class="border border-black bg-green-400"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      card: "h-full border shadow shadow-lg mx-2",
    };
  },
};
</script>