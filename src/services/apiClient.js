import { ENV } from "../config/env";
import { PRODUCT } from "../config/product";

const DEFAULT_TIMEOUT_MS = 10_000;

export async function apiRequest(path, options = {}) {
  if (!ENV.apiBaseUrl) {
    throw new Error("API não configurada. Defina VITE_API_BASE_URL.");
  }

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs || DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${ENV.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-StackUp-Product": PRODUCT.id,
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204) return null;
    return response.json();
  } finally {
    window.clearTimeout(timeout);
  }
}