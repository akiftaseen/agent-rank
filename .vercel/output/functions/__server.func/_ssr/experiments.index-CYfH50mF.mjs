import { n as formatDate } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAppStore, t as allExperiments } from "./store-HrZjQYby.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/experiments.index-CYfH50mF.js
var import_jsx_runtime = require_jsx_runtime();
function ExperimentsList() {
	const extra = useAppStore((s) => s.extraExperiments);
	const overrides = useAppStore((s) => s.experimentOverrides);
	const rows = allExperiments(extra, overrides);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Experiments",
		title: "Intervention ledger",
		description: "Pre-register a hypothesis, freeze the baseline, attach the Shopify diff, then classify the result. “Caused” is prohibited without an approved causal design."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: rows.map((exp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/app/experiments/$experimentId",
			params: { experimentId: exp.id },
			className: "block rounded-xl border border-border bg-card p-4 hover:bg-accent",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: exp.resultLabel === "positive_directional" ? "positive" : exp.resultLabel === "negative_directional" ? "danger" : exp.status === "running" ? "steel" : "outline",
						children: exp.resultLabel?.replaceAll("_", " ") ?? exp.status
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: formatDate(exp.createdAt)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-medium",
					children: exp.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: exp.hypothesis
				})
			]
		}, exp.id))
	})] });
}
//#endregion
export { ExperimentsList as component };
