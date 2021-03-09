<template>
  <div class="flex flex-col">
    <div class="flex justify-center py-4">Number of Players</div>
    <div class="flex border border-blue-600">
      <div class="bg-purple-500 px-3 flex items-center cursor-pointer">
        <button>prev</button>
      </div>
      <div class="grid grid-cols-2 bg-yellow-400 flex-grow">
        <div class="flex justify-center text-4xl">
          <button @click="select(1)">1</button>
        </div>
        <div class="flex justify-center text-4xl">
          <button @click="select(2)">2</button>
        </div>
        <div class="flex justify-center text-4xl">
          <button @click="select(3)">3</button>
        </div>
        <div class="flex justify-center text-4xl">
          <button @click="select(4)">4</button>
        </div>
      </div>
      <div
        class="bg-red-300 px-3 flex items-center cursor-pointer"
        @click="next"
      >
        next
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: null,
    };
  },
  methods: {
    select(num) {
      this.players = num;
    },
    next() {
      this.$store.dispatch("setPlayers", this.players);
      this.$store.dispatch("setController", "selectPoints");
    },
  },
};
</script>
