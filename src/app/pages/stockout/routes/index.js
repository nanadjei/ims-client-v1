import { Stockout } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/products/stockout",
    component: Stockout,
    name: "stockout",
    meta: {
      middleware: [auth]
    },
  },
];
