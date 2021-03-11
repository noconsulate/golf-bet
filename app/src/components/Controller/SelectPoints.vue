<template>
  <div class="flex flex-col">
    <div class="controller-title">Select Number of Points</div>
    <div class="controller-panel">
      <div class="controller-prev" @click="prev">
        prev
      </div>
      <div
        class="bg-yellow-400 flex-grow flex flex-wrap justify-center content-center"
      >
        <input type="number" v-model="points" class="h-8 w-16" />
      </div>
      <div class="controller-next" @click="next">
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
      points: "",
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
