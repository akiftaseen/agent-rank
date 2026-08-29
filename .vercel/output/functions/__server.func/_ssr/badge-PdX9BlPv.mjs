import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-BQdZmJk3.mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-PdX9BlPv.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-secondary text-muted-foreground",
		steel: "border-transparent bg-primary/15 text-primary",
		positive: "border-transparent bg-positive/15 text-positive",
		caution: "border-transparent bg-caution/15 text-caution",
		danger: "border-transparent bg-danger/15 text-danger",
		outline: "border-border text-muted-foreground",
		s1: "border-transparent bg-positive/15 text-positive",
		s2: "border-transparent bg-info/15 text-info",
		s3: "border-transparent bg-primary/15 text-primary",
		s4: "border-transparent bg-caution/15 text-caution",
		s5: "border-transparent bg-secondary text-foreground",
		s6: "border-transparent bg-muted text-muted-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
