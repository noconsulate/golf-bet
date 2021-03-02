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
        <div
          :class="[index == activeHole ? activeCell : cell]"
          @click="selectRow(index)"
        >
          {{ index }}
        </div>
        <div :class="[index == activeHole ? activeCell : cell]">
          {{ courseData.tees[index - 1] }}
        </div>
        <div :class="[index == activeHole ? activeCell : cell]">
          {{ courseData.pars[index - 1] }}
        </div>
        <div :class="[index == activeHole ? activeCell : cell]">
          {{ courseData.ratings[index - 1] }}
        </div>
        <div :class="[index == activeHole ? activeCell : cell]"></div>
        <div :class="[index == activeHole ? activeCell : cell]"></div>
        <div :class="[index == activeHole ? activeCell : cell]"></div>
        <div :class="[index == activeHole ? activeCell : cell]"></div>
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
      activeCell: "border bg-gray-100",

      // ui
      activeHole: 1,
    };
  },
  computed: {
    // classes
    cellClass() {
      console.log();
    },
    holes() {
      return 18;
    },
    players() {
      return 2;
    },
    courseData() {
      return {
        tees: [
          232,
          234,
          126,
          666,
          696,
          313,
          216,
          316,
          118,
          232,
          234,
          126,
          666,
          696,
          313,
          216,
          316,
          118,
        ],
        pars: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        ratings: [
          12,
          18,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
          12,
        ],
      };
    },
  },
  methods: {
    selectRow(index) {
      this.activeHole = index;
    },
  },
};
</script>
