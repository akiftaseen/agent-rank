import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BQdZmJk3.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatPct(value, digits = 0) {
	if (!Number.isFinite(value)) return "—";
	return `${(value * 100).toFixed(digits)}%`;
}
function formatScore(value, digits = 0) {
	if (!Number.isFinite(value)) return "—";
	return value.toFixed(digits);
}
function formatUsd(value) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	}).format(value);
}
function formatDate(iso) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(iso));
}
function formatDateTime(iso) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	}).format(new Date(iso));
}
function formatRelative(iso) {
	const delta = Date.now() - new Date(iso).getTime();
	const hours = Math.round(delta / 36e5);
	if (hours < 1) return "just now";
	if (hours < 24) return `${hours}h ago`;
	const days = Math.round(hours / 24);
	if (days < 14) return `${days}d ago`;
	return formatDate(iso);
}
function slugify(value) {
	return value.toLowerCase().replace(/https?:\/\//, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48);
}
//#endregion
export { formatRelative as a, slugify as c, formatPct as i, formatDate as n, formatScore as o, formatDateTime as r, formatUsd as s, cn as t };
