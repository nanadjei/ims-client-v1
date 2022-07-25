import { Dashboard } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/",
    component: Dashboard,
    name: "dashboard",
    meta: {
      middleware: [auth]
    },
  },
];
