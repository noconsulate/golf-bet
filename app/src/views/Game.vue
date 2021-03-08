<template>
  <div class="w-full">
    <div class="bg-red-200 flex justify-end">
      <label for="players">Number of Players</label>
      <input
        id="players"
        type="number"
        v-model="players"
        class="border w-12 mx-4"
      />
    </div>
    <div class="flex justify-end">
      <label for="points">Number of points</label>
      <input
        id="points"
        type="number"
        v-model="points"
        class="border w-12 mx-4"
      />
    </div>
  </div>
</template>
