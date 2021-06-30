<template>
  <div class="col-span-2 row-span-3">
    <div class="h-full flex flex-col space-y-2 justify-center items-center">
      <p>Looks Good!</p>
      <button class="btn" @click="confirm">Confirm Totals</button>
      <p>Something doesn't look right</p>
      <div class="flex space-x-2">
        <button class="btn" @click="back">Back</button>
        <p>to edit</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmResults",
  methods: {
    back() {
      this.$store.dispatch("resetResults");
    },
    confirm() {
      this.$store.dispatch("confirmResults");
      // this.$store.dispatch("setController", "afterTotals");
    },
  },
};
</script>