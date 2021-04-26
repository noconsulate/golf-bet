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
   
  },
  data() {
    return {
      gameFull: false,
      wrongMatch: false,
    };
  },
  methods: {
    
    async forfeit() {
      const scoreId = this.$store.state.scoreId
      console.log(scoreId)
      const {data, error} = await forfeitMatch(this.scoreId)
      console.log(data, error)
    }
  },
  async created() {
    console.log(this.user.active_match)

    if (this.user.active_match && this.user.active_match != this.$route.query.match){
      console.log('wrong match');
      this.wrongMatch = true;
    }

    if (this.user) {
      const {data, error} = await getMatch(this.matchId);
      console.log(data, error)
    }

  },
};
</script>
