import { s as experiments } from "./seed-hHAB4DA0.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-HrZjQYby.js
var useAppStore = create()(persist((set) => ({
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
	setIntentOverride: (id, patch) => set((s) => ({ intentOverrides: {
		...s.intentOverrides,
		[id]: {
			...s.intentOverrides[id],
			...patch
		}
	} })),
	setCompetitorStatus: (id, status) => set((s) => ({ competitorStatus: {
		...s.competitorStatus,
		[id]: status
	} })),
	setIssueOverride: (id, patch) => set((s) => ({ issueOverrides: {
		...s.issueOverrides,
		[id]: {
			...s.issueOverrides[id],
			...patch
		}
	} })),
	addExperiment: (exp) => set((s) => ({ extraExperiments: [exp, ...s.extraExperiments] })),
	patchExperiment: (id, patch) => set((s) => ({ experimentOverrides: {
		...s.experimentOverrides,
		[id]: {
			...s.experimentOverrides[id],
			...patch
		}
	} })),
	setSignalFilter: (signalFilter) => set({ signalFilter }),
	setProviderFilter: (providerFilter) => set({ providerFilter }),
	setBrandAliases: (brandAliases) => set({ brandAliases })
}), { name: "vitrine-workspace" }));
function allExperiments(extra, overrides) {
	return [...extra, ...experiments].map((e) => ({
		...e,
		...overrides[e.id]
	}));
}
//#endregion
export { useAppStore as n, allExperiments as t };
