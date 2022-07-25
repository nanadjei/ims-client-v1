/** For unauthenticated users */
import { authCheck } from "@/app/helpers/authentication";
export default function guest({ next }) {
  if (!localStorage.getItem("jwt") || !authCheck(["super admin", "staff"])) {
    return next();
  }
  return next({ name: "dashboard" });
}
