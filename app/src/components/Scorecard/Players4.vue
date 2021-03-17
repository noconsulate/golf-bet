<template>
  <div class="grid grid-cols-8 \">
    HELLO
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
        :class="[index == activeHole ? activeRow : cell]"
        @click="selectRow(index)"
      >
        {{ index }}
      </div>
      <div :class="[index == activeHole ? activeRow : cell]">
        {{ courseData.tees[index - 1] }}
      </div>
      <div :class="[index == activeHole ? activeRow : cell]">
        {{ courseData.pars[index - 1] }}
      </div>
      <div :class="[index == activeHole ? activeRow : cell]">
        {{ courseData.ratings[index - 1] }}
      </div>
      <div
        :class="[
          index == activeHole ? activeRow : cell,
          index == activeHole && activePlayer == 1 ? activeCell : cell,
        ]"
      >
        {{ scores[index - 1][0] }}
      </div>
      <div
        :class="[
          index == activeHole ? activeRow : cell,
          index == activeHole && activePlayer == 2 ? activeCell : cell,
        ]"
      >
        {{ scores[index - 1][1] }}
      </div>
      <div
        :class="[
          index == activeHole ? activeRow : cell,
          index == activeHole && activePlayer == 3 ? activeCell : cell,
        ]"
      >
        {{ scores[index - 1][2] }}
      </div>
      <div
        :class="[
          index == activeHole ? activeRow : cell,
          index == activeHole && activePlayer == 4 ? activeCell : cell,
        ]"
      >
        {{ scores[index - 1][3] }}
      </div>
    </template>
    <div :class="cell">Total</div>
    <div :class="cell">{{ courseData.teesTotal() }}</div>
    <div :class="cell">{{ courseData.parsTotal() }}</div>
    <div :class="cell">{{ courseData.ratingsTotal() }}</div>
    <div :class="cell">{{ totalScores.player1() }}</div>
    <div :class="cell">{{ totalScores.player2() }}</div>
    <div :class="cell">{{ totalScores.player3() }}</div>
    <div :class="cell">{{ totalScores.player4() }}</div>
  </div>
</template>

<script>
export default {
  name: "players4",
  data() {
    return {
      cell: "border",
      activeRow: "border bg-gray-100",
      activeCell: "border bg-blue-100",
    };
  },
};
</script>
