<template>
  <div>
    <div v-if="showNoUser" class="w-full text-center pt-8">
      Please sign in to continue
    </div>
    <div v-if="showWrongMatch" class="w-full text-center pt-8">
      You're already in a match
    </div>
    <WaitingRoom v-if="showWaitingRoom && !this.loading" />
  </div>
</template>

<script>
import WaitingRoom from "../components/Game/WaitingRoom";
export default {
  name: "join",
  components: { WaitingRoom },
  data() {
    return {
      activeMatch: null,
      matchId: "",
      inWrongMatch: false,
      loading: true,
    };
  },
  computed: {
    showNoUser() {
      if (this.$store.state.user.user.id == null) {
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
    showWaitingRoom() {
      if (
        !this.inWrongMatch &&
        this.matchId &&
        this.$store.state.user.user.id &&
        !this.loading
      ) {
        return true;
      } else {
        return false;
      }
    },
    allPlayersJoined() {
      return this.$store.getters.allPlayersJoined;
    },
  },
  async beforeMount() {
    if (this.allPlayersJoined) {
      this.$router.push("/scorecard");
    }
    // ** make sure user isn't in a different match. this logic should probably be handled some other way. **

    const matchId = this.$route.query.match;
    this.matchId = matchId;

    const activeMatch = this.$store.getters.user.active_match;
    console.log("active match: " + activeMatch);
    if (activeMatch && activeMatch != matchId) {
      console.log("in wrong match");
      this.inWrongMatch = true;
    }

    if (activeMatch && activeMatch == matchId) {
      console.log("in this match");
      await this.$store.dispatch("getAndSetMatch", matchId);
      this.loading = false;
      this.$store.dispatch("setController", "waitingForPlayers");
    }

    if (!activeMatch) {
      console.log("!activeMatch", matchId);
      // console.log("loading: " + this.loading, this.$store.state.match.match);
      await this.$store.dispatch("getAndSetMatch", matchId);
      this.loading = false;
      this.$store.dispatch("setController", "joinGame");
      // console.log("loading: " + this.loading, this.$store.state.match.match);

      if (this.$store.state.match.match.status == "cancelled") {
        console.log("match cancelled!");
        this.$store.dispatch("setController", "waitingForPlayers");
      }
    }
  },
};
</script>   