import { i as __toESM } from "../_runtime.mjs";
import { c as inclusionRate, d as intents, r as adapters, u as intentObservations } from "./seed-hHAB4DA0.mjs";
import { i as formatPct } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PinOff, s as Pin } from "../_libs/lucide-react.mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
import { t as Input } from "./input-A3CXwO9O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intents.index-_uT_XG5W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IntentsList() {
	const overrides = useAppStore((s) => s.intentOverrides);
	const setOverride = useAppStore((s) => s.setIntentOverride);
	const signalFilter = useAppStore((s) => s.signalFilter);
	const setSignalFilter = useAppStore((s) => s.setSignalFilter);
	const [q, setQ] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)("all");
	const rows = (0, import_react.useMemo)(() => {
		return intents.filter((i) => !overrides[i.id]?.archived).filter((i) => source === "all" ? true : i.source === source).filter((i) => i.text.toLowerCase().includes(q.toLowerCase())).map((i) => {
			let obs = intentObservations(i.id);
			if (signalFilter === "S2") obs = obs.filter((o) => o.signalClass === "S2");
			if (signalFilter === "S3") obs = obs.filter((o) => o.signalClass === "S3");
			const inc = inclusionRate(obs);
			const leader = obs.flatMap((o) => o.mentions).filter((m) => m.brandId && m.brandId !== "ridgeway").sort((a, b) => a.rank - b.rank)[0];
			return {
				intent: i,
				inc,
				n: obs.length,
				leader: leader?.displayText ?? "—",
				pinned: overrides[i.id]?.pinned
			};
		}).sort((a, b) => Number(b.pinned) - Number(a.pinned) || a.inc.rate - b.inc.rate);
	}, [
		overrides,
		q,
		source,
		signalFilter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Intents",
			title: "Approved buyer panel",
			description: "Synthetic intents are labeled. Weights are not search volume. Editing wording would create a panel break — archive instead in this demo."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-col gap-2 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Filter intents",
				className: "sm:max-w-xs"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [[
					"all",
					"synthetic",
					"merchant"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: source === s ? "default" : "outline",
					onClick: () => setSource(s),
					children: s
				}, s)), [
					"all",
					"S2",
					"S3"
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: signalFilter === s ? "secondary" : "ghost",
					onClick: () => setSignalFilter(s),
					children: s === "all" ? "All signals" : s
				}, s))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-elevated text-xs uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Intent"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Source"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Inclusion"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "n"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-3 py-3 font-medium",
							children: "Leader"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-3 py-3 font-medium" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map(({ intent, inc, n, leader, pinned }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/app/intents/$intentId",
								params: { intentId: intent.id },
								className: "hover:text-primary",
								children: intent.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [
									intent.type,
									" · ",
									intent.funnelStage,
									" · ",
									intent.specificity,
									intent.priority ? " · priority" : ""
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: intent.source === "synthetic" ? "steel" : "outline",
								children: intent.source
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "px-3 py-3 tabular",
							children: [formatPct(inc.rate, 0), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-[11px] text-muted-foreground",
								children: [
									formatPct(inc.lower, 0),
									"–",
									formatPct(inc.upper, 0)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 tabular text-muted-foreground",
							children: n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3 text-muted-foreground",
							children: leader
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-3 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "icon-sm",
								variant: "ghost",
								"aria-label": pinned ? "Unpin" : "Pin",
								onClick: () => setOverride(intent.id, { pinned: !pinned }),
								children: pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinOff, { className: "size-4" })
							})
						})
					]
				}, intent.id)) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: [adapters.length, " adapters · Jeffreys interval on unweighted repetitions. Cross-provider charts are descriptive and do not imply equal audience size."]
		})
	] });
}
//#endregion
export { IntentsList as component };
