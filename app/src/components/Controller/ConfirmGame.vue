<template>
  <div class="flex flex-col">
    <div class="controller-title">Confirm Game</div>

    <div class="controller-panel">
      <div class="controller-prev" @mext="prev">
        prev
      </div>
      <div
        class="flex flex-grow bg-yellow-400 cursor-pointer justify-center items-center text-4xl"
      >
        LET'S GO!!
      </div>
      <div class="controller-next" @click="next">next</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirmGame",
};
</script>
