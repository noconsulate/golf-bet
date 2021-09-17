<template>
  <div>
    <div v-if="showNoUser">
      Please <a href="" class="underline" @click="handleSignin">sign in</a> to
      continue
    </div>
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
      if (!this.$store.getters.isUser) {
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
    allPlayersJoined() {
      return this.$store.getters.allPlayersJoined;
    },
  },
  methods: {
    handleSignin() {
      this.$router.push("player");
    },
  },
  created() {
    if (this.allPlayersJoined) {
      this.$router.push("/scorecard");
    }
  },
};
</script>