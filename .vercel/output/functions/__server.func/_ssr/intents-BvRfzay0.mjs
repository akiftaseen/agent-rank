import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { d as useRouterState, m as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/intents-BvRfzay0.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function IntentsLayout() {
	if (useRouterState({ select: (s) => s.location.pathname }) !== "/app/intents") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
};
//#endregion
export { SplitComponent as component };
