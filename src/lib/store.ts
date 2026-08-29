import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CompetitorStatus, Experiment, IssueStatus, PublicAudit } from "./types";
import { experiments as seedExperiments } from "./data/seed";

export type IntentOverride = {
  pinned?: boolean;
  archived?: boolean;
  weight?: number;
};

export type IssueOverride = {
  status: IssueStatus;
  reason?: string;
};

type AppState = {
  audits: PublicAudit[];
  intentOverrides: Record<string, IntentOverride>;
  competitorStatus: Record<string, CompetitorStatus>;
  issueOverrides: Record<string, IssueOverride>;
  extraExperiments: Experiment[];
  experimentOverrides: Record<string, Partial<Experiment>>;
  brandAliases: string[];
  signalFilter: "all" | "S2" | "S3" | "S5";
  providerFilter: "all" | string;
  addAudit: (audit: PublicAudit) => void;
  setIntentOverride: (id: string, patch: IntentOverride) => void;
  setCompetitorStatus: (id: string, status: CompetitorStatus) => void;
  setIssueOverride: (id: string, patch: IssueOverride) => void;
  addExperiment: (exp: Experiment) => void;
  patchExperiment: (id: string, patch: Partial<Experiment>) => void;
  setSignalFilter: (v: AppState["signalFilter"]) => void;
  setProviderFilter: (v: string) => void;
  setBrandAliases: (aliases: string[]) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      audits: [],
      intentOverrides: {},
      competitorStatus: {},
      issueOverrides: {},
      extraExperiments: [],
      experimentOverrides: {},
      brandAliases: ["Ridgeway", "Ridgeway Footwear"],
      signalFilter: "all",
      providerFilter: "all",
      addAudit: (audit) => set((s) => ({ audits: [audit, ...s.audits].slice(0, 12) })),
      setIntentOverride: (id, patch) =>
        set((s) => ({
          intentOverrides: { ...s.intentOverrides, [id]: { ...s.intentOverrides[id], ...patch } },
        })),
      setCompetitorStatus: (id, status) =>
        set((s) => ({ competitorStatus: { ...s.competitorStatus, [id]: status } })),
      setIssueOverride: (id, patch) =>
        set((s) => ({
          issueOverrides: { ...s.issueOverrides, [id]: { ...s.issueOverrides[id], ...patch } },
        })),
      addExperiment: (exp) => set((s) => ({ extraExperiments: [exp, ...s.extraExperiments] })),
      patchExperiment: (id, patch) =>
        set((s) => ({
          experimentOverrides: {
            ...s.experimentOverrides,
            [id]: { ...s.experimentOverrides[id], ...patch },
          },
        })),
      setSignalFilter: (signalFilter) => set({ signalFilter }),
      setProviderFilter: (providerFilter) => set({ providerFilter }),
      setBrandAliases: (brandAliases) => set({ brandAliases }),
    }),
    { name: "vitrine-workspace" },
  ),
);

export function allExperiments(extra: Experiment[], overrides: Record<string, Partial<Experiment>>) {
  return [...extra, ...seedExperiments].map((e) => ({ ...e, ...overrides[e.id] }));
}
