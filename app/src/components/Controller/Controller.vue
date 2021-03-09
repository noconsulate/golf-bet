<template>
  <div>
    <SelectPlayers v-if="controller == 'selectPlayers'" />
    <SelectPoints v-if="controller == 'selectPoints'" />
    <SelectHoles v-if="controller == 'selectHoles'" />
  </div>
</template>

<script>
import SelectPlayers from "./SelectPlayers";
import SelectPoints from "./SelectPoints";
import SelectHoles from "./SelectHoles";

export default {
  name: "controller",
  components: {
    SelectPlayers,
    SelectPoints,
    SelectHoles,
  },
  computed: {
    controller() {
      return this.$store.state.controller;
    },
  },
};
</script>
