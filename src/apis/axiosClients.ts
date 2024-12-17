import { SERVER_API_URL, SERVER_TIMEOUT } from "@/utils/base.util";

import axios from "axios";

export const AXIOS = axios.create({
  baseURL: SERVER_API_URL,
  timeout: SERVER_TIMEOUT + 4000,
  headers: {
    "Content-Type": "application/json",
  },
});
