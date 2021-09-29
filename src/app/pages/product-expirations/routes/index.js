import { ProductExpirations} from "../components";
import auth from "@/app/middleware/auth";

export default [
  {
    path: "/products/expirations",
    component: ProductExpirations,
    name: "product-expirations",
    meta: {
      middleware: [auth],
    },
  },
];
