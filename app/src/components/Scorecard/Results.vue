<template>
  <div class="h-screen w-screen flex flex-col bg-blue-200">
    <div class="grid grid-cols-7 grid-rows-9 pt-8 p-2 h-full">
      <div class="col-span-2 bg-red-200">**</div>
      <div class="col-span-3 justify-self-center bg-red-400">
        <p class="">Confirm Totals</p>
      </div>
      <div class="col-span-2 bg-red-200" />
      <div :class="card">player 1 bla bla bla</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      card: " row-span-2 col-span-full place-self-stretch bg-green-100",
    };
  },
};
</script>