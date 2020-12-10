import { SalesReport } from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/sales/report",
    component: SalesReport,
    name: "sales-report",
    meta: {
      middleware: [auth]
    },
  },
];
