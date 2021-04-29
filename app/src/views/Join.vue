<template>
  <div>
    <div v-if="showNoUser">Please sign in to continue</div>
    <div v-if="showWrongMatch">You're already in a match</div>
    <PlayerJoin v-if="showPlayerJoin" />
    <WaitingRoom v-if="showWaitingRoom" />
  </div>
</template>

<script>
import { getUserDetails } from "../utilities/bridges/auth";
import { getMatch } from "../utilities/bridges/match";

import PlayerJoin from "../components/Game/PlayerJoin";
import WaitingRoom from "../components/Game/WaitingRoom";
export default {
  name: "join",
  components: { PlayerJoin, WaitingRoom },
  data() {
    return {
      activeMatch: null,
      matchId: "",
      inWrongMatch: false,
    };
  },
  computed: {
    showNoUser() {
      if (this.$store.state.user == null) {
        return true;
      } else {
        return false;
      }
    },
    showWrongMatch() {
      if (this.inWrongMatch) {
        return true;
      } else {
        return false;
      }
    },
    showPlayerJoin() {
      return false;
    },
    showWaitingRoom() {
      return true;
    },
  },
  async created() {
    // ** make sure user isn't in a different match. this logic should probably be handled some other way. **
    if (!this.$store.state.user.id) return;

    const matchId = this.$route.query.match;
    this.matchId = matchId;

    const userDetails = await getUserDetails(this.$store.state.user.id);
    console.log(userDetails.data);
    if (userDetails.error) {
      console.log(userDetails.error);
    }

    const activeMatch = userDetails.data.active_match;
    console.log(activeMatch);
    if (activeMatch && activeMatch != matchId) {
      console.log("in wrong match");
      this.inWrongMatch = true;
    }

    if (activeMatch && activeMatch == matchId) {
      console.log("in this match");
      this.$store.dispatch("setController", "waitingForPlayers");
      const matchData = await getMatch(matchId)
    }

    if (!activeMatch) {
      const matchData = await getMatch(matchId);
    }
  },
};
</script>