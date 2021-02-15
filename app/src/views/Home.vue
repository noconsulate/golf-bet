<template>
  <div class="px-4 py-4">
    <Splash v-if="sequence == 'splash'" />
    <Players v-if="sequence == 'players'" />
    <Points v-if="sequence == 'points'" />
    <Holes v-if="sequence == 'holes'" />
    <Confirmation v-if="sequence == 'confirmation'" />
    <Share v-if="sequence == 'share'" />
    <Gameplay v-if="sequence == 'gameplay'" />
    <Intrastitial v-if="sequence == 'interstitial'" />
    <Gameover v-if="sequence == 'gameover'" />
  </div>
</template>

<script>
import Splash from "../components/Game/Splash";
import Players from "../components/Game/Players";
import Points from "../components/Game/Points";
import Holes from "../components/Game/Holes";
import Share from "../components/Game/Share";
import Confirmation from "../components/Game/Confirmation.vue";
import Gameplay from "../components/Game/Gameplay";
import Intrastitial from "../components/Game/Intrastitial";
import Gameover from "../components/Game/Gameover";

export default {
  name: "Home",
  components: {
    Splash,
    Players,
    Points,
    Holes,
    Share,
    Confirmation,
    Gameplay,
    Intrastitial,
    Gameover,
  },
  // data: {},
  computed: {
    sequence() {
      return this.$store.state.sequence;
    },
  },
};
</script>
