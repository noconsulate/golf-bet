<template>
  <div class="space-y-3 flex flex-col items-center">
    <p>
      NUMBER OF POINTS
    </p>
    <input v-model="points" type="number" class="w-16 block pl-2" />
    <button @click="confirm" class="btn">Confirm</button>
    <button @click="back" class="btn block">Back</button>
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
