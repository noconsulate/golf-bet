<template>
  <div class="px-4 py-4">
    <Splash v-if="sequence == 'splash'" />
    <Players v-if="sequence == 'players'" />
    <Points v-if="sequence == 'points'" />
  </div>
</template>

<script>
import Splash from "../components/Game/Splash";
import Players from "../components/Game/Players";
import Points from "../components/Game/Points";

export default {
  name: "Home",
  components: {
    Splash,
    Players,
    Points,
  },
  // data: {},
  computed: {
    sequence() {
      return this.$store.state.sequence;
    },
  },
};
</script>
