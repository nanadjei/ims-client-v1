import { Products } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/products",
    component: Products,
    name: "products",
    meta: {
      middleware: [auth]
    },
  },
];
