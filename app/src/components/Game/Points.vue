<template>
  <div class="space-y-3">
    <div>
      Number of points
    </div>
    <div>
      <input v-model="points" type="number" />
    </div>
    <div><button @click="confirm" class="btn">Confirm</button></div>
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
  },
};
</script>
