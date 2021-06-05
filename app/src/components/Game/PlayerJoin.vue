<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="text-center pt-4">Welcome {{ email }}</div>
    <div class="grid grid-cols-7 pt-4">
      <div class="col-span-3" />
      <div class="col-span-3">Number of Players</div>
      <div class="">
        {{ players }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">Number of Points</div>
      <div class="">
        {{ points }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">Number of Holes</div>
      <div class="">
        {{ holes }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">Scoring Style</div>
      <div class="">
        {{ scoringStyle }}
      </div>
      <div class="col-span-7 invisible">/</div>
    </div>
    <div v-if="error == 'joinError'" class="text-red-600 text-center">
      There was an error joining the game.
    </div>
    <Share v-if="controller == 'waitingForPlayers'" />
    <div class="flex-grow"></div>

    <div class="h-40 object-none object-bottom">
      <Controller />
    </div>
  </div>
</template>

<script>
import Controller from "../Controller/Controller";
import Share from "../../components/Game/Share";
export default {
  name: "playerJoin",
  components: {
    Share,
    Controller,
  },
  data() {
    return {
      waiting: false,
    };
  },
  computed: {
    playerNum() {
      return this.$store.state.match.playerNum;
    },
    players() {
      return this.$store.state.match.players;
    },
    points() {
      return this.$store.state.match.points;
    },
    holes() {
      return this.$store.state.match.holes;
    },
    scoringStyle() {
      return this.$store.state.match.scoringStyle;
    },
    matchId() {
      return this.$store.state.match.id;
    },
    controller() {
      return this.$store.state.controller;
    },
    error() {
      return this.$store.state.error;
    },
    email() {
      return this.$store.getters.user.email;
    },
  },
  methods: {
    async confirm() {},
  },
  created() {
    this.$store.dispatch("setController", "joinGame");

    const status = this.$store.state.match.status;
    console.log(status);
  },
};
</script>
