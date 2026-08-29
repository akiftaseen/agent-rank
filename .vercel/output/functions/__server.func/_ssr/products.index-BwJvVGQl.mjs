import { i as __toESM } from "../_runtime.mjs";
import { m as lineLabel, v as products } from "./seed-hHAB4DA0.mjs";
import { o as formatScore, s as formatUsd } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toneForScore, t as ScoreBar } from "./score-bar-DX7xoLrg.mjs";
import { t as Input } from "./input-A3CXwO9O.mjs";
import { t as ProductMark } from "./product-mark-qv2n3iks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products.index-BwJvVGQl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductsList() {
	const [q, setQ] = (0, import_react.useState)("");
	const [line, setLine] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => products.filter((p) => line === "all" ? true : p.line === line).filter((p) => p.title.toLowerCase().includes(q.toLowerCase())).slice().sort((a, b) => a.readiness - b.readiness), [q, line]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Products",
			title: "Catalog with provenance",
			description: "Readiness is category-aware. Products are not penalized for fields that do not apply. Equal average — revenue weights need an outcomes integration."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Filter products",
				className: "sm:max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					"all",
					"trail",
					"road",
					"hike",
					"recovery"
				].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: line === l ? "default" : "outline",
					onClick: () => setLine(l),
					children: l === "all" ? "All lines" : lineLabel(l)
				}, l))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: rows.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/products/$productId",
				params: { productId: p.id },
				className: "rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductMark, {
								tint: p.tint,
								line: p.line
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										p.productType,
										" · ",
										p.variantCount,
										" variants · ",
										formatUsd(p.priceFrom)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl tabular",
								children: formatScore(p.readiness, 0)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
						className: "mt-3",
						value: p.readiness,
						tone: toneForScore(p.readiness)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: lineLabel(p.line)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: p.offerFreshness === "conflict" ? "danger" : p.offerFreshness === "stale" ? "caution" : "outline",
							children: p.offerFreshness
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: ["Top gap: ", p.topGap]
					})
				]
			}, p.id))
		})
	] });
}
//#endregion
export { ProductsList as component };
