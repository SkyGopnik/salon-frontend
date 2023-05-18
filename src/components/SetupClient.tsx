"use client";

import axios from "axios";

export default function SetupClient() {
  axios.defaults.baseURL = "https://api.salonykrasotyonline.ru/";

  return null;
}
