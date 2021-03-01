<template>
  <div>
    <table class="table-fixed">
      <tbody>
        <tr>
          <td :class="tableCell" colspan="4">HANDICAP</td>
        </tr>
        <tr>
          <td :class="tableCell">T</td>
          <td :class="tableCell">Rd</td>
          <td :class="tableCell">P</td>
          <td :class="tableCell">HR</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "scorecard",
  data() {
    return {
      // classes
      tableCell: "border",
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
