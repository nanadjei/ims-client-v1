import Axios from "axios";
import Cookie from "js-cookie";

import { isAuthUserValid, logout } from "./authentication";

function HttpRequest({ url, type = "get", data = {}, user }) {
  if (isAuthUserValid(localStorage.getItem("jwt"))) {
    // Send request to server
    return sendRequest({ url, type, data, user });
  }
  // redirect to login
  return logout();
}

function sendRequest({
  url,
  type = type,
  data = {},
  user = "customer",
  application = "application/json",
}) {
  let response = null;
  const axiosInstance = Axios.create({
    baseURL:
      user === "admin" ? process.env.VUE_APP_API
        : process.env.BACKEND_CUSTOMER_API,
    timeout: 180000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": application,
    },
  });

  switch (type) {
    case "get":
      response = axiosInstance.get(url, { params: data });
      break;
    case "post":
      response = axiosInstance.post(url, data);
      break;
    case "put":
      response = axiosInstance.put(url, data);
      break;
    case "delete":
      response = axiosInstance.delete(url, data);
      break;
    default:
      break;
  }

  if (response) {
    response.catch((error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.removeItem("user");
          localStorage.removeItem("jwt");
          Cookie.remove("user_type");
          window.vm.$store.commit("auth/SET_SESSION_HAS_EXPIRED", true);
          window.vm.$router.push({ name: "login" });
        }
      }
    });
  }

  return response;
}

export default HttpRequest;
