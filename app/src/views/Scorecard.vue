<template>
  <div>
    <div class="grid grid-cols-8 gap-2">
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
      return 9;
    },
    players() {
      return 2;
    },
  },
};
</script>
