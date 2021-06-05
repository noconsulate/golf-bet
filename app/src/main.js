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
  const user = currentUser();
  console.log(user);

  if (user) {
    store.dispatch("setUser", user);

    const { data, error } = await getUserDetails(user.id);
    if (error) {
      console.error(error);
    }
    if (data) {
      store.dispatch("setUserDetails", data);

      // if active match, get match now
      if (data.active_match) {
        console.log("ATTN DEV: GET MATCH INFO HERE?");
        // await getMatch(data.active_match);
      }
    }
  } else {
    console.log("no user");
  }

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

init();
