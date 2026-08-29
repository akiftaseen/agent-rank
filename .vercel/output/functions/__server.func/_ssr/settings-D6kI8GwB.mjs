import { i as __toESM } from "../_runtime.mjs";
import { S as workspace, r as adapters } from "./seed-hHAB4DA0.mjs";
import { t as cn } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAppStore } from "./store-HrZjQYby.mjs";
import { t as Input } from "./input-A3CXwO9O.mjs";
import { t as Label } from "./label-BG1U2Ggo.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-D6kI8GwB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	ref,
	className: cn("peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-secondary transition-colors data-[state=checked]:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-[1.35rem] data-[state=checked]:bg-primary-foreground" })
}));
Switch.displayName = Switch$1.displayName;
function SettingsPage() {
	const aliases = useAppStore((s) => s.brandAliases);
	const setAliases = useAppStore((s) => s.setBrandAliases);
	const [aliasText, setAliasText] = (0, import_react.useState)(aliases.join(", "));
	const [kill, setKill] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Settings",
				title: "Workspace",
				description: "Demo store is pre-connected. Vitrine requests read_products only — never customer or order scopes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid gap-3 text-sm sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: workspace.storeName })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Domain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: workspace.domain })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Market"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
								workspace.country,
								" · ",
								workspace.language,
								" · ",
								workspace.currency
							] })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Plan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "capitalize",
								children: [workspace.plan, " · $249/mo"]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Granted scopes: read_products. No write_products, no customers, no orders."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Brand aliases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "aliases",
						className: "mt-3 block text-muted-foreground",
						children: "Comma-separated"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "aliases",
						className: "mt-1.5",
						value: aliasText,
						onChange: (e) => setAliasText(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-3",
						size: "sm",
						onClick: () => {
							setAliases(aliasText.split(",").map((s) => s.trim()).filter(Boolean));
							toast("Aliases saved");
						},
						children: "Save aliases"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Adapters"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Global kill switch per adapter. Failures are not converted into zero visibility."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: adapters.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: a.surface
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: a.code
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: kill[a.id] ? "danger" : "positive",
									children: kill[a.id] ? "disabled" : a.status
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: !kill[a.id],
									onCheckedChange: (v) => {
										setKill((s) => ({
											...s,
											[a.id]: !v
										}));
										toast(v ? `${a.provider} enabled` : `${a.provider} kill switch on`);
									}
								})]
							})]
						}, a.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: "Usage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						children: [
							workspace.probeUsed.toLocaleString(),
							" of ",
							workspace.probeQuota.toLocaleString(),
							" probe units this period."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "A probe unit is one intent × one adapter × one locale × one repetition. Unused units do not roll over. Provider outages release reserved units where practical."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-medium",
					children: "Data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Demo data lives in this browser. Export observations from Reports. Deleting the workspace in a production app queues hard deletion within 30 days."
				})]
			})
		]
	});
}
//#endregion
export { SettingsPage as component };
