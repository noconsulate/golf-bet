import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

Vue.config.productionTip = false;
Vue.prototype.$hostname = Vue.config.productionTip
  ? "https://hostname"
  : "http://localhost:8080";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
