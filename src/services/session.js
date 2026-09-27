import { PLAN_IDS, PRODUCT } from "../config/product";
import { normalizePlan } from "../domain/plans";

const STORAGE_KEY = `stackup:${PRODUCT.id}:session`;

const GUEST_SESSION = Object.freeze({
  stackupId: null,
  nickname: "CH_GRINDER",
  initials: "CH",
  plan: PLAN_IDS.FREE,
  authenticated: false,
});

export function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return GUEST_SESSION;

    const parsed = JSON.parse(raw);
    return {
      ...GUEST_SESSION,
      ...parsed,
      plan: normalizePlan(parsed.plan),
      authenticated: Boolean(parsed.stackupId),
    };
  } catch {
    return GUEST_SESSION;
  }
}

export function writeSession(session) {
  const normalized = {
    ...GUEST_SESSION,
    ...session,
    plan: normalizePlan(session?.plan),
    authenticated: Boolean(session?.stackupId),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}