<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="grid grid-cols-7 pt-8">
      <div class="col-span-3" />
      <div
        :class="[group, controller == 'selectPlayers' ? activeGroup : null]"
        @click="focus('selectPlayers')"
      >
        Number of Players
      </div>
      <div class="cursor-pointer" @click="focus('selectPlayers')">
        {{ players }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div
        :class="[group, controller == 'selectPoints' ? activeGroup : null]"
        @click="focus('selectPoints')"
      >
        Number of Points
      </div>
      <div class="cursor-pointer" @click="focus('selectPoints')">
        {{ points }}
      </div>
      <div class="col-span-7 invisible">/</div>

      <div class="col-span-3 " />
      <div
        :class="[group, controller == 'selectHoles' ? activeGroup : null]"
        @click="focus('selectHoles')"
      >
        Number of Holes
      </div>
      <div class="cursor-pointer" @click="focus('selectHoles')">
        {{ holes }}
      </div>
      <div class="col-span-7 invisible">/</div>
      <div class="col-span-3" />
      <div
        :class="[group, controller == 'selectScoring' ? activeGroup : null]"
        @click="focus('selectScoring')"
      >
        Scoring Style
      </div>
      <div class="cursor-pointer" @click="focus('selectScoring')">
        {{ scoringStyle }}
      </div>
    </div>

    <div class="py-8">
      <div v-if="controller == 'confirmGame'" class=" flex flex-col">
        <p class="text-2xl flex justify-center">Let's go!!</p>
      </div>
      <Share v-if="controller == 'waitingForPlayers'" />
    </div>
    <div class=" flex-grow"></div>
    <div class=" h-40 object-none object-bottom">
      <Controller />
    </div>
  </div>
</template>

<script>
import Controller from "../Controller/Controller"
import Share from "./Share";
export default {
  name: "create",
  components: {
    Controller,
    Share,
  },
  data() {
    return {
      // classes
      group: "col-span-3 cursor-pointer",
      activeGroup: "underline",
      activeClass: "rounded border border-black  w-12",
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
