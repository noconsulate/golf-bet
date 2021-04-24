<template>
  <div>
    {{wrongMatch}}
    <div v-if="!user">
      No user, please sign in.
    </div>
    <div v-if="wrongMatch">
      <p>You are already in a matchm, you can't join this one. :(</p>
      <p>Join your match</p>
      <a href="#" @click="forfeit" class="underline text-blue-400">Or Forfeit it</a>
    </div>
    <div v-else> 
      <GameFull v-if="gameFull" />
      <PlayerJoin v-else />
      {{wrongMatch}}
    </div>
    
    
  </div>
</template>

<script>
import { getMatch, forfeitMatch } from "../utilities/bridges/match";

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
  methods: {
    
    async forfeit() {
      const {data, error} = forfeitMatch
    }
  },
  async created() {
    if (this.user) {
      const {data, error} = await getMatch(this.matchId);
      console.log(data, error)
    }

    console.log(this.wrongMatch)
  
  },
};
</script>
