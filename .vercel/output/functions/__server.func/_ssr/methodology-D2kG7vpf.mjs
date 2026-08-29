import { n as SIGNAL_META, r as adapters, t as READINESS_WEIGHTS, y as rankCredit } from "./seed-hHAB4DA0.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as SignalBadge } from "./signal-badge-B2uRkP24.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/methodology-D2kG7vpf.js
var import_jsx_runtime = require_jsx_runtime();
function MethodologyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Methodology v1.0",
				title: "How evidence is graded",
				description: "Formulas are versioned. Historical trends recompute with the scoring version in force at the time. This page is the source of labels used in the product."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Signal classes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: Object.keys(SIGNAL_META).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-card px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: SIGNAL_META[code].name
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: SIGNAL_META[code].fidelity
					})]
				}, code))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Adapters in this workspace"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: adapters.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-card px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { code: a.signalClass }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: a.surface
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: a.approximatesConsumer ? "Approximates a consumer surface" : "Does not approximate the consumer product UI"
					})]
				}, a.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Sampling"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted-foreground",
				children: "Priority intents: 3 repetitions per adapter, staggered. Exploratory intents: 1 repetition, low confidence. Minimum for a provisional aggregate: 20 intents, 2 adapters, 60 successful observations. Provider errors are not counted as non-inclusion."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Scores"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Rank credit"
						}),
						" at 1-indexed rank r is 1 / log2(r + 1). Rank 1 = ",
						rankCredit(1).toFixed(3),
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "Inclusion rate"
					}), " is a weighted mean of merchant inclusion on the approved panel. Intervals use a Jeffreys beta approximation."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-foreground",
							children: "Catalog readiness"
						}),
						" uses category profiles. Component weights:",
						Object.entries(READINESS_WEIGHTS).map(([k, w]) => ` ${k} ${w}`).join(" ·"),
						". N/A fields are excluded from the denominator."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "Vitrine Index"
					}), " = 0.45 visibility + 0.25 coverage + 0.20 readiness + 0.10 source presence. Shown only above coverage thresholds. Never compared across unrelated categories as a percentile. Excludes referral traffic and revenue."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "Issue priority"
					}), " = impact × evidence strength × business weight / max(effort × risk, 0.25). Backlog ordering only."] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Experiment labels"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "positive_directional / negative_directional — interval mostly off zero, control does not explain it" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "no_detectable_change — narrow interval around zero with adequate coverage" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "inconclusive — sparse samples, panel break, or a blocking confounder" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "“Caused” is not used" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-2xl",
				children: "Known limitations"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "API probes are not the ChatGPT, Gemini, or Perplexity consumer shopping UI." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Repeated API calls can be correlated through caching; intervals are descriptive." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "This demo workspace uses a fixture catalog (Ridgeway) rather than a live Shopify Admin token." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No customer or order scopes. No automated publishing." })
				]
			})
		]
	});
}
//#endregion
export { MethodologyPage as component };
