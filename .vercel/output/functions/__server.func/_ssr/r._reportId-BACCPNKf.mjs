import { S as workspace, h as metrics, p as issues } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, o as formatScore } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route$10 } from "./router-D3pbkcWL.mjs";
import { t as SignalBadge } from "./signal-badge-B2uRkP24.mjs";
import { t as Logo } from "./logo-pQHtdvOu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/r._reportId-BACCPNKf.js
var import_jsx_runtime = require_jsx_runtime();
function SharedReport() {
	const { reportId } = Route$10.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-3xl items-center justify-between px-4 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app",
					children: "Workspace"
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "mx-auto max-w-3xl px-4 pb-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
					children: [
						"Shared report · ",
						reportId,
						" · noindex"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-4xl",
					children: [workspace.storeName, " baseline"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Window 1–29 Aug 2026 · panel v1 · scoring v1.0 · locale en-US"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Index",
							value: metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Inclusion",
							value: formatPct(metrics.inclusion.rate, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Readiness",
							value: formatScore(metrics.readiness, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Coverage",
							value: formatPct(metrics.coverage, 0)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, {
							code: "S2",
							showName: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, {
							code: "S3",
							showName: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, {
							code: "S5",
							showName: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-10 font-display text-2xl",
					children: "Priority issues"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: issues.slice(0, 5).map((iss) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-card px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: iss.classification.replace("_", " ")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: iss.title
						})]
					}, iss.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10 rounded-lg border border-border bg-elevated p-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: "Limitations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 list-disc space-y-1 pl-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Provider API probes are lab samples, not consumer ChatGPT or Perplexity ranking." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Index is not comparable across unrelated categories." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "No S1 native channel data or S4 referral outcomes in this report." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Directional experiment labels are not causal proof." })
						]
					})]
				})
			]
		})]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl tabular",
			children: value
		})]
	});
}
//#endregion
export { SharedReport as component };
