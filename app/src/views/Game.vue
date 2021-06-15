<template>
  <div>
    <div v-if="showNoUser">Please sign in to continue</div>
    <Create v-if="showCreate" />
    <WaitingRoom v-if="showWaitingRoom" />
  </div>
</template>

<script>
import Create from "../components/Game/Create";
import WaitingRoom from "../components/Game/WaitingRoom";
export default {
  name: "game",
  components: {
    Create,
    WaitingRoom,
  },
  computed: {
    showCreate() {
      if (this.$store.state.match.match.id == "" && !this.showNoUser) {
        // this.$store.dispatch("setController", "confirmGame");
        return true;
      } else {
        return false;
      }
    },
    showNoUser() {
      if (this.$store.state.user.user == null) {
        return true;
      } else {
        return false;
      }
    },
    showWaitingRoom() {
      if (this.$store.state.match.match.id != "") {
        this.$store.dispatch("setController", "waitingForPlayers");
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>