<template>
  <div>
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
    </div>
    
    
  </div>
</template>

<script>
import { getMatch, forfeitMatch } from "../utilities/bridges/match";
import {getUserDetails} from "../utilities/bridges/auth"

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
      const {data, error} = await forfeitMatch(scoreId)
      if (error) {
        console.error('forfeit() error', error)
      }
      if (data) {
        this.wrongMatch = false;
      }
    }
  },
  async created() {

    // get user.activeMatch before anything else. this is bad design.
    const userDetails = await getUserDetails(this.user.id)
    const activeMatch = userDetails.data.active_match

    if (activeMatch && activeMatch != this.$route.query.match){
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
