import { PLAN_IDS } from "../config/product";

export const PLAN_LEVEL = Object.freeze({
  [PLAN_IDS.FREE]: 0,
  [PLAN_IDS.EDGE]: 1,
  [PLAN_IDS.FULL]: 2,
});

export const PLANS = Object.freeze({
  [PLAN_IDS.FREE]: {
    id: PLAN_IDS.FREE,
    label: "FREE",
    paid: false,
  },
  [PLAN_IDS.EDGE]: {
    id: PLAN_IDS.EDGE,
    label: "EDGE",
    paid: true,
  },
  [PLAN_IDS.FULL]: {
    id: PLAN_IDS.FULL,
    label: "FULL",
    paid: true,
  },
});

export function normalizePlan(plan) {
  return PLANS[plan] ? plan : PLAN_IDS.FREE;
}

export function hasRequiredPlan(currentPlan, requiredPlan = PLAN_IDS.FREE) {
  return PLAN_LEVEL[normalizePlan(currentPlan)] >= PLAN_LEVEL[normalizePlan(requiredPlan)];
}