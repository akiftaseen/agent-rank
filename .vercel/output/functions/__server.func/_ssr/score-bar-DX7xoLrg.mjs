import { t as cn } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/score-bar-DX7xoLrg.js
var import_jsx_runtime = require_jsx_runtime();
function ScoreBar({ value, className, tone = "steel" }) {
	const color = tone === "positive" ? "bg-positive" : tone === "caution" ? "bg-caution" : tone === "danger" ? "bg-danger" : "bg-primary";
	const v = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("h-full rounded-full", color),
			style: { width: `${v}%` }
		})
	});
}
function toneForScore(score) {
	if (score >= 75) return "positive";
	if (score >= 50) return "steel";
	if (score >= 30) return "caution";
	return "danger";
}
//#endregion
export { toneForScore as n, ScoreBar as t };
