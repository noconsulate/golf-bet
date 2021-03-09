<template>
  <div class="h-screen w-screen bg-blue-200 flex flex-col">
    <div class="flex-grow ">
      <div class="grid grid-cols-7 pt-8">
        <div class="col-span-3" />
        <div
          class="col-span-3"
          :class="[controller == 'selectPlayers' ? activeGroup : null]"
        >
          Number of Players
        </div>
        <div>
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
        <div>
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
        <div class="col-span-1 flex flex-col">
          {{ holes }}
        </div>
      </div>
    </div>
    <div class="bg-pink-200 h-40 object-none object-bottom">
      <Controller />
    </div>
  </div>
</template>

<script>
import Controller from "../components/Controller/Controller";
export default {
  name: "game",
  components: {
    Controller,
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
  },
  methods: {},
  created() {},
};
</script>
