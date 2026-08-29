import type { ConfidenceLabel, Observation } from "./types";

export function rankCredit(rank: number) {
  return 1 / Math.log2(rank + 1);
}

export function mean(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

export function jeffreysInterval(successes: number, trials: number) {
  const s = successes + 0.5;
  const f = trials - successes + 0.5;
  const p = s / (s + f);
  const variance = (s * f) / ((s + f) ** 2 * (s + f + 1));
  const se = Math.sqrt(variance) * 1.96;
  return {
    p,
    lower: Math.max(0, p - se),
    upper: Math.min(1, p + se),
  };
}

export function inclusionRate(obs: Observation[], weights?: Map<string, number>) {
  if (obs.length === 0) return { rate: 0, lower: 0, upper: 0, n: 0 };
  let num = 0;
  let den = 0;
  let successes = 0;
  for (const o of obs) {
    const w = weights?.get(o.intentId) ?? 1;
    num += w * (o.merchantIncluded ? 1 : 0);
    den += w;
    if (o.merchantIncluded) successes += 1;
  }
  const interval = jeffreysInterval(successes, obs.length);
  return { rate: den === 0 ? 0 : num / den, lower: interval.lower, upper: interval.upper, n: obs.length };
}

export function merchantLinkShare(obs: Observation[]) {
  const recs = obs.filter((o) => o.merchantIncluded);
  if (recs.length === 0) return 0;
  return recs.filter((o) => o.merchantLink).length / recs.length;
}

export function citationShare(obs: Observation[]) {
  if (obs.length === 0) return 0;
  return obs.filter((o) => o.citedMerchant).length / obs.length;
}

export function recommendationShare(obs: Observation[], approvedBrandIds: Set<string>, merchantBrandId: string) {
  let merchant = 0;
  let total = 0;
  for (const o of obs) {
    for (const m of o.mentions) {
      if (!m.resolved || !m.brandId) continue;
      if (m.brandId !== merchantBrandId && !approvedBrandIds.has(m.brandId)) continue;
      total += m.rankCredit;
      if (m.brandId === merchantBrandId) merchant += m.rankCredit;
    }
  }
  return total === 0 ? 0 : merchant / total;
}

export function intentCovered(obs: Observation[]) {
  if (obs.length === 0) return false;
  const { rate, n } = inclusionRate(obs);
  const successes = obs.filter((o) => o.merchantIncluded).length;
  const interval = jeffreysInterval(successes, n);
  return obs.some((o) => o.merchantIncluded) && interval.lower >= 0.05;
}

export function evidenceStrength(input: {
  coverage: number;
  consistency: number;
  sourceQuality: number;
  identityConfidence: number;
}) {
  return input.coverage * input.consistency * input.sourceQuality * input.identityConfidence;
}

export function evidenceLabel(score: number): ConfidenceLabel {
  if (score >= 0.75) return "high";
  if (score >= 0.5) return "medium";
  if (score >= 0.25) return "low";
  return "insufficient";
}

export function priorityScore(input: {
  expectedImpact: number;
  evidenceStrength: number;
  businessWeight: number;
  effort: number;
  risk: number;
}) {
  return (
    (input.expectedImpact * input.evidenceStrength * input.businessWeight) /
    Math.max(input.effort * input.risk, 0.25)
  );
}

export function visibilityScore(inclusion: number, avgRankCredit: number) {
  const rankNorm = Math.min(1, avgRankCredit / rankCredit(1));
  return 100 * (0.65 * inclusion + 0.35 * rankNorm);
}

export function agentRankIndex(input: {
  visibility: number;
  coverage: number;
  readiness: number;
  sourcePresence: number;
  intentCount: number;
  adapterCount: number;
  observationCount: number;
  panelCoverage: number;
}) {
  const eligible =
    input.intentCount >= 20 &&
    input.adapterCount >= 2 &&
    input.observationCount >= 60 &&
    input.panelCoverage >= 0.8;
  if (!eligible) return { value: null as number | null, label: "unavailable" as const };
  const value =
    0.45 * input.visibility +
    0.25 * input.coverage +
    0.20 * input.readiness +
    0.10 * input.sourcePresence;
  const label = input.observationCount >= 180 ? "high" : input.observationCount >= 90 ? "moderate" : "provisional";
  return { value, label };
}

export const SIGNAL_META: Record<
  "S1" | "S2" | "S3" | "S4" | "S5" | "S6",
  { name: string; short: string; fidelity: string }
> = {
  S1: {
    name: "Native observed channel data",
    short: "Native",
    fidelity: "Highest for that channel",
  },
  S2: {
    name: "Official catalog retrieval",
    short: "Catalog",
    fidelity: "High for retrieval, not final re-ranking",
  },
  S3: {
    name: "Provider API probe",
    short: "API probe",
    fidelity: "Lab sample — not the consumer UI",
  },
  S4: {
    name: "Referral / outcome observation",
    short: "Outcomes",
    fidelity: "High for observed outcome; intent may be unknown",
  },
  S5: {
    name: "Deterministic readiness audit",
    short: "Audit",
    fidelity: "High for the issue; indirect for visibility",
  },
  S6: {
    name: "Comparative / inferred evidence",
    short: "Hypothesis",
    fidelity: "Directional; requires a caveat",
  },
};

export const READINESS_WEIGHTS: Record<string, number> = {
  identity: 15,
  core: 15,
  taxonomy: 10,
  decision: 20,
  variants: 10,
  offer: 10,
  policy: 10,
  machine: 10,
};

export function catalogReadiness(componentScores: Record<string, number>) {
  let num = 0;
  let den = 0;
  for (const [key, weight] of Object.entries(READINESS_WEIGHTS)) {
    if (componentScores[key] === undefined) continue;
    num += weight * componentScores[key];
    den += weight;
  }
  return den === 0 ? 0 : num / den;
}
