import { t as cn } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-mark-qv2n3iks.js
var import_jsx_runtime = require_jsx_runtime();
function ProductMark({ tint, line, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-10 items-center justify-center rounded-md", className),
		style: { background: tint },
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			viewBox: "0 0 32 32",
			className: "size-6 text-paper",
			children: line === "recovery" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6 18c4-6 16-6 20 0v4c-4 3-16 3-20 0v-4z",
				fill: "currentColor",
				opacity: "0.9"
			}) : line === "hike" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 20c2-8 8-11 14-9 4 1 7 4 8 8v3H5v-2z",
				fill: "currentColor",
				opacity: "0.9"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 19c3-7 10-10 16-7 3 1.5 6 3 8 6v3.5H4V19z",
				fill: "currentColor",
				opacity: "0.9"
			})
		})
	});
}
//#endregion
export { ProductMark as t };
