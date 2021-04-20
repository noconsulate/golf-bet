<template>
  <div>
    <div v-if="!user">
      No user, please sign in.
    </div>
    <div v-if="wrongMatch">
      <p>You are already in a matchm, you can't join this one. :(</p>
    </div>
    <div v-else> 
      <GameFull v-if="gameFull" />
      <PlayerJoin v-else />
      {{wrongMatch}}
    </div>
    
    
  </div>
</template>

<script>
import { getMatch } from "../utilities/bridges/match";

import PlayerJoin from "../components/Game/PlayerJoin";
import GameFull from "../components/Game/GameFull";
import Gameplay from "../components/Game/Gameplay";
import FinalScore from "../components/Game/FinalScore";

export default {
  name: "join",
  components: {
    PlayerJoin,
    GameFull,
    Gameplay,
    FinalScore,
  },
  computed: {
    matchId() {
      return this.$route.query.match;
    },
    sequence() {
      return this.$store.state.sequence;
    },
    user() {
      return this.$store.getters.user;
    },
    wrongMatch() {
      return this.$store.getters.inWrongMatch;
    }
  },
  data() {
    return {
      gameFull: false,
    };
  },
  async created() {
    // let matchInfo = await joinMatch(this.matchId);
    if (this.user) {
      const {data, error} = await getMatch(this.matchId);
      console.log(data, error)
    }

    console.log(this.wrongMatch)
  
  },
};
</script>
