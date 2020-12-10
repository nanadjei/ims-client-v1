import { Login } from "../components";
import guest from "@/app/middleware/guest";
export default [
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      middleware: [guest]
    }
  }
];
