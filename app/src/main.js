import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

Vue.config.productionTip = false;

async function init() {
  await store.dispatch("initOnLoad");
  console.log(store.getters.match, store.state.match.match);
  if (store.getters.match.status === "playing") {
    console.log("match status: playing");
    // stores.dispatch("initScores");
  }

  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}

init();
