<template>
  <div>
    <div v-if="waiting">
      <p>You are waiting for match #{{ activeMatch }} to begin</p>
      <button v-if="isCreator" class="btn" @click="cancel">Cancel Match</button>
      <button v-if="!isCreator" class="btn" @click="cancel">Leave Match</button>
    </div>
    <div v-if="playing">
      <p>You are playing in match #{{ activeMatch }}</p>
      <button class="btn" @click="forfeit">Forfeit Match</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MatchInfo",
  computed: {
    waiting() {
      if (this.activeMatch != null && this.matchStatus == "waiting")
        return true;
      else return false;
    },
    playing() {
      if (this.activeMatch != null && this.matchStatus == "playing")
        return true;
      else return false;
    },
    activeMatch() {
      return this.$store.getters.user.active_match;
    },
    matchStatus() {
      return this.$store.state.match.match.status;
    },
    isCreator() {
      return (
        this.$store.state.match.match.creator == this.$store.getters.user.id
      );
    },
  },
  methods: {
    async cancel() {
      this.$store.dispatch("cancelMatch");
    },
    async forfeit() {
      this.$store.dispatch("forfeitMatch");
    },
  },
  created() {},
};
</script>