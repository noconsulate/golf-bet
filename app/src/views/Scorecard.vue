<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td colspan="5">HANDICAP</td>
        </tr>
        <tr>
          <td>H</td>
          <td>Gr</td>
          <td>Rd</td>
          <td>P</td>
          <td>HR</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "scorecard",
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
