<template>
  <div v-if="display">
    <p>You are waiting for match #{{ activeMatch }} to begin</p>
    <button v-if="isCreator" class="btn" @click="cancel">Cancel Match</button>
    <button v-if="!isCreator" class="btn" @click="cancel">Leave Match</button>
  </div>
</template>

<script>
import { cancelMatch } from "../../utilities/bridges/match";

export default {
  name: "MatchInfo",
  computed: {
    display() {
      if (this.activeMatch != null && this.matchStatus == "waiting")
        return true;
      else return false;
    },
    activeMatch() {
      return this.$store.getters.user.active_match;
    },
    matchStatus() {
      return this.$store.state.match.status;
    },
    isCreator() {
      return this.$store.state.match.creator == this.$store.getters.user.id;
    },
  },
  methods: {
    async cancel() {
      const { data, error } = await cancelMatch(this.$store.getters.user.id);
      if (!data.success || error) {
        console.error(error);
      }
    },
  },
  created() {
    console.log(this.$store.getters.user);
  },
};
</script>