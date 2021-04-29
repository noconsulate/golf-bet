<template>
  <div>
    <div v-if="showNoUser">
      Please sign in to continue
    </div>
    <Create v-if="showCreate" />
    <WaitingRoom v-if="showWaitingRoom" />
  </div>
</template>

<script>
import Create from "../components/Game/Create"
import WaitingRoom from "../components/Game/WaitingRoom"
import {getMatch} from "../utilities/bridges/match"
import {getActiveMatch} from "../utilities/bridges/auth"
export default {
  name: "game",
  components: {
    Create, WaitingRoom
  },
  computed: {
    showCreate() {
      if (
        this.$store.state.matchId == "" &&
        !this.showNoUser 
       
        ) {
        return true
      } else
      {
        return false
      }
    },
    showNoUser() {
      if (this.$store.state.user == null) {
        return true;
      } else {
        return false;
      }
    },
    showWaitingRoom() {
      if (
        this.$store.state.matchId != "" 
        ) {
        return true;
      } else {
        return false;
      }``
    }
  },
  async beforeMount() {
    const activeMatch = await getActiveMatch(this.$store.getters.user.id)
    if (activeMatch.error) {
      console.error("problem getting active match", activeMatch.error)
    }

    const matchId = activeMatch.data[0].active_match

    if (matchId) {
      console.log('match found', matchId)
      const matchData = await getMatch(matchId)
      this.$store.dispatch('setController', 'waitingForPlayers')
    }
  }
}
</script>