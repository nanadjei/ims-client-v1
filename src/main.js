import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Toast from "vue-toastification";
Vue.prototype.$http = axios;
Vue.prototype.$moment = require("moment");

window.$ = window.jQuery = require("jquery");

import "bootstrap";
import "@/assets/css/sb-admin-2.min.css";
import "@/assets/css/custom.css";
import "@/assets/js/sb-admin-2.min.js";
import "@/assets/fontawesome-free/css/all.min.css";

/**
 * PLUGINS
 *
 * Vee-validate plugin
 * */
import "@/app/plugins/vee-validate";
/** Toast */
import "@/assets/css/toast.css";
Vue.use(Toast, { timeout: 2000 });

/** Vue Modal */
import VModal from "vue-js-modal";
import "vue-js-modal/dist/styles.css";
Vue.use(VModal);

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
