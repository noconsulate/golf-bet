<template>
  <div class="">
    <div class="grid grid-cols-7 pt-8">
      <div class="col-span-3" />
      <div class="col-span-3">
        <label for="players">Number of Players</label>
      </div>
      <div>
        <input
          id="players"
          type="number"
          v-model="players"
          class="border w-full"
        />
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">
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
      <div class="col-span-7 invisible">/</div>

      <div class="row-span-3 col-span-3 " />
      <div class="col-span-3 row-span-3  flex items-center">
        <label for="holes">Number of Holes</label>
      </div>
      <div class=" row-span-3 col-span-1 flex flex-col">
        <button
          :class="[holes == '18' ? activeClass : inactiveClass]"
          @click="selectHoles('18')"
        >
          18
        </button>
        <button
          :class="[holes == '9' ? activeClass : inactiveClass]"
          @click="selectHoles('9')"
        >
          9
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "game",
  data() {
    return {
      players: null,
      points: null,
      holes: null,

      // classes
      activeClass: "rounded border border-black bg-blue-300 w-12",
      inactiveClass: "rounded border border-black w-12",
    };
  },
  methods: {
    selectHoles(holes) {
      this.holes = holes;
    },
  },
  created() {
    this.holes = this.$store.state.holes;
  },
};
</script>
