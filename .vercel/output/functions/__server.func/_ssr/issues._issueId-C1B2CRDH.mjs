import { i as __toESM } from "../_runtime.mjs";
import { _ as productById, f as issueById } from "./seed-hHAB4DA0.mjs";
import { t as cn } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { t as ConfidenceBadge } from "./confidence-OOyq3HkB.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$2 } from "./router-D3pbkcWL.mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
import { t as Label } from "./label-BG1U2Ggo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/issues._issueId-C1B2CRDH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-ink/70", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-panel)]", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm p-1 text-muted-foreground hover:text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-24 w-full rounded-md border border-input bg-elevated px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
function IssueDetail() {
	const { issueId } = Route$2.useParams();
	const issue = issueById(issueId);
	const setIssue = useAppStore((s) => s.setIssueOverride);
	const addExperiment = useAppStore((s) => s.addExperiment);
	const override = useAppStore((s) => s.issueOverrides[issueId]);
	const navigate = useNavigate();
	const [dismissOpen, setDismissOpen] = (0, import_react.useState)(false);
	const [reason, setReason] = (0, import_react.useState)("");
	if (!issue) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Issue not found." });
	const status = override?.status ?? "open";
	function exportCsv() {
		const csv = [
			["field", "value"],
			["title", issue.title],
			["classification", issue.classification],
			["mechanism", issue.mechanism],
			...issue.proposedChanges.map((c) => [c.target, c.value])
		].map((r) => r.map((c) => `"${c.replaceAll("\"", "\"\"")}"`).join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${issue.id}.csv`;
		a.click();
		URL.revokeObjectURL(url);
		setIssue(issue.id, { status: "exported" });
		toast("Recommendation exported — Shopify is not modified");
	}
	function createExperiment() {
		const exp = {
			id: `exp-${Date.now()}`,
			name: `Test: ${issue.title}`,
			hypothesis: issue.mechanism,
			status: "baseline",
			recommendationId: `rec-${issue.id}`,
			issueId: issue.id,
			primaryMetric: issue.successMetric,
			expectedDirection: "up",
			baselineStart: (/* @__PURE__ */ new Date()).toISOString(),
			baselineEnd: new Date(Date.now() + 12096e5).toISOString(),
			implementationAt: null,
			postStart: null,
			postEnd: null,
			treatmentProductIds: issue.affectedProductIds.slice(0, 6),
			treatmentIntentIds: issue.affectedIntentIds.slice(0, 4),
			controlIntentIds: [],
			resultLabel: null,
			resultSummary: "Baseline frozen. Implement the change in Shopify, then mark implementation.",
			confidence: 0,
			confounders: ["No matched control selected yet"],
			preValue: 0,
			postValue: null,
			controlPre: null,
			controlPost: null,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		addExperiment(exp);
		toast("Experiment pre-registered. Baseline observation IDs frozen.");
		navigate({
			to: "/app/experiments/$experimentId",
			params: { experimentId: exp.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: issue.ruleCode,
			title: issue.title,
			description: issue.description,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/issues",
					children: "Backlog"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: issue.classification === "confirmed" ? "caution" : "steel",
					children: issue.classification.replace("_", " ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { value: issue.evidenceStrength }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [
						"impact ",
						issue.expectedImpact,
						"/5"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [
						"effort ",
						issue.effort,
						"/5"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: ["risk ×", issue.risk]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: ["priority ", issue.priorityScore.toFixed(1)]
				}),
				status !== "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: status }) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Why it matters"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted-foreground",
					children: issue.whyItMatters
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Mechanism · "
					}), issue.mechanism]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Success metric · "
					}), issue.successMetric]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl",
					children: "Evidence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground",
					children: issue.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
				}),
				issue.counterevidence.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-sm font-medium",
					children: "Counterevidence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground",
					children: issue.counterevidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: e }, e))
				})] }) : null
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Proposed changes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Factual text includes field-level provenance. Inferred values are marked and require merchant input. Vitrine will not write these fields."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 space-y-3",
			children: issue.proposedChanges.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-lg border border-border bg-card px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted-foreground",
						children: c.target
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm",
						children: c.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: ["provenance: ", c.provenance]
					})
				]
			}, c.target))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-display text-2xl",
			children: "Affected products"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 flex flex-wrap gap-2",
			children: issue.affectedProductIds.map((id) => {
				const p = productById(id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/products/$productId",
					params: { productId: id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: p?.title ?? id
					})
				}, id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: createExperiment,
					children: "Test this recommendation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: exportCsv,
					children: "Export CSV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => setDismissOpen(true),
					children: "Dismiss"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => {
						setIssue(issue.id, {
							status: "snoozed",
							reason: "Snoozed 14 days"
						});
						toast("Snoozed — hidden from the open backlog");
					},
					children: "Snooze"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: dismissOpen,
			onOpenChange: setDismissOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Dismiss issue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "The reason is stored and used to reduce repeated irrelevant recommendations." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "reason",
					children: "Reason"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: "reason",
					value: reason,
					onChange: (e) => setReason(e.target.value),
					placeholder: "Not relevant because…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => {
						setIssue(issue.id, {
							status: "dismissed",
							reason: reason || "Dismissed"
						});
						setDismissOpen(false);
						toast("Dismissed");
					},
					children: "Confirm dismiss"
				})
			] })
		})
	] });
}
//#endregion
export { IssueDetail as component };
