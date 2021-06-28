<template>
  <div class="col-span-2 row-span-3 bg-green-200">
    <div
      class="
        h-full
        flex flex-col
        space-y-2
        justfiy-center
        items-center
        bg-purple-200
      "
    >
      <p>Looks Good!</p>
      <button class="btn">Confirm Totals</button>
      <p>Something doesn't look right</p>
      <div class="flex space-x-2">
        <button class="btn">Back</button>
        <p>to edit</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmResults",
};
</script>