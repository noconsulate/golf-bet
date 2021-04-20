<template>
  <div id="app">
    <div class=" h-screen w-screen container mx-auto  md:w-1/2 lg:w-1/3">
      <button
        @click="tog()"
        class="text-black text-2xl p-2 font-bold absolute top-0 right-0"
      >
        &#9776;
      </button>
      <router-view :class="open ? 'opacity-25' : 'opacity-100'" />
      <nav
        :class="open ? 'navbar-open' : 'navbar-close'"
        class="navbar w-64 absolute overflow-x-scroll bg-gray-100 top-0 h-screen"
      >
        <div class="flex pr-2 justify-end">
          <button @click="tog()" class="p-2  text-xl font-bold">
            &#9747;
          </button>
        </div>
        <div
          class="w-full grid grid-cols-4 gap-3 pl-4 justity-items-auto text-3xl"
        >
          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>
          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>

          <div class="col-span-4 row-span-6 bg-yellow-300 invisible">X</div>

          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3 cursor-pointer" @click="openPlayer">Player</div>
          <div class="col-span-4 invisible">X</div>
          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3 cursor-pointer" @click="openSetup">Setup</div>
          <div class="col-span-4 invisible">X</div>
          <div class="col-span-1 justify-self-center">X</div>
          <div class="col-span-3">Scorecard</div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {currentUser, getUserDetails } from "./utilities/bridges/auth"
import {getMatch} from "./utilities/bridges/match"
export default {
  name: "app",
  data() {
    return {
      // open: false,
    };
  },
  computed: {
    open() {
      return this.$store.state.navOpen;
    },
  },
  methods: {
    tog() {
      console.log("hey");
      // this.open = !this.open;
      this.$store.dispatch("toggleNavOpen");
    },
    openPlayer() {
      this.$router.push('/player');
      this.$store.dispatch("toggleNavOpen");

    },
    openSetup() {
      this.$router.push('/');
      this.$store.dispatch("toggleNavOpen");

    },
  },
  async created() {
    document.title = "Golf Bets";

    // get user from supabase.auth
    const user = currentUser();
    if (user) {
    this.$store.dispatch("setUser", user)

     // get user details
    const {data, error} = await getUserDetails(user.id)
    if (error) {
      console.error(error)
    }
    if (data) {
      this.$store.dispatch("setUserDetails", data)

      if (data.active_match) {
        console.log(data.active_match)

        const match = await getMatch(data.active_match)
        console.log(match)
      }
    }
    }
    
    //just leaving this here to remind me i have this global property
    console.log(this.$hostname);
   
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
