<template>
  <div class="px-4 py-4">
    <Splash v-if="sequence == 'splash'" />
    <Players v-if="sequence == 'players'" />
    <Points v-if="sequence == 'points'" />
    <Holes v-if="sequence == 'holes'" />
    <Confirmation v-if="sequence == 'confirmation'" />
    <Gameplay v-if="sequence == 'gameplay'" />
  </div>
</template>

<script>
import Splash from "../components/Game/Splash";
import Players from "../components/Game/Players";
import Points from "../components/Game/Points";
import Holes from "../components/Game/Holes";
import Confirmation from "../components/Game/Confirmation.vue";
import Gameplay from "../components/Game/Gameplay";

export default {
  name: "Home",
  components: {
    Splash,
    Players,
    Points,
    Holes,
    Confirmation,
    Gameplay,
  },
  // data: {},
  computed: {
    sequence() {
      return this.$store.state.sequence;
    },
  },
};
</script>
