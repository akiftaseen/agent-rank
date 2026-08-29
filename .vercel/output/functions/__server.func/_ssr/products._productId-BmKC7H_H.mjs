import { _ as productById, d as intents, m as lineLabel, p as issues, t as READINESS_WEIGHTS } from "./seed-hHAB4DA0.mjs";
import { o as formatScore, s as formatUsd } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./router-D3pbkcWL.mjs";
import { n as toneForScore, t as ScoreBar } from "./score-bar-DX7xoLrg.mjs";
import { t as ProductMark } from "./product-mark-qv2n3iks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._productId-BmKC7H_H.js
var import_jsx_runtime = require_jsx_runtime();
function ProductDetail() {
	const { productId } = Route.useParams();
	const product = productById(productId);
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Product not found." });
	const relatedIntents = intents.filter((i) => i.linkedProductIds.includes(product.id));
	const relatedIssues = issues.filter((i) => i.affectedProductIds.includes(product.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: lineLabel(product.line),
			title: product.title,
			description: product.description,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/products",
					children: "All products"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductMark, {
				tint: product.tint,
				line: product.line,
				className: "size-14 rounded-lg"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					product.canonicalUrl,
					" · ",
					product.variantCount,
					" variants · ",
					formatUsd(product.priceFrom)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					children: product.productType
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: product.offerFreshness === "conflict" ? "danger" : "outline",
					children: product.offerFreshness
				})]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl",
					children: ["Agent readiness ", formatScore(product.readiness, 0)]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Profile ",
						product.categoryProfileId,
						" v1.0"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-3",
					children: Object.entries(READINESS_WEIGHTS).map(([key, weight]) => {
						const v = product.readinessComponents[key] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "capitalize text-muted-foreground",
								children: [
									key,
									" · w",
									weight
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular",
								children: Math.round(v)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
							value: v,
							tone: toneForScore(v)
						})] }, key);
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Facts with provenance"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-border rounded-xl border border-border",
				children: product.facts.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: f.status === "verified" ? "positive" : f.status === "missing" ? "danger" : f.status === "inferred" ? "caution" : "outline",
								children: f.status
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: f.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: [
								f.provenance.sourceType,
								" · ",
								f.provenance.locator,
								" · conf ",
								f.provenance.confidence.toFixed(2)
							]
						})
					]
				}, f.key))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Variants"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[560px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-elevated text-xs uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "SKU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Options"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "GTIN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Price"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-2 font-medium",
							children: "Avail"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: product.variants.slice(0, 8).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-xs",
							children: v.sku
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 text-muted-foreground",
							children: Object.entries(v.options).map(([k, val]) => `${k} ${val}`).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 font-mono text-xs",
							children: v.gtin ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2 tabular",
							children: formatUsd(v.price)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-2",
							children: v.available ? "in stock" : "out"
						})
					]
				}, v.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: [
				"Showing 8 of ",
				product.variants.length,
				" variants."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Intents"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2",
				children: [relatedIntents.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "text-sm hover:text-primary",
					to: "/app/intents/$intentId",
					params: { intentId: i.id },
					children: i.text
				}) }, i.id)), relatedIntents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Not linked to the active panel."
				}) : null]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Issues"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: relatedIssues.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "text-sm hover:text-primary",
					to: "/app/issues/$issueId",
					params: { issueId: i.id },
					children: i.title
				}) }, i.id))
			})] })]
		})
	] });
}
//#endregion
export { ProductDetail as component };
