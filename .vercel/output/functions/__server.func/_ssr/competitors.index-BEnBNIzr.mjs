import { a as brands, g as observations, y as rankCredit } from "./seed-hHAB4DA0.mjs";
import { i as formatPct } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/competitors.index-BEnBNIzr.js
var import_jsx_runtime = require_jsx_runtime();
function CompetitorsList() {
	const statusMap = useAppStore((s) => s.competitorStatus);
	const setStatus = useAppStore((s) => s.setCompetitorStatus);
	const rows = brands.filter((b) => b.id !== "ridgeway").map((b) => {
		const status = statusMap[b.id] ?? b.status;
		let credit = 0;
		let wins = 0;
		for (const o of observations) {
			const m = o.mentions.find((x) => x.brandId === b.id);
			if (m) {
				credit += m.rankCredit;
				if (m.rank === 1) wins += 1;
			}
		}
		return {
			brand: b,
			status,
			credit,
			wins
		};
	}).sort((a, b) => b.credit - a.credit);
	const totalCredit = rows.filter((r) => r.status === "approved" && r.brand.entityType === "competitor_brand").reduce((s, r) => s + r.credit, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Competitors",
			title: "Approved set and candidates",
			description: "Auto-detected entities stay candidates until you approve them. Retailers are classified separately and excluded from brand share unless you choose a retailer view."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map(({ brand, status, credit, wins }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl border border-border bg-card p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/competitors/$brandId",
									params: { brandId: brand.id },
									className: "font-medium hover:text-primary",
									children: brand.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: brand.entityType.replace("_", " ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: status === "approved" ? "positive" : status === "ignored" ? "outline" : "caution",
									children: status
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: brand.discoveryReason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [brand.domain, brand.aliases.length ? ` · ${brand.aliases.join(", ")}` : ""]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm sm:text-right",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular",
								children: [
									brand.entityType === "competitor_brand" && status === "approved" && totalCredit ? formatPct(credit / (totalCredit + observations.filter((o) => o.mentions.some((m) => m.brandId === "ridgeway")).reduce((s, o) => s + (o.mentions.find((m) => m.brandId === "ridgeway")?.rankCredit ?? 0), 0)), 0) : "—",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "share"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									wins,
									" first-position mentions · credit ",
									credit.toFixed(1)
								]
							}),
							brand.entityType !== "merchant_brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-2 sm:justify-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: status === "approved" ? "default" : "outline",
									onClick: () => {
										setStatus(brand.id, "approved");
										toast("Competitor approved — included in share denominator");
									},
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => {
										setStatus(brand.id, "ignored");
										toast("Ignored — excluded from official set");
									},
									children: "Ignore"
								})]
							}) : null
						]
					})]
				})
			}, brand.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs text-muted-foreground",
			children: [
				"Rank credit = 1 / log2(rank + 1). Unresolved entities are excluded. ",
				rankCredit(1).toFixed(2),
				" at rank 1."
			]
		})
	] });
}
//#endregion
export { CompetitorsList as component };
