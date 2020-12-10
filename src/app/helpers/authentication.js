import Cookie from "js-cookie";
import CryptoJS from "crypto-js";

const jwt_decode = require("jwt-decode");

function userExpired(token) {
  const jwt = jwt_decode(token);

  const current_time = Date.now() / 1000;
  if (jwt.exp < current_time) {
    return false;
  }
}
function isAuthUserValid(token) {
  if (token && !userExpired(token)) {
    return true;
  }
  return false;
}

function localUser() {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  }
}

function authCheck($setOfUsers) {
  const jwt = localStorage.getItem("jwt");
  if (jwt && !userExpired(jwt) && $setOfUsers.includes(getUserType())) {
    return true;
  }
  logout();
  return false;
}

function logout() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  Cookie.remove("user_type");
}

function setUserType() {
  if (!Cookie.get("user_type")) {
    if (localStorage.getItem("user")) {
      const type = CryptoJS.AES.encrypt(
        JSON.parse(localStorage.getItem("user")).roles[0].name,
        "point-of-sale"
      ).toString();
      Cookie.set("user_type", type);
      // console.log("Cookie user =", getUserType());
    }
  }
}

function getUserType() {
  const user_type = Cookie.get("user_type");

  if (user_type) {
    var bytes = CryptoJS.AES.decrypt(user_type, "point-of-sale");
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return false;
  }
}

export {
  isAuthUserValid,
  userExpired,
  authCheck,
  logout,
  localUser,
  setUserType,
  getUserType,
};
