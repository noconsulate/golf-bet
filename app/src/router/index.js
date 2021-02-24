import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Join from "../views/Join.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/join",
    name: "Join",
    component: Join,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
