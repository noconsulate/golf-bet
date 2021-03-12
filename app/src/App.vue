<template>
  <div id="app">
    <div
      class="relative h-screen w-screen container mx-auto  md:w-1/2 lg:w-1/3"
    >
      <button
        @click="tog()"
        class="text-black text-2xl p-2 font-bold absolute top-0 right-0"
      >
        &#9776;
      </button>
      <router-view class="" />
    </div>
    <nav
      :class="open ? 'navbar-open' : 'navbar-close'"
      class="navbar w-64 absolute overflow-x-scroll bg-gray-700 top-0 h-screen"
    >
      <div class="flex pr-2 justify-end">
        <button @click="tog()" class="p-2 text-white text-xl font-bold">
          &#9747;
        </button>
      </div>
      <h1 class="text-xl text-center font-bold pt-5">Menu</h1>
      <ul class="list-none text-white text-center">
        <li class="my-8"><a href="#"></a>Teams</li>
        <li class="my-8"><a href="#"></a>Projects</li>
        <li class="my-8"><a href="#"></a>Favourites</li>
        <li class="my-8"><a href="#"></a>Notifications</li>
        <li class="my-8"><a href="#"></a>Members</li>
      </ul>
    </nav>
  </div>
</template>

<script>
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
  },
  created() {
    document.title = "Golf Bets";
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
