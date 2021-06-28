<template>
  <ConfirmResults v-if="controller == 'confirmResults'" />
</template>

<script>
import ConfirmResults from "./controllers/ConfirmResults.vue";
export default {
  name: "Controller",
  components: { ConfirmResults },
  data() {
    return {};
  },
  computed: {
    controller() {
      return this.$store.getters.controller;
    },
  },
};
</script>