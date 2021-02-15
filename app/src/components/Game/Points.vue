<template>
  <div class="space-y-3">
    <div class="flex justify-center">
      <p>
        NUMBER OF POINTS
      </p>
    </div>
    <div class="flex justify-center">
      <input v-model="points" type="number" class="w-16 block pl-2" />
    </div>
    <div class="flex justify-center">
      <button @click="confirm" class="btn">Confirm</button>
    </div>
    <div class="flex justify-center">
      <button @click="back" class="btn block">Back</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "points",
  data() {
    return {
      points: "",
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("setPoints", this.points);
      this.$store.dispatch("setSequence", "holes");
    },
    back() {
      this.$store.dispatch("setSequence", "players");
    },
  },
  created() {
    if (this.$store.state.points != "") {
      this.points = this.$store.state.points;
    }
  },
};
</script>
