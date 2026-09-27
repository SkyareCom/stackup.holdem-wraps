import { ENV } from "../config/env";
import { PRODUCT } from "../config/product";

const SESSION_ID_KEY = "stackup:analytics:session-id";

function getSessionId() {
  let value = sessionStorage.getItem(SESSION_ID_KEY);
  if (!value) {
    value = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    sessionStorage.setItem(SESSION_ID_KEY, value);
  }
  return value;
}

export function track(eventName, properties = {}) {
  const event = {
    event: eventName,
    product: PRODUCT.analyticsProduct,
    schema_version: PRODUCT.schemaVersion,
    session_id: getSessionId(),
    occurred_at: new Date().toISOString(),
    ...properties,
  };

  if (ENV.isDev) {
    console.info("[analytics]", event);
  }

  if (!ENV.analyticsEndpoint) return event;

  const payload = JSON.stringify(event);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      ENV.analyticsEndpoint,
      new Blob([payload], { type: "application/json" })
    );
    return event;
  }

  fetch(ENV.analyticsEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});

  return event;
}

export const analytics = Object.freeze({
  appOpen: (props) => track("app_open", props),
  trainingViewed: (props) => track("training_viewed", props),
  trainingStarted: (props) => track("training_started", props),
  navigationSelected: (props) => track("navigation_selected", props),
  pricingViewed: (props) => track("pricing_viewed", props),
});