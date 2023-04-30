"use client";

import axios from "axios";

export default function SetupClient() {
  axios.defaults.baseURL = "http://localhost:6713/";

  return null;
}
