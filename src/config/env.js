function normalizeUrl(value = "") {
  return String(value).trim().replace(/\/$/, "");
}

export const ENV = Object.freeze({
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
  apiBaseUrl: normalizeUrl(import.meta.env.VITE_API_BASE_URL),
  analyticsEndpoint: normalizeUrl(import.meta.env.VITE_ANALYTICS_ENDPOINT),
  stackupIdUrl: normalizeUrl(import.meta.env.VITE_STACKUP_ID_URL),
});