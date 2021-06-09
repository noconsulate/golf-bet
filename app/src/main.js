import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

import { currentUser, getUserDetails } from "./utilities/bridges/auth";
import { getMatch } from "./utilities/bridges/match";

Vue.config.productionTip = false;
// Vue.prototype.$hostname = Vue.config.productionTip
//   ? "https://golf-bets.web.app/"
//   : "http://localhost:8080";

async function init() {
  store.dispatch("getAndSetUser");

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

init();
