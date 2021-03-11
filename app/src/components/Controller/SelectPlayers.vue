<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Number of Players</div>
    <div class="controller-panel">
      <div class="controller-prev">
        <button>prev</button>
      </div>
      <div class="grid grid-cols-2 bg-yellow-400 flex-grow">
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 1 ? selected : null]"
          @click="select('1')"
        >
          1
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 2 ? selected : null]"
          @click="select('2')"
        >
          2
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 3 ? selected : null]"
          @click="select('3')"
        >
          3
        </div>
        <div
          class="flex justify-center text-4xl cursor-pointer"
          :class="[players == 4 ? selected : null]"
          @click="select('4')"
        >
          4
        </div>
      </div>
      <div v-if="isReady" class="controller-next-ready" @click="next">
        next
      </div>
      <div v-else class="controller-next-notReady" @click="next">
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
    };
  },
  computed: {
    players() {
      return this.$store.state.players;
    },
    isReady() {
      return this.players != "";
    },
  },
  methods: {
    select(num) {
      this.$store.dispatch("setPlayers", num);
    },
    next() {
      if (this.players != "") {
        this.$store.dispatch("setController", "selectPoints");
      } else {
        console.log("need to select players");
      }
    },
  },
};
</script>
