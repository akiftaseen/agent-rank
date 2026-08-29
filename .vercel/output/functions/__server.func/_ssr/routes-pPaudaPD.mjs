import { i as __toESM } from "../_runtime.mjs";
import { S as workspace, h as metrics, v as products } from "./seed-hHAB4DA0.mjs";
import { i as formatPct, o as formatScore, t as cn } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ArrowRight, d as Lock, m as Check } from "../_libs/lucide-react.mjs";
import { t as SignalBadge } from "./signal-badge-B2uRkP24.mjs";
import { t as Logo } from "./logo-pQHtdvOu.mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
import { t as Input } from "./input-A3CXwO9O.mjs";
import { t as Label } from "./label-BG1U2Ggo.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as generateLocalAudit, t as AUDIT_STAGES } from "./generate-SE3YaFLZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-pPaudaPD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer size-4 shrink-0 rounded-xs border border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: "flex items-center justify-center text-current",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var enhanceAudit = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("0e517499775c5a0ef420d8b0956a6ece644aecbcc10e65f36639213e2b1eb216"));
function Home() {
	const navigate = useNavigate();
	const addAudit = useAppStore((s) => s.addAudit);
	const [url, setUrl] = (0, import_react.useState)("https://ridgeway.example");
	const [email, setEmail] = (0, import_react.useState)("");
	const [consent, setConsent] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [stage, setStage] = (0, import_react.useState)(0);
	async function runAudit(e) {
		e.preventDefault();
		setError(null);
		if (!url.trim()) {
			setError("Enter a store URL.");
			return;
		}
		if (!consent) {
			setError("Consent is required to process public pages.");
			return;
		}
		setRunning(true);
		setStage(0);
		for (let i = 0; i < AUDIT_STAGES.length; i++) {
			setStage(i);
			await new Promise((r) => setTimeout(r, 420));
		}
		let audit = generateLocalAudit({
			url: url.trim(),
			email: email.trim() || "preview@local"
		});
		try {
			audit = await enhanceAudit({ data: {
				url: url.trim(),
				email: email.trim() || "preview@local"
			} });
		} catch {}
		addAudit(audit);
		setRunning(false);
		navigate({
			to: "/audit/$auditId",
			params: { auditId: audit.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/app/methodology",
							children: "Methodology"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app",
							children: ["Open demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "AI commerce evidence · Shopify-first · read-only"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-6xl",
						children: "See which buyer needs surface your products."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: "Independent, product-level observability for catalogs. Grade the evidence, find the gap, and test whether a change moved anything — without writing to the store."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						onSubmit: runAudit,
						className: "mt-10 max-w-xl rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-panel)] sm:p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "url",
									children: "Store URL"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "url",
									className: "mt-1.5",
									placeholder: "https://your-store.com",
									value: url,
									onChange: (e) => setUrl(e.target.value),
									autoComplete: "url"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "email",
									children: "Work email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "email",
									className: "mt-1.5",
									type: "email",
									placeholder: "you@brand.com",
									value: email,
									onChange: (e) => setEmail(e.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 text-sm text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
										checked: consent,
										onCheckedChange: (v) => setConsent(v === true),
										className: "mt-0.5"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I confirm I am authorized to audit this store’s public pages. Vitrine honors robots, bounds the crawl, and does not scrape consumer chat UIs." })]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-danger",
									children: error
								}) : null,
								running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-elevated px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-wider text-muted-foreground",
										children: "Running bounded audit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
										className: "mt-2 space-y-1.5",
										children: AUDIT_STAGES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2 text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: i < stage ? "text-positive" : i === stage ? "text-primary" : "text-muted-foreground",
												children: i < stage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-3.5 rounded-full border border-current" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: i === stage ? "text-foreground" : "text-muted-foreground",
												children: s.label
											})]
										}, s.id))
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "lg",
									className: "w-full sm:w-auto",
									children: "Run public audit"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Preview uses a sample of public pages, five synthetic intents, and limited probes. Not a rank guarantee. Try the prefilled Ridgeway URL, or open the full demo workspace."
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-card/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-medium tracking-tight",
							children: "What this measures"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground",
							children: "Every observation carries a signal class. Native channel data, official catalog retrieval, provider API probes, and deterministic audits are never presented as equivalent."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-6 space-y-3",
							children: [
								["S2", "Official catalog retrieval — eligibility, not ChatGPT placement"],
								["S3", "Permitted API probes — lab samples with model, time, and locale"],
								["S5", "Deterministic catalog and schema audit — confirmed technical issues"],
								["S6", "Comparative hypotheses — directional, never causal on their own"]
							].map(([code, copy]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { code }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: copy
								})]
							}, code))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-wider text-muted-foreground",
								children: "Example evidence · Ridgeway demo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl",
								children: workspace.storeName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Trail and hiking footwear · 24 products · en-US"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-6 grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Catalog readiness",
										value: formatScore(metrics.readiness, 0)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Inclusion rate",
										value: formatPct(metrics.inclusion.rate, 0),
										hint: `${formatPct(metrics.inclusion.lower, 0)}–${formatPct(metrics.inclusion.upper, 0)} Jeffreys`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Index",
										value: metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—",
										hint: `${metrics.index.label} confidence`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										label: "Active products",
										value: String(products.length)
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-xs leading-relaxed text-muted-foreground",
								children: "Index is a communication composite, shown only above coverage thresholds. It is not a universal percentile and excludes referral revenue."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app",
									children: "Inspect the Ridgeway workspace"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-14 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-8 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							title: "Measurement before automation",
							body: "Recommendations are exact and provenance-constrained. The MVP never writes product fields, themes, or feeds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							title: "No consumer-interface scraping",
							body: "Probes use official catalog APIs and permitted provider APIs. Labels name the surface, not the consumer app."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, {
							title: "The sellable unit is a decision",
							body: "A prioritized backlog with evidence, expected mechanism, and an experiment ledger — not a vanity score."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-12 flex items-start gap-3 rounded-lg border border-border bg-elevated px-4 py-4 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 size-4 shrink-0" }), "Vitrine does not promise placement in ChatGPT, Gemini, or any consumer assistant. Samples include dates, providers, repetitions, and uncertainty."]
				})]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-display text-3xl tabular tracking-tight",
			children: value
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] text-muted-foreground",
			children: hint
		}) : null
	] });
}
function Note({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-medium",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm leading-relaxed text-muted-foreground",
		children: body
	})] });
}
//#endregion
export { Home as component };
