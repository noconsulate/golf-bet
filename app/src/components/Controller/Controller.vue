<template>
  <div class="border border-black">
    <SelectPlayers v-if="controller == 'selectPlayers'" />
    <SelectPoints v-if="controller == 'selectPoints'" />
    <SelectHoles v-if="controller == 'selectHoles'" />
    <SelectScoring v-if="controller == 'selectScoring'" />
    <ConfirmGame v-if="controller == 'confirmGame'" />
  </div>
</template>

<script>
import SelectPlayers from "./SelectPlayers";
import SelectPoints from "./SelectPoints";
import SelectHoles from "./SelectHoles";
import SelectScoring from "./SelectScoring";
import ConfirmGame from "./ConfirmGame";

export default {
  name: "controller",
  components: {
    SelectPlayers,
    SelectPoints,
    SelectHoles,
    SelectScoring,
    ConfirmGame,
  },
  computed: {
    controller() {
      return this.$store.state.controller;
    },
  },
};
</script>
