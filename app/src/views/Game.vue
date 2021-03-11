<template>
  <div class="h-screen w-screen bg-blue-200 flex flex-col">
    <div class="">
      <div class="grid grid-cols-7 pt-8">
        <div class="col-span-3" />
        <div
          class="col-span-3"
          :class="[controller == 'selectPlayers' ? activeGroup : null]"
        >
          Number of Players
        </div>
        <div class="cursor-pointer" @click="focus('selectPlayers')">
          {{ players }}
        </div>
        <div class="col-span-7 invisible">/</div>
        <div class="col-span-3" />
        <div
          class="col-span-3"
          :class="[controller == 'selectPoints' ? activeGroup : null]"
        >
          Number of Points
        </div>
        <div class="cursor-pointer" @click="focus('selectPoints')">
          {{ points }}
        </div>
        <div class="col-span-7 invisible">/</div>

        <div class="col-span-3 " />
        <div
          class="col-span-3  flex items-center"
          :class="[controller == 'selectHoles' ? activeGroup : null]"
        >
          Number of Holes
        </div>
        <div class="cursor-pointer" @click="focus('selectHoles')">
          {{ holes }}
        </div>
        <div class="col-span-7 invisible">/</div>
        <div class="col-span-3" />
        <div
          class="col-span-3 flexs intems-center"
          :class="[controller == 'selectScoring' ? activeGroup : null]"
        >
          Scoring Style
        </div>
        <div class="cursor-pointer" @click="focus('selectScoring')">
          {{ scoringStyle }}
        </div>
        `
      </div>
    </div>

    <div class="py-8">
      <div
        v-if="controller == 'confirmGame'"
        class="bg-green-700 flex flex-col"
      >
        <p class="text-2xl flex justify-center">Let's go!!</p>
      </div>
      <Share v-if="controller == 'waitingForPlayers'" />
    </div>
    <div class="bg-purple-500 flex-grow"></div>
    <div class="bg-pink-200 h-40 object-none object-bottom">
      <Controller />
    </div>
  </div>
</template>

<script>
import Controller from "../components/Controller/Controller";
import Share from "../components/Game/Share";
export default {
  name: "game",
  components: {
    Controller,
    Share,
  },
  data() {
    return {
      // classes
      activeGroup: "underline",
      activeClass: "rounded border border-black bg-blue-300 w-12",
      inactiveClass: "rounded border border-black w-12",
    };
  },
  computed: {
    controller() {
      return this.$store.state.controller;
    },
    players() {
      return this.$store.state.players;
    },
    holes() {
      return this.$store.state.holes;
    },
    points() {
      return this.$store.state.points;
    },
    scoringStyle() {
      return this.$store.state.scoringStyle;
    },
  },
  methods: {
    focus(group) {
      this.$store.dispatch("setController", group);
    },
  },
  created() {},
};
</script>
