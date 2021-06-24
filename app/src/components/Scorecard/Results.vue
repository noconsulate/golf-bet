<template>
  <div class="h-screen w-screen flex flex-col bg-blue-200">
    <div class="grid grid-cols-7 grid-rows-9 gap-1 pt-8 p-2 h-full">
      <div
        class="col-span-2 place-self-start bg-red-200 border-2 border-black-200"
      >
        **
      </div>
      <div class="col-span-3 justify-self-center place-self-start bg-red-400">
        <p class="">Confirm Totals</p>
      </div>
      <div class="col-span-2 place-self-start bg-red-200" />
      <div :class="card">
        <grid class="grid-cols-9 grid-rows-3">
          <div class="col-span-3">Player 1</div>
        </grid>
      </div>
      <div :class="card">player 1 bla bla bla</div>
      <div :class="card">player 1 bla bla bla</div>
      <div :class="card">player 1 bla bla bla</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Results",
  data() {
    return {
      card: " row-span-6 col-span-full place-self-stretch bg-green-100 border shadow shadow-lg",
    };
  },
};
</script>