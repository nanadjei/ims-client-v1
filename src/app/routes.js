import auth from "./auth/routes";
import dashboard from "./pages/dashboard/routes";
import outofstock from "./pages/stockout/routes";
import cashsales from "./pages/cash-sales/routes";
import salesreport from "./pages/sales-report/routes";
import products from "./pages/products/routes";
import errors from "./errors/routes";

export default [...dashboard, ...cashsales, ...outofstock, ...salesreport, ...products, ...auth, ...errors];
