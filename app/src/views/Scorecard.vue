<template>
  <div>
    <div class="grid grid-cols-8">
      <div :class="cell" class="col-span-4">Handicap</div>
      <div :class="cell"></div>
      <div :class="cell"></div>
      <div :class="cell"></div>
      <div :class="cell"></div>

      <div :class="cell">Hole</div>
      <div :class="cell">Tee</div>
      <div :class="cell">Par</div>
      <div :class="cell">HR</div>
      <div :class="cell">P1</div>
      <div :class="cell">P2</div>
      <div :class="cell">P3</div>
      <div :class="cell">P4</div>

      <template v-for="index in holes">
        <div :class="cell">{{ index }}</div>
        <div :class="cell"></div>
        <div :class="cell"></div>
        <div :class="cell"></div>
        <div :class="cell"></div>
        <div :class="cell"></div>
        <div :class="cell"></div>
        <div :class="cell"></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "scorecard",
  data() {
    return {
      // classes
      cell: "border",
    };
  },
  computed: {
    holes() {
      return 18;
    },
    players() {
      return 2;
    },
    cellRepeater() {
      this.holes * 8;
    },
  },
};
</script>
