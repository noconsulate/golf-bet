<template>
  <div class="space-y-3">
    <p>
      Number of points
    </p>

    <input v-model="points" type="number" class="w-16 block" />
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
