import { n as SIGNAL_META } from "./seed-hHAB4DA0.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
import { c as Tooltip, l as TooltipContent, u as TooltipTrigger } from "./router-D3pbkcWL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/signal-badge-B2uRkP24.js
var import_jsx_runtime = require_jsx_runtime();
var variant = {
	S1: "s1",
	S2: "s2",
	S3: "s3",
	S4: "s4",
	S5: "s5",
	S6: "s6"
};
function SignalBadge({ code, showName }) {
	const meta = SIGNAL_META[code];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			variant: variant[code],
			children: [code, showName ? ` · ${meta.short}` : null]
		}) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-medium text-foreground",
		children: meta.name
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-muted-foreground",
		children: meta.fidelity
	})] })] });
}
//#endregion
export { SignalBadge as t };
