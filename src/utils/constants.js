//DEVELOPMENT
// export const BASE_URL = "http://localhost:4000";

//PRODUCTION:
// export const BASE_URL = "/api";

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:4000" : "/api";