<template>
  <div class="">
    <div class="grid grid-cols-8">
      <div class="col-span-3" />
      <div class="bg-green-300 col-span-3">
        <label for="players">Number of Players</label>
      </div>
      <div>
        <input
          id="players"
          type="number"
          v-model="players"
          class="border bg-blue-600 w-full"
        />
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="bg-green-300 col-span-3">
        <label for="points">Number of Points</label>
      </div>
      <div>
        <input
          id="points"
          type="number"
          v-model="points"
          class="border w-full"
        />
      </div>
      <div class="row-span-3 col-span-3 bg-pink-400" />
      <div class="col-span-3 row-span-3 bg-pink-600">
        <label for="holes">Number of Holes</label>
      </div>
      <div class="bg-yellow-400">
        <button>18</button>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2">
      <div class="bg-yellow-300 row-span-3">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
      <div class="bg-yellow-300">1</div>
    </div>
  </div>
</template>
