import { S as workspace, g as observations, h as metrics, p as issues, v as products } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, o as formatScore } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reports-Da6Hc-me.js
var import_jsx_runtime = require_jsx_runtime();
function ReportsPage() {
	function downloadCsv() {
		const header = "observation_id,intent_id,adapter_id,signal_class,observed_at,included,rank,model";
		const lines = observations.map((o) => `${o.id},${o.intentId},${o.adapterId},${o.signalClass},${o.observedAt},${o.merchantIncluded},${o.merchantRank ?? ""},${o.model}`);
		const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "vitrine-observations.csv";
		a.click();
		URL.revokeObjectURL(url);
		toast("CSV exported with raw IDs and timestamps");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Reports",
		title: "Evidence packs",
		description: "Every report includes period, signal coverage, providers, panel version, scoring version, and limitations. Share links are noindex in production."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Executive baseline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						workspace.storeName,
						" · readiness ",
						formatScore(metrics.readiness, 0),
						" · inclusion",
						" ",
						formatPct(metrics.inclusion.rate, 0),
						" · ",
						issues.length,
						" open issues · ",
						products.length,
						" products"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/r/$reportId",
							params: { reportId: "ridgeway-baseline" },
							children: "Open shareable report"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: downloadCsv,
						children: "Export observations CSV"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl",
					children: "Templates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Executive baseline" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Product opportunity" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Experiment result" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Agency client report" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "PDF uses the same data as the web report. Share links expire and can be revoked."
				})
			]
		})]
	})] });
}
//#endregion
export { ReportsPage as component };
