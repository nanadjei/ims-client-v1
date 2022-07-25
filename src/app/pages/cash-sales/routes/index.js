import { CashSales } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/cash/sales",
    component: CashSales,
    name: "cash-sales",
    meta: {
      middleware: [auth],
    },
  },
];
