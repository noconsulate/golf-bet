<template>
  <div id="app">
    <div class="container mx-auto flex md:w-1/2 lg:w-1/3">
      <router-view class="" />
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
