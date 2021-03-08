<template>
  <div class="flex">
    <div class="bg-purple-500 flex items-center">
      <button>prev</button>
    </div>
    <div class="grid grid-cols-2 bg-yellow-400 flex-grow">
      <div class="flex justify-center text-4xl">
        <button>1</button>
      </div>
      <div class="flex justify-center text-4xl">
        <button>2</button>
      </div>
      <div class="flex justify-center text-4xl">
        <button>3</button>
      </div>
      <div class="flex justify-center text-4xl">
        <button>4</button>
      </div>
    </div>
    <div class="bg-red-300 flex items-center">
      <button>next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "controller",
};
</script>
