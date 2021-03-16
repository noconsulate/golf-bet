<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="text-center pt-4">Welcome player {{ playerNum }}</div>
    <div class="grid grid-cols-7 pt-4">
      <div class="col-span-3" />
      <div class="col-span-3">
        Number of Players
      </div>
      <div class="">
        {{ players }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">
        Number of Points
      </div>
      <div class="">
        {{ points }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">
        Number of Holes
      </div>
      <div class="">
        {{ holes }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div class="col-span-3">
        Scoring Style
      </div>
      <div class="">
        {{ scoringStyle }}
      </div>
      <div class="col-span-7 invisible">/</div>
    </div>
    <div v-if="error == 'joinError'" class="text-red-600 text-center">
      There was an error joining the game.
    </div>
    <Share v-if="controller == 'waitingForPlayers'" />
    <div class=" flex-grow"></div>

    <div class=" h-40 object-none object-bottom">
      <Controller />
    </div>
  </div>
</template>

<script>
import { playerConfirm, playersJoinedListener } from "../../utilities/bridges";
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
      return this.$store.state.playerNum;
    },
    players() {
      return this.$store.state.players;
    },
    points() {
      return this.$store.state.points;
    },
    holes() {
      return this.$store.state.holes;
    },
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
    gameId() {
      return this.$store.state.gameId;
    },
    controller() {
      return this.$store.state.controller;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    async confirm() {
      playersJoinedListener(this.gameId);

      let joinGame = await playerConfirm(this.gameId);

      if (joinGame == "success") {
        console.log("you joined the game");
        this.waiting = true;
      } else {
        console.log("something went wrong with joining games");
      }
    },
  },
  created() {
    this.$store.dispatch("setController", "joinGame");
  },
};
</script>
