import { i as __toESM } from "../_runtime.mjs";
import { p as issues } from "./seed-hHAB4DA0.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { t as ConfidenceBadge } from "./confidence-OOyq3HkB.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/issues.index-B99WrL-W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		id: "all",
		label: "All open"
	},
	{
		id: "confirmed",
		label: "Confirmed"
	},
	{
		id: "supported_hypothesis",
		label: "Hypotheses"
	},
	{
		id: "opportunity",
		label: "Opportunities"
	},
	{
		id: "dismissed",
		label: "Dismissed"
	}
];
function IssuesList() {
	const overrides = useAppStore((s) => s.issueOverrides);
	const [tab, setTab] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		return issues.map((iss) => ({
			iss,
			status: overrides[iss.id]?.status ?? "open"
		})).filter(({ iss, status }) => {
			if (tab === "dismissed") return status === "dismissed" || status === "snoozed";
			if (status !== "open" && status !== "exported") return false;
			if (tab === "all") return true;
			return iss.classification === tab;
		}).sort((a, b) => b.iss.priorityScore - a.iss.priorityScore);
	}, [overrides, tab]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Issues",
			title: "Evidence-backed backlog",
			description: "Confirmed technical issues are separated from supported hypotheses. Priority is backlog ordering, not predicted revenue."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: tab === t.id ? "default" : "outline",
				onClick: () => setTab(t.id),
				children: t.label
			}, t.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [rows.map(({ iss, status }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/issues/$issueId",
				params: { issueId: iss.id },
				className: "block rounded-xl border border-border bg-card p-4 hover:bg-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: iss.priorityScore.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: iss.classification === "confirmed" ? "caution" : iss.classification === "opportunity" ? "outline" : "steel",
								children: iss.classification.replace("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { value: iss.evidenceStrength }),
							status !== "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: status
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-medium",
						children: iss.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							iss.affectedProductIds.length,
							" products · ",
							iss.affectedIntentIds.length,
							" intents · effort ",
							iss.effort,
							" · risk ",
							iss.risk
						]
					})
				]
			}, iss.id)), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Nothing in this tab."
			}) : null]
		})
	] });
}
//#endregion
export { IssuesList as component };
