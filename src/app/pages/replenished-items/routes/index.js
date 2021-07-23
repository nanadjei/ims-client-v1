import { ReplenishedItems } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/products/replenished",
    component: ReplenishedItems,
    name: "replenished-items",
    meta: {
      middleware: [auth],
    },
  },
];
