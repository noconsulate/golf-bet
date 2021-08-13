<template>
  <div id="app">
    <div class="h-screen md:max-w-screen-sm md:border border-black relative">
      <button
        @click="tog()"
        class="text-black text-2xl p-2 absolute top-0 right-0"
      >
        &#9776;
      </button>
      <router-view
        class="clear-right"
        :class="open ? 'opacity-25' : 'opacity-100'"
      />
      <nav
        :class="open ? 'navbar-open' : 'navbar-close'"
        class="
          navbar
          w-64
          absolute
          overflow-x-scroll
          bg-gray-100
          top-0
          h-screen
        "
      >
        <div class="flex pr-2 justify-end">
          <button @click="tog()" class="p-2 text-xl font-bold">&#9747;</button>
        </div>
        <div
          class="w-full grid grid-cols-4 gap-3 pl-4 justity-items-auto text-3xl"
        >
          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>
          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>

          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>

          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3 cursor-pointer" @click="openPlayer">
            Player
          </div>
          <div class="col-span-4 invisible">X</div>
          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3 cursor-pointer" @click="openSetup">Match</div>
          <div class="col-span-4 invisible">X</div>
          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3 cursor-pointer" @click="openHelp">Help</div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    open() {
      return this.$store.state.ui.navOpen;
    },
    allPlayersJoined() {
      return this.$store.getters.allPlayersJoined;
    },
  },
  watch: {
    allPlayersJoined: async function (newVal, oldVal) {
      if (newVal && this.$route.name != "scorecard") {
        console.log("all players joined");
        await this.$store.dispatch("getAndSetUserDetails");
        await this.$store.dispatch("initScores");
        this.$router.push("/scorecard");
      }
    },
  },
  methods: {
    tog() {
      console.log("hey");
      // this.open = !this.open;
      this.$store.dispatch("toggleNavOpen");
    },
    openPlayer() {
      this.$router.push("/player");
      this.$store.dispatch("toggleNavOpen");
    },
    openSetup() {
      this.$router.push("/");
      this.$store.dispatch("toggleNavOpen");
    },
    openHelp() {
      this.$router.push("/help");
      this.$store.dispatch("toggleNavOpen");
    },
    fillScores() {
      this.$store.dispatch("fillScores");
    },
  },
  async created() {
    document.title = "Golf Bets";
    if (process.env.NODE_ENV === "development") {
      window.fillScores = this.fillScores;
    }
  },
};
</script>

<style>
.navbar {
  transition: all 330ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}
</style>
