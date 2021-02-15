<template>
  <div id="app">
    <div
      class="container mx-auto border flex justify-center bg-green-500 md:w-1/2 lg:w-1/3"
    >
      <router-view class="w-3/4 h-screen bg-coolGray-200 pt-8" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "Golf Bets";
  },
};
</script>
