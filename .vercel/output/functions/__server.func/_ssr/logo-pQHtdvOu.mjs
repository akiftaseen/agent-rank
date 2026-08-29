import { t as cn } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-pQHtdvOu.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className, markOnly }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 32 32",
			className: "size-7 shrink-0",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "5",
					width: "26",
					height: "22",
					rx: "2",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "7",
					y: "9",
					width: "18",
					height: "14",
					rx: "1",
					fill: "none",
					stroke: "currentColor",
					strokeWidth: "1.2",
					opacity: "0.7"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M7 16h18",
					stroke: "currentColor",
					strokeWidth: "1",
					opacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M16 9v14",
					stroke: "currentColor",
					strokeWidth: "1",
					opacity: "0.45"
				})
			]
		}), markOnly ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xl font-medium tracking-tight",
			children: "Vitrine"
		})]
	});
}
//#endregion
export { Logo as t };
