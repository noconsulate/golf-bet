<template>
  <div>
    <div v-if="showNoUser">
      Please sign in to continue
    </div>
    <Create v-if="showCreate" />
  </div>
</template>

<script>
import Create from "../components/Game/Create"
export default {
  name: "game",
  components: {
    Create
  },
  computed: {
    showCreate() {
      if (
        this.$store.state.active_match == undefined &&
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
    }
  }
}
</script>