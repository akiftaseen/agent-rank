import { _ as productById, l as intentById } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, n as formatDate } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$6 } from "./router-D3pbkcWL.mjs";
import { n as useAppStore, t as allExperiments } from "./store-HrZjQYby.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiments._experimentId-C7k4Lvw4.js
var import_jsx_runtime = require_jsx_runtime();
function ExperimentDetail() {
	const { experimentId } = Route$6.useParams();
	const extra = useAppStore((s) => s.extraExperiments);
	const overrides = useAppStore((s) => s.experimentOverrides);
	const patch = useAppStore((s) => s.patchExperiment);
	const exp = allExperiments(extra, overrides).find((e) => e.id === experimentId);
	if (!exp) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Experiment not found." });
	const did = exp.postValue != null && exp.controlPre != null && exp.controlPost != null ? exp.postValue - exp.preValue - (exp.controlPost - exp.controlPre) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Experiment",
			title: exp.name,
			description: exp.hypothesis,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/experiments",
					children: "Ledger"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: exp.status }), exp.resultLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: exp.resultLabel === "positive_directional" ? "positive" : "outline",
				children: exp.resultLabel.replaceAll("_", " ")
			}) : null]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-8 grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					label: "Primary metric",
					value: exp.primaryMetric
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					label: "Expected direction",
					value: exp.expectedDirection
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					label: "Baseline",
					value: `${formatDate(exp.baselineStart)} – ${formatDate(exp.baselineEnd)}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
					label: "Implementation",
					value: exp.implementationAt ? formatDate(exp.implementationAt) : "Not marked"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Treatment pre",
					value: formatPct(exp.preValue, 1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Treatment post",
					value: exp.postValue == null ? "—" : formatPct(exp.postValue, 1)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Diff-in-diff",
					value: did == null ? "—" : `${did >= 0 ? "+" : ""}${(did * 100).toFixed(1)} pp`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-sm leading-relaxed text-muted-foreground",
			children: exp.resultSummary
		}),
		exp.confounders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-lg border border-border bg-elevated p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Confounders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 list-disc pl-4 text-sm text-muted-foreground",
				children: exp.confounders.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: c }, c))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Treatment"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: [
				"Products:",
				" ",
				exp.treatmentProductIds.map((id) => productById(id)?.title ?? id).join(", ") || "—"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: ["Intents: ", exp.treatmentIntentIds.map((id) => intentById(id)?.text ?? id).join(" · ") || "—"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: ["Controls: ", exp.controlIntentIds.map((id) => intentById(id)?.text ?? id).join(" · ") || "none — weak causal evidence"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-2",
			children: [
				exp.status === "baseline" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						patch(exp.id, {
							status: "running",
							implementationAt: (/* @__PURE__ */ new Date()).toISOString(),
							postStart: (/* @__PURE__ */ new Date()).toISOString(),
							resultSummary: "Implementation marked. Post-window probes will use the same panel, adapters, and locale."
						});
						toast("Implementation recorded. Shopify writes still happen outside Vitrine.");
					},
					children: "Mark implemented"
				}) : null,
				exp.status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						patch(exp.id, {
							status: "completed",
							resultLabel: "inconclusive",
							postEnd: (/* @__PURE__ */ new Date()).toISOString(),
							resultSummary: "Closed as inconclusive — post window shorter than 14 days or sample coverage insufficient. Not a negative result."
						});
						toast("Closed as inconclusive");
					},
					children: "Close as inconclusive"
				}) : null,
				exp.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => patch(exp.id, { status: "closed" }),
					children: "Adopt / close"
				}) : null
			]
		})
	] });
}
function Item({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 text-sm",
		children: value
	})] });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card px-4 py-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-2xl tabular",
			children: value
		})]
	});
}
//#endregion
export { ExperimentDetail as component };
