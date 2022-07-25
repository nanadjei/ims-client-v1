// src/middleware/auth.js
import { authCheck } from "@/app/helpers/authentication";
export default function auth({ next }) {
  if (localStorage.getItem("jwt") && authCheck(["super admin", "staff"])) {
    return next();
  }
  return next({ name: "login" });
}
