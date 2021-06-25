import { Restock } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/restock",
    component: Restock,
    name: "restock",
    meta: {
      middleware: [auth],
    },
  },
];
