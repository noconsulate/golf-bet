<template>
  <div class="flex flex-col">
    <div class="flex justify-center py-4">Select Number of Points</div>
    <div class="flex h-24 border border-blue-600">
      <div
        class="bg-purple-500 px-3 flex items-center cursor-pointer"
        @click="prev"
      >
        prev
      </div>
      <div
        class="bg-yellow-400 flex-grow flex flex-wrap justify-center content-center"
      >
        <input type="number" v-model="points" class="h-8 w-16" />
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
      points: null,
    };
  },
  methods: {
    prev() {
      this.$store.dispatch("setController", "selectPlayers");
    },
    next() {
      if (this.points != null) {
        this.$store.dispatch("setPoints", this.points);
        this.$store.dispatch("setController", "selectHoles");
      } else {
        console.log("select some points");
      }
    },
  },
};
</script>
