import { i as __toESM, n as __exportAll$1 } from "../_runtime.mjs";
import { t as cn } from "./utils-BQdZmJk3.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { m as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as createRootRoute, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { a as Trigger, i as Root3, n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D3pbkcWL.js
var router_D3pbkcWL_exports = /* @__PURE__ */ __exportAll$1({
	a: () => Route$6,
	c: () => Route$11,
	d: () => TooltipTrigger,
	getRouter: () => getRouter,
	i: () => Route$4,
	l: () => Tooltip,
	n: () => Route,
	o: () => Route$8,
	r: () => Route$2,
	s: () => Route$10,
	t: () => router_exports,
	u: () => TooltipContent
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TooltipProvider = Provider;
var Tooltip = Root3;
var TooltipTrigger = Trigger;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-[var(--shadow-panel)]", className),
	...props
}) }));
TooltipContent.displayName = Content2.displayName;
var styles_default = "/assets/styles-DiT6NtlN.css";
var APP_NAME = "Vitrine";
var Route$23 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "See which buyer needs surface your products, why competitors win, and whether catalog changes improve discovery."
			},
			{
				name: "theme-color",
				content: "#0b0c0e"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-background text-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
					delayDuration: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-right",
					toastOptions: {
						className: "font-sans",
						style: {
							background: "#1a1e26",
							border: "1px solid #2a303c",
							color: "#eceef2"
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$22 = () => import("./routes-pPaudaPD.mjs");
var Route$22 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./app-DfrEzhJH.mjs");
var Route$21 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./app-DANr-GJV.mjs");
var Route$20 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./competitors-rgSeM1dh.mjs");
var Route$19 = createFileRoute("/app/competitors")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./experiments-mf4S4Ula.mjs");
var Route$18 = createFileRoute("/app/experiments")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./intents-BvRfzay0.mjs");
var Route$17 = createFileRoute("/app/intents")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./issues-JfjVcKhg.mjs");
var Route$16 = createFileRoute("/app/issues")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./methodology-D2kG7vpf.mjs");
var Route$15 = createFileRoute("/app/methodology")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./products-06U7utCv.mjs");
var Route$14 = createFileRoute("/app/products")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./reports-Da6Hc-me.mjs");
var Route$13 = createFileRoute("/app/reports")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./settings-D6kI8GwB.mjs");
var Route$12 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./audit._auditId-BLsaXwxl.mjs");
var Route$11 = createFileRoute("/audit/$auditId")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./r._reportId-BACCPNKf.mjs");
var Route$10 = createFileRoute("/r/$reportId")({
	head: () => ({ meta: [{
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./competitors.index-BEnBNIzr.mjs");
var Route$9 = createFileRoute("/app/competitors/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./competitors._brandId-Clcwcd8d.mjs");
var Route$8 = createFileRoute("/app/competitors/$brandId")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./experiments.index-CYfH50mF.mjs");
var Route$7 = createFileRoute("/app/experiments/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./experiments._experimentId-C7k4Lvw4.mjs");
var Route$6 = createFileRoute("/app/experiments/$experimentId")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./intents.index-_uT_XG5W.mjs");
var Route$5 = createFileRoute("/app/intents/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./intents._intentId-BRnLcacX.mjs");
var Route$4 = createFileRoute("/app/intents/$intentId")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./issues.index-B99WrL-W.mjs");
var Route$3 = createFileRoute("/app/issues/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./issues._issueId-C1B2CRDH.mjs");
var Route$2 = createFileRoute("/app/issues/$issueId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./products.index-BwJvVGQl.mjs");
var Route$1 = createFileRoute("/app/products/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./products._productId-BmKC7H_H.mjs");
var Route = createFileRoute("/app/products/$productId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$22.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$23
});
var AppRoute = Route$21.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$23
});
var AppIndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppCompetitorsRoute = Route$19.update({
	id: "/competitors",
	path: "/competitors",
	getParentRoute: () => AppRoute
});
var AppExperimentsRoute = Route$18.update({
	id: "/experiments",
	path: "/experiments",
	getParentRoute: () => AppRoute
});
var AppIntentsRoute = Route$17.update({
	id: "/intents",
	path: "/intents",
	getParentRoute: () => AppRoute
});
var AppIssuesRoute = Route$16.update({
	id: "/issues",
	path: "/issues",
	getParentRoute: () => AppRoute
});
var AppMethodologyRoute = Route$15.update({
	id: "/methodology",
	path: "/methodology",
	getParentRoute: () => AppRoute
});
var AppProductsRoute = Route$14.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => AppRoute
});
var AppReportsRoute = Route$13.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$12.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AuditAuditIdRoute = Route$11.update({
	id: "/audit/$auditId",
	path: "/audit/$auditId",
	getParentRoute: () => Route$23
});
var RReportIdRoute = Route$10.update({
	id: "/r/$reportId",
	path: "/r/$reportId",
	getParentRoute: () => Route$23
});
var AppCompetitorsIndexRoute = Route$9.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppCompetitorsRoute
});
var AppCompetitorsBrandIdRoute = Route$8.update({
	id: "/$brandId",
	path: "/$brandId",
	getParentRoute: () => AppCompetitorsRoute
});
var AppExperimentsIndexRoute = Route$7.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppExperimentsRoute
});
var AppExperimentsExperimentIdRoute = Route$6.update({
	id: "/$experimentId",
	path: "/$experimentId",
	getParentRoute: () => AppExperimentsRoute
});
var AppIntentsIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppIntentsRoute
});
var AppIntentsIntentIdRoute = Route$4.update({
	id: "/$intentId",
	path: "/$intentId",
	getParentRoute: () => AppIntentsRoute
});
var AppIssuesIndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppIssuesRoute
});
var AppIssuesIssueIdRoute = Route$2.update({
	id: "/$issueId",
	path: "/$issueId",
	getParentRoute: () => AppIssuesRoute
});
var AppProductsIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppProductsRoute
});
var AppProductsProductIdRoute = Route.update({
	id: "/$productId",
	path: "/$productId",
	getParentRoute: () => AppProductsRoute
});
var AppCompetitorsRouteChildren = {
	AppCompetitorsBrandIdRoute,
	AppCompetitorsIndexRoute
};
var AppCompetitorsRouteWithChildren = AppCompetitorsRoute._addFileChildren(AppCompetitorsRouteChildren);
var AppExperimentsRouteChildren = {
	AppExperimentsExperimentIdRoute,
	AppExperimentsIndexRoute
};
var AppExperimentsRouteWithChildren = AppExperimentsRoute._addFileChildren(AppExperimentsRouteChildren);
var AppIntentsRouteChildren = {
	AppIntentsIntentIdRoute,
	AppIntentsIndexRoute
};
var AppIntentsRouteWithChildren = AppIntentsRoute._addFileChildren(AppIntentsRouteChildren);
var AppIssuesRouteChildren = {
	AppIssuesIssueIdRoute,
	AppIssuesIndexRoute
};
var AppIssuesRouteWithChildren = AppIssuesRoute._addFileChildren(AppIssuesRouteChildren);
var AppProductsRouteChildren = {
	AppProductsProductIdRoute,
	AppProductsIndexRoute
};
var AppRouteChildren = {
	AppCompetitorsRoute: AppCompetitorsRouteWithChildren,
	AppExperimentsRoute: AppExperimentsRouteWithChildren,
	AppIntentsRoute: AppIntentsRouteWithChildren,
	AppIssuesRoute: AppIssuesRouteWithChildren,
	AppMethodologyRoute,
	AppProductsRoute: AppProductsRoute._addFileChildren(AppProductsRouteChildren),
	AppReportsRoute,
	AppSettingsRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuditAuditIdRoute,
	RReportIdRoute
};
var routeTree = Route$23._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$4 as a, Tooltip as c, router_D3pbkcWL_exports as d, Route$2 as i, TooltipContent as l, Route$10 as n, Route$6 as o, Route$11 as r, Route$8 as s, Route as t, TooltipTrigger as u };
