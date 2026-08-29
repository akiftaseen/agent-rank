import { i as __toESM } from "../_runtime.mjs";
import { S as workspace, d as intents, h as metrics, p as issues, r as adapters, s as experiments, t as READINESS_WEIGHTS, v as products, x as weekly } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, o as formatScore } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { t as ConfidenceBadge } from "./confidence-OOyq3HkB.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as SignalBadge } from "./signal-badge-B2uRkP24.mjs";
import { n as toneForScore, t as ScoreBar } from "./score-bar-DX7xoLrg.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-Ck0WYt6I.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-DANr-GJV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrendChart({ data, dataKey, label }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 rounded-md bg-secondary/50" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-48 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "week",
						tickFormatter: (v) => v.slice(5),
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "var(--color-muted-foreground)",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							background: "var(--color-popover)",
							border: "1px solid var(--color-border)",
							borderRadius: 8,
							fontSize: 12
						},
						labelFormatter: (v) => `Week of ${v}`,
						formatter: (v) => [typeof v === "number" && v <= 1 ? `${(v * 100).toFixed(0)}%` : v, label]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey,
						stroke: "var(--color-primary)",
						fill: "var(--color-primary)",
						fillOpacity: .12,
						strokeWidth: 1.6
					})
				]
			})
		})
	});
}
function Overview() {
	const openIssues = issues.slice().sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 4);
	const weak = intents.filter((i) => i.status === "active").slice().sort((a, b) => a.merchantP.openai_web - b.merchantP.openai_web).slice(0, 4);
	const strong = intents.filter((i) => i.status === "active").slice().sort((a, b) => b.merchantP.openai_web - a.merchantP.openai_web).slice(0, 3);
	const avgComponents = Object.keys(READINESS_WEIGHTS).reduce((acc, key) => {
		acc[key] = products.reduce((s, p) => s + (p.readinessComponents[key] ?? 0), 0) / products.length;
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Overview",
			title: "What changed, what matters, what to do",
			description: `${workspace.storeName} · ${workspace.productCount} products · panel of ${metrics.activeIntents} intents · ${metrics.observationCount} observations. Compatible panel across the last six weeks.`,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/issues",
					children: "Open backlog"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Vitrine Index",
					value: metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—",
					hint: metrics.index.value != null ? `${metrics.index.label} confidence · not a universal percentile` : "Building baseline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Recommendation inclusion",
					value: formatPct(metrics.inclusion.rate, 0),
					hint: `${formatPct(metrics.inclusion.lower, 0)}–${formatPct(metrics.inclusion.upper, 0)} · n=${metrics.inclusion.n}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Competitive share",
					value: formatPct(metrics.recShare, 0),
					hint: "Among approved brand competitors only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Catalog readiness",
					value: formatScore(metrics.readiness, 0),
					hint: "Equal product average · category-aware"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 rounded-lg border border-border bg-card px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-wider text-muted-foreground",
					children: "Signal coverage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, {
							code: "S6",
							showName: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: "S1 native — not connected"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							children: "S4 referrals — not connected"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground",
					children: [adapters.map((a) => a.surface).join(" · "), ". AI-attributed sessions are hidden until an outcomes integration exists."]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Inclusion trend" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Same panel · weekly · S2+S3 blended for display, filterable on Intents"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
				data: weekly,
				dataKey: "inclusion",
				label: "Inclusion"
			}) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Readiness components" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Store average · footwear profiles v1.0"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: Object.entries(avgComponents).map(([key, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1 flex justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize text-muted-foreground",
						children: key
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular",
						children: Math.round(value)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
					value,
					tone: toneForScore(value)
				})] }, key))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Weakest intents" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/intents",
					className: "text-xs text-primary",
					children: "All intents"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: weak.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/intents/$intentId",
					params: { intentId: i.id },
					className: "block rounded-md border border-border px-3 py-2 hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: i.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							i.type,
							" · ",
							i.source,
							" · typical S3 inclusion ",
							formatPct(i.merchantP.openai_web, 0)
						]
					})]
				}, i.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Strongest clusters" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: strong.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/intents/$intentId",
					params: { intentId: i.id },
					className: "block rounded-md border border-border px-3 py-2 hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: i.text
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							i.type,
							" · S2 ",
							formatPct(i.merchantP.shopify_catalog, 0),
							" · S3 ",
							formatPct(i.merchantP.openai_web, 0)
						]
					})]
				}, i.id))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Next actions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/issues",
					className: "text-xs text-primary",
					children: "Full backlog"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: openIssues.map((iss) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/issues/$issueId",
					params: { issueId: iss.id },
					className: "block rounded-md border border-border px-3 py-3 hover:bg-accent",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: iss.classification === "confirmed" ? "caution" : "steel",
								children: iss.classification.replace("_", " ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { value: iss.evidenceStrength }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: ["priority ", iss.priorityScore.toFixed(1)]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: iss.title
					})]
				}, iss.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex-row items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Experiments" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/experiments",
					className: "text-xs text-primary",
					children: "Ledger"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "space-y-3",
				children: experiments.map((exp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/experiments/$experimentId",
					params: { experimentId: exp.id },
					className: "block rounded-md border border-border px-3 py-3 hover:bg-accent",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: exp.resultLabel === "positive_directional" ? "positive" : exp.status === "running" ? "steel" : "outline",
								children: exp.resultLabel?.replace("_", " ") ?? exp.status
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm",
							children: exp.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: exp.primaryMetric
						})
					]
				}, exp.id))
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-8 flex items-center gap-2 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" }), "No S1 Shopify agentic sales or Google AI impressions are connected. Outcome tiles stay empty rather than estimated."]
		})
	] });
}
function Kpi({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card px-4 py-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-3xl tabular tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] leading-snug text-muted-foreground",
				children: hint
			})
		]
	});
}
//#endregion
export { Overview as component };
