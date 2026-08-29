import { o as evidenceLabel } from "./seed-hHAB4DA0.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-PdX9BlPv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/confidence-OOyq3HkB.js
var import_jsx_runtime = require_jsx_runtime();
function ConfidenceBadge({ value }) {
	const label = typeof value === "number" ? evidenceLabel(value) : value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: label === "high" ? "positive" : label === "medium" ? "steel" : label === "low" ? "caution" : "outline",
		children: label === "high" ? "High" : label === "medium" ? "Medium" : label === "low" ? "Low" : "Insufficient"
	});
}
//#endregion
export { ConfidenceBadge as t };
