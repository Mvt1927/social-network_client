import URI from "urijs";

export const SERVER_BASE_URL = "http://localhost:3333/";

export const SERVER_API_URL = URI(SERVER_BASE_URL).directory("api/v1").toString();

export const SERVER_TIMEOUT = 1000;