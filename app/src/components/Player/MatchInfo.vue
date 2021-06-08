<template>
  <div>
    <div v-if="waiting">
      <p>You are waiting for match #{{ activeMatch }} to begin</p>
      <button v-if="isCreator" class="btn" @click="cancel">Cancel Match</button>
      <button v-if="!isCreator" class="btn" @click="cancel">Leave Match</button>
    </div>
    <div v-if="started">
      <p>You are playing in match #{{ activeMatch }}</p>
      <button class="btn" @click="forfeit">Forfeit Match</button>
    </div>
  </div>
</template>

<script>
import { cancelMatch, forfeitMatch } from "../../utilities/bridges/match";

export default {
  name: "MatchInfo",
  computed: {
    waiting() {
      if (this.activeMatch != null && this.matchStatus == "waiting")
        return true;
      else return false;
    },
    started() {
      if (this.activeMatch != null && this.matchStatus == "started")
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
    async forfeit() {
      const { data, error } = await forfeitMatch(
        this.$store.getters.user.active_score
      );

      console.log(data, error);

      if (data) {
        this.$store.dispatch(
          "getAndSetUserDetails",
          this.$store.getters.user.id
        );
      }
    },
  },
  created() {},
};
</script>