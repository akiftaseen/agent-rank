import { _ as productById, c as inclusionRate, l as intentById, p as issues, r as adapters, u as intentObservations } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, r as formatDateTime } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4 } from "./router-D3pbkcWL.mjs";
import { t as SignalBadge } from "./signal-badge-B2uRkP24.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-Ck0WYt6I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intents._intentId-BRnLcacX.js
var import_jsx_runtime = require_jsx_runtime();
function IntentDetail() {
	const { intentId } = Route$4.useParams();
	const intent = intentById(intentId);
	if (!intent) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Intent not found." });
	const obs = intentObservations(intent.id);
	const related = issues.filter((i) => i.affectedIntentIds.includes(intent.id));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Intent",
			title: intent.text,
			description: `${intent.type} · ${intent.funnelStage} · ${intent.specificity} · weight ${intent.weight} (${intent.source === "synthetic" ? "not search volume" : "merchant-entered"})`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/intents",
					children: "Back to panel"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "steel",
				children: intent.source
			}), intent.priority ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "priority · 3 repetitions" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: "exploratory · 1 repetition"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3 sm:grid-cols-3",
			children: adapters.map((a) => {
				const subset = obs.filter((o) => o.adapterId === a.id);
				const inc = inclusionRate(subset);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-base",
						children: a.provider
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { code: a.signalClass })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: a.surface
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tabular",
						children: formatPct(inc.rate, 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							formatPct(inc.lower, 0),
							"–",
							formatPct(inc.upper, 0),
							" · n=",
							inc.n
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-[11px] text-muted-foreground",
						children: [
							"Does not approximate the consumer ",
							a.provider,
							" app."
						]
					})
				] })] }, a.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Observations"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 space-y-3",
			children: obs.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { code: o.signalClass }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: o.model
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: formatDateTime(o.observedAt)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["rep ", o.repetition]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: o.merchantIncluded ? "positive" : "outline",
								children: o.merchantIncluded ? `included · rank ${o.merchantRank}` : "not included"
							}),
							o.merchantLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "steel",
								children: "merchant link"
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted-foreground",
						children: o.rawExcerpt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1 text-sm",
						children: o.mentions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-muted-foreground",
									children: [m.rank, "."]
								}),
								" ",
								m.displayText,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted-foreground",
									children: [" · ", m.kind.replace("_", " ")]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: m.domain
							})]
						}, m.id))
					})
				]
			}, o.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Linked products"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: intent.linkedProductIds.map((id) => {
				const p = productById(id);
				if (!p) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "text-sm hover:text-primary",
					to: "/app/products/$productId",
					params: { productId: id },
					children: p.title
				}) }, id);
			})
		}),
		related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Why we might be losing"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: related.map((iss) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "text-sm hover:text-primary",
				to: "/app/issues/$issueId",
				params: { issueId: iss.id },
				children: iss.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [" · ", iss.classification.replace("_", " ")]
			})] }, iss.id))
		})] }) : null
	] });
}
//#endregion
export { IntentDetail as component };
