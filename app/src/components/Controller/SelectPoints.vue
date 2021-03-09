<template>
  <div class="flex flex-col">
    <div class="flex justify-center py-4">Select Number of Players</div>
    <div class="flex border border-blue-600">
      <div class="bg-purple-500 px-3 flex items-center cursor-pointer">
        <button>prev</button>
      </div>
      <div class="grid grid-cols-2 bg-yellow-400 flex-grow">
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 1 ? selected : null]"
          @click="select(1)"
        >
          1
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 2 ? selected : null]"
          @click="select(2)"
        >
          2
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 3 ? selected : null]"
          @click="select(3)"
        >
          3
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 4 ? selected : null]"
          @click="select(4)"
        >
          4
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
      // classes
      selected: "border",
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
