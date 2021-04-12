import Vue from "vue";
import VueRouter from "vue-router";
import Join from "../views/Join.vue";
import Scorecard from "../views/Scorecard.vue";
import Game from "../views/Game.vue";
import Player from "../views/Player.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/join",
    name: "Join",
    component: Join,
  },
  {
    path: "/scorecard",
    name: "scorecard",
    component: Scorecard,
  },
  {
    path: "/",
    name: "game",
    component: Game,
  },
  {
    path: "/player",
    name: "player",
    component: Player,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
