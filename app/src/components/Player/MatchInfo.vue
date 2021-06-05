<template>
  <div v-if="matchStatus == 'waiting'">
    <p>You are waiting for match #{{ activeMatch }} to begin</p>
    <button v-if="isCreator" class="btn" @click="cancel">Cancel Match</button>
  </div>
</template>

<script>
import { cancelMatch } from "../../utilities/bridges/match";

export default {
  name: "MatchInfo",
  computed: {
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
      if (error) {
        console.error(error);
      }
      if (data) {
        console.log("match cancelled", data);
        // this.$store.dispatch()
      }
    },
  },
  created() {
    console.log(this.$store.getters.user);
  },
};
</script>