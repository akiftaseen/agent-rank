import { d as intents, g as observations, i as brandById } from "./seed-hHAB4DA0.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-B4pNBlRi.mjs";
import { t as PageHeader } from "./page-header-vK4CtLJv.mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$8 } from "./router-D3pbkcWL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/competitors._brandId-Clcwcd8d.js
var import_jsx_runtime = require_jsx_runtime();
function CompetitorDetail() {
	const { brandId } = Route$8.useParams();
	const brand = brandById(brandId);
	if (!brand) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Not found." });
	const winning = intents.filter((i) => observations.some((o) => o.intentId === i.id && o.mentions.some((m) => m.brandId === brand.id && m.rank === 1)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: brand.entityType.replace("_", " "),
			title: brand.name,
			description: brand.discoveryReason,
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/app/competitors",
					children: "All competitors"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: brand.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				children: brand.domain
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted-foreground",
			children: ["Aliases: ", brand.aliases.join(", ") || "none"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Winning intents (first position in at least one sample)"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: winning.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "text-sm hover:text-primary",
				to: "/app/intents/$intentId",
				params: { intentId: i.id },
				children: i.text
			}) }, i.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-xs text-muted-foreground",
			children: "Public competitor facts retain source URLs and observation dates. This demo does not store competitor HTML."
		})
	] });
}
//#endregion
export { CompetitorDetail as component };
