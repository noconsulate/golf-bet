<template>
  <div class="">
    <Splash v-if="sequence == 'splash'" />
  </div>
</template>

<script>
import Splash from "../components/Game/Splash";

export default {
  name: "Home",
  components: {
    Splash: Splash,
  },
  // data: {},
  computed: {
    sequence() {
      return this.$store.state.sequence;
    },
  },
};
</script>
