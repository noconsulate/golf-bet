<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 grid-rows-9-static gap-2 h-full bg-pink-200">
      <div class="col-span-2 row-span-1 bg-red-800">
        <div class="flex justify-center items-center h-full bg-pink-700">
          <p>Confirm Totals</p>
        </div>
      </div>
      <div class="col-span-2 row-span-2 bg-green-200 grid grid-cols-5 mx-2">
        <div class="col-span-2 flex flex-col justify-center bg-blue-300">
          <p>Player 1</p>
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
          <p>xx</p>
        </div>
      </div>
      <div class="col-span-2 row-span-2 bg-green-200"></div>
      <div class="col-span-2 row-span-2 bg-green-200"></div>
      <div class="col-span-2 row-span-2 bg-green-200"></div>
    </div>
  </div>
</template>

<script>
import App from "../../App.vue";
export default {
  components: { App },
  name: "Results",
  data() {
    return {
      card: "h-full border shadow shadow-lg mx-2",
    };
  },
};
</script>