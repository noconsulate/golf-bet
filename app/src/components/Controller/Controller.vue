<template>
  <div>
    <SelectPlayers v-if="controller == 'selectPlayers'" />
    <SelectPoints v-if="controller == 'selectPoints'" />
    <SelectHoles v-if="controller == 'selectHoles'" />
    <ConfirmGame v-if="controller == 'confirmGame'" />
  </div>
</template>

<script>
import SelectPlayers from "./SelectPlayers";
import SelectPoints from "./SelectPoints";
import SelectHoles from "./SelectHoles";
import ConfirmGame from "./ConfirmGame";

export default {
  name: "controller",
  components: {
    SelectPlayers,
    SelectPoints,
    SelectHoles,
    ConfirmGame,
  },
  computed: {
    controller() {
      return this.$store.state.controller;
    },
  },
};
</script>
