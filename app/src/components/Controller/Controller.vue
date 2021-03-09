<template>
  <div>
    <SelectPlayers v-if="controller == 'selectPlayers'" />
    <SelectPoints v-if="controller == 'selectPoints'" />
  </div>
</template>

<script>
import SelectPlayers from "./SelectPlayers";
import SelectPoints from "./SelectPoints";

export default {
  name: "controller",
  components: {
    SelectPlayers,
    SelectPoints,
  },
  computed: {
    controller() {
      return this.$store.state.controller;
    },
  },
};
</script>
