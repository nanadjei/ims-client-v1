import Vue from "vue";
import Vuex from "vuex";
import auth from "@/app/auth/store";
import dashboard from "@/app/pages/dashboard/store";
import cashsales from "@/app/pages/cash-sales/store";
import salesReport from "@/app/pages/sales-report/store";
import stockout from "@/app/pages/stockout/store";
import restock from "@/app/pages/restock/store";
import replenished from "@/app/pages/replenished-items/store";
import productExpirations from "@/app/pages/product-expirations/store";

import products from "@/app/pages/products/store";
import createPersistedState from "vuex-persistedstate";
// import * as Cookies from "js-cookie";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { 
    auth, 
    dashboard, 
    cashsales, 
    salesReport, 
    stockout, 
    products, 
    restock, 
    replenished,
    productExpirations 
  },
  plugins: [
    createPersistedState(),
  ],
});
