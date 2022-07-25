import Vue from "vue";
import Router from "vue-router";
import { routes } from "../app/index";
import store from "@/store/index";

Vue.use(Router);

// console.log(routes);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    store
  };
  return middleware[0]({
    ...context
  });
});
export default router;
