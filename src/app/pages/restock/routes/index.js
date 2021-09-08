import { Restock } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/products/restock",
    component: Restock,
    name: "restock",
    meta: {
      middleware: [auth],
    },
  },
];
