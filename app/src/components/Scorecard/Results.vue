<template>
  <div class="h-screen w-screen">
    <div class="grid grid-cols-2 grid-rows-9-static gap-2 h-full bg-pink-200">
      <div class="col-span-2 row-span-1 bg-red-800">
        <div class="flex justify-center items-center h-full bg-pink-700">
          <p>Confirm Totals</p>
        </div>
      </div>
      <div class="col-span-2 row-span-2 bg-green-200"></div>
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