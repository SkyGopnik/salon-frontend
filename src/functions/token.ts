import axios from "axios";

export function setToken(token: string) {
  axios.defaults.headers["Authorization"] = token;
  localStorage.setItem("token", token);
}

export function deleteToken() {
  delete axios.defaults.headers["Authorization"];
  localStorage.removeItem("token");
}

