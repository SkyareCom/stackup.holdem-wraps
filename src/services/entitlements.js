import { PLAN_IDS } from "../config/product";
import { hasRequiredPlan, normalizePlan } from "../domain/plans";

export function canAccessTraining(session, trainingModule) {
  const currentPlan = normalizePlan(session?.plan || PLAN_IDS.FREE);
  return hasRequiredPlan(currentPlan, trainingModule?.requiredPlan);
}

export function getEntitlementSnapshot(session) {
  return {
    productPlan: normalizePlan(session?.plan || PLAN_IDS.FREE),
    authenticated: Boolean(session?.authenticated),
  };
}