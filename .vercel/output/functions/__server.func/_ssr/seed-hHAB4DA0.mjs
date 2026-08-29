//#region node_modules/.nitro/vite/services/ssr/assets/seed-hHAB4DA0.js
function rankCredit(rank) {
	return 1 / Math.log2(rank + 1);
}
function jeffreysInterval(successes, trials) {
	const s = successes + .5;
	const f = trials - successes + .5;
	const p = s / (s + f);
	const variance = s * f / ((s + f) ** 2 * (s + f + 1));
	const se = Math.sqrt(variance) * 1.96;
	return {
		p,
		lower: Math.max(0, p - se),
		upper: Math.min(1, p + se)
	};
}
function inclusionRate(obs, weights) {
	if (obs.length === 0) return {
		rate: 0,
		lower: 0,
		upper: 0,
		n: 0
	};
	let num = 0;
	let den = 0;
	let successes = 0;
	for (const o of obs) {
		const w = weights?.get(o.intentId) ?? 1;
		num += w * (o.merchantIncluded ? 1 : 0);
		den += w;
		if (o.merchantIncluded) successes += 1;
	}
	const interval = jeffreysInterval(successes, obs.length);
	return {
		rate: den === 0 ? 0 : num / den,
		lower: interval.lower,
		upper: interval.upper,
		n: obs.length
	};
}
function merchantLinkShare(obs) {
	const recs = obs.filter((o) => o.merchantIncluded);
	if (recs.length === 0) return 0;
	return recs.filter((o) => o.merchantLink).length / recs.length;
}
function citationShare(obs) {
	if (obs.length === 0) return 0;
	return obs.filter((o) => o.citedMerchant).length / obs.length;
}
function recommendationShare(obs, approvedBrandIds, merchantBrandId) {
	let merchant = 0;
	let total = 0;
	for (const o of obs) for (const m of o.mentions) {
		if (!m.resolved || !m.brandId) continue;
		if (m.brandId !== merchantBrandId && !approvedBrandIds.has(m.brandId)) continue;
		total += m.rankCredit;
		if (m.brandId === merchantBrandId) merchant += m.rankCredit;
	}
	return total === 0 ? 0 : merchant / total;
}
function intentCovered(obs) {
	if (obs.length === 0) return false;
	const { rate, n } = inclusionRate(obs);
	const successes = obs.filter((o) => o.merchantIncluded).length;
	const interval = jeffreysInterval(successes, n);
	return obs.some((o) => o.merchantIncluded) && interval.lower >= .05;
}
function evidenceLabel(score) {
	if (score >= .75) return "high";
	if (score >= .5) return "medium";
	if (score >= .25) return "low";
	return "insufficient";
}
function priorityScore(input) {
	return input.expectedImpact * input.evidenceStrength * input.businessWeight / Math.max(input.effort * input.risk, .25);
}
function visibilityScore(inclusion, avgRankCredit) {
	const rankNorm = Math.min(1, avgRankCredit / rankCredit(1));
	return 100 * (.65 * inclusion + .35 * rankNorm);
}
function agentRankIndex(input) {
	if (!(input.intentCount >= 20 && input.adapterCount >= 2 && input.observationCount >= 60 && input.panelCoverage >= .8)) return {
		value: null,
		label: "unavailable"
	};
	return {
		value: .45 * input.visibility + .25 * input.coverage + .2 * input.readiness + .1 * input.sourcePresence,
		label: input.observationCount >= 180 ? "high" : input.observationCount >= 90 ? "moderate" : "provisional"
	};
}
var SIGNAL_META = {
	S1: {
		name: "Native observed channel data",
		short: "Native",
		fidelity: "Highest for that channel"
	},
	S2: {
		name: "Official catalog retrieval",
		short: "Catalog",
		fidelity: "High for retrieval, not final re-ranking"
	},
	S3: {
		name: "Provider API probe",
		short: "API probe",
		fidelity: "Lab sample — not the consumer UI"
	},
	S4: {
		name: "Referral / outcome observation",
		short: "Outcomes",
		fidelity: "High for observed outcome; intent may be unknown"
	},
	S5: {
		name: "Deterministic readiness audit",
		short: "Audit",
		fidelity: "High for the issue; indirect for visibility"
	},
	S6: {
		name: "Comparative / inferred evidence",
		short: "Hypothesis",
		fidelity: "Directional; requires a caveat"
	}
};
var READINESS_WEIGHTS = {
	identity: 15,
	core: 15,
	taxonomy: 10,
	decision: 20,
	variants: 10,
	offer: 10,
	policy: 10,
	machine: 10
};
function catalogReadiness(componentScores) {
	let num = 0;
	let den = 0;
	for (const [key, weight] of Object.entries(READINESS_WEIGHTS)) {
		if (componentScores[key] === void 0) continue;
		num += weight * componentScores[key];
		den += weight;
	}
	return den === 0 ? 0 : num / den;
}
function mulberry32(seed) {
	return () => {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var NOW = "2026-08-29T06:12:00.000Z";
var rng = mulberry32(1374494758);
var adapters = [
	{
		id: "shopify_catalog",
		code: "shopify.global_catalog",
		provider: "Shopify",
		surface: "Shopify Catalog discovery (official retrieval)",
		signalClass: "S2",
		approximatesConsumer: false,
		status: "active"
	},
	{
		id: "openai_web",
		code: "openai.responses.web_search",
		provider: "OpenAI",
		surface: "OpenAI API web-search probe",
		signalClass: "S3",
		approximatesConsumer: false,
		status: "active"
	},
	{
		id: "perplexity_sonar",
		code: "perplexity.sonar",
		provider: "Perplexity",
		surface: "Perplexity Sonar API probe",
		signalClass: "S3",
		approximatesConsumer: false,
		status: "active"
	}
];
var workspace = {
	name: "Ridgeway",
	storeName: "Ridgeway",
	domain: "ridgeway.example",
	country: "US",
	language: "en",
	currency: "USD",
	plan: "growth",
	probeUsed: 847,
	probeQuota: 2500,
	lastScanAt: NOW,
	catalogSyncedAt: "2026-08-29T05:41:00.000Z",
	productCount: 24,
	locale: "en-US"
};
var brands = [
	{
		id: "ridgeway",
		name: "Ridgeway",
		domain: "ridgeway.example",
		entityType: "merchant_brand",
		aliases: ["Ridgeway Footwear", "Ridgeway Running"],
		status: "approved",
		discoveryReason: "Merchant brand"
	},
	{
		id: "hoka",
		name: "Hoka",
		domain: "hoka.com",
		entityType: "competitor_brand",
		aliases: ["HOKA", "Hoka One One"],
		status: "approved",
		discoveryReason: "Repeated first-position on trail intents"
	},
	{
		id: "salomon",
		name: "Salomon",
		domain: "salomon.com",
		entityType: "competitor_brand",
		aliases: ["Salomon Running"],
		status: "approved",
		discoveryReason: "High share on waterproof and technical descent intents"
	},
	{
		id: "altra",
		name: "Altra",
		domain: "altrarunning.com",
		entityType: "competitor_brand",
		aliases: ["Altra Running"],
		status: "approved",
		discoveryReason: "Dominates wide-toe-box and zero-drop clusters"
	},
	{
		id: "on",
		name: "On",
		domain: "on.com",
		entityType: "competitor_brand",
		aliases: ["On Running", "On Cloud"],
		status: "approved",
		discoveryReason: "Road-to-trail hybrid cluster"
	},
	{
		id: "brooks",
		name: "Brooks",
		domain: "brooksrunning.com",
		entityType: "competitor_brand",
		aliases: ["Brooks Running"],
		status: "candidate",
		discoveryReason: "Appears on cushioned road intents; not yet approved"
	},
	{
		id: "rei",
		name: "REI",
		domain: "rei.com",
		entityType: "retailer",
		aliases: ["REI Co-op"],
		status: "approved",
		discoveryReason: "Frequent merchant-offer link, not a brand competitor"
	},
	{
		id: "backcountry",
		name: "Backcountry",
		domain: "backcountry.com",
		entityType: "retailer",
		aliases: [],
		status: "approved",
		discoveryReason: "Retailer offer links on hiking intents"
	}
];
function fact(key, label, value, status, sourceType, locator, confidence) {
	return {
		key,
		label,
		value,
		status,
		provenance: {
			sourceType,
			locator,
			observedAt: NOW,
			confidence
		}
	};
}
function sizes(prefix, gtinBase, price, widths) {
	const out = [];
	const us = [
		"8",
		"9",
		"10",
		"11",
		"12",
		"13"
	];
	let i = 0;
	for (const w of widths) for (const s of us) {
		i += 1;
		out.push({
			id: `${prefix}-${s}-${w}`,
			sku: `${prefix.toUpperCase()}-${s}-${w}`,
			title: `US ${s} / ${w}`,
			gtin: gtinBase ? String(gtinBase + i) : null,
			options: {
				Size: s,
				Width: w
			},
			price,
			compareAt: null,
			available: !(s === "13" && w !== "D")
		});
	}
	return out;
}
var productSeeds = [
	{
		id: "p-cascade-gtx",
		handle: "cascade-gtx",
		title: "Cascade GTX",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 168,
		tint: "#4d6a5a",
		description: "Waterproof trail runner for wet Pacific Northwest winters. GORE-TEX bootie, sticky rubber, 8mm drop.",
		gtin: true,
		widthStructured: false,
		drop: "8mm",
		stack: "32/24mm",
		weight: "298g",
		waterproof: "GORE-TEX",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-cascade",
		handle: "cascade",
		title: "Cascade",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 148,
		tint: "#3f5c4e",
		description: "Non-GTX Cascade with a drainable mesh upper for summer mud and creek crossings.",
		gtin: true,
		widthStructured: false,
		drop: "8mm",
		stack: "32/24mm",
		weight: "274g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-scree-pro",
		handle: "scree-pro",
		title: "Scree Pro",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 178,
		tint: "#6a5344",
		description: "Technical descender with a full-length rock plate for volcanic scree and granite.",
		gtin: false,
		widthStructured: false,
		drop: "6mm",
		stack: "28/22mm",
		weight: "286g",
		waterproof: "No",
		jsonldOk: false,
		alt: false,
		optionNameOk: true
	},
	{
		id: "p-scree",
		handle: "scree",
		title: "Scree",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 158,
		tint: "#7a6252",
		description: "Lighter Scree without the plate. Best on packed dirt and moderate rock.",
		gtin: false,
		widthStructured: false,
		drop: "6mm",
		stack: "28/22mm",
		weight: "262g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-drift-2",
		handle: "drift-2",
		title: "Drift 2",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 138,
		tint: "#4a6d78",
		description: "Fast, drainable summer trail shoe. Open mesh, 4mm lugs, 218g.",
		gtin: true,
		widthStructured: true,
		drop: "4mm",
		stack: "24/20mm",
		weight: "218g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-drift-2-wide",
		handle: "drift-2-wide",
		title: "Drift 2 Wide",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 138,
		tint: "#3e5e68",
		description: "Drift 2 last in 2E. Same drainable upper; wider forefoot.",
		gtin: true,
		widthStructured: true,
		drop: "4mm",
		stack: "24/20mm",
		weight: "224g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-hut-pack",
		handle: "hut-pack",
		title: "Hut Pack",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 158,
		tint: "#5a4e6a",
		description: "Fastpacking shoe for 20L loads. Protective toe cap, moderate cushion.",
		gtin: false,
		widthStructured: false,
		drop: "6mm",
		stack: "30/24mm",
		weight: "268g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-volcanic",
		handle: "volcanic",
		title: "Volcanic",
		line: "trail",
		type: "Trail running shoe",
		categoryProfileId: "footwear.trail",
		price: 172,
		tint: "#6a3e3e",
		description: "Rock-plated shoe for sharp volcanic rock. Stiff forefoot, sticky outsole.",
		gtin: false,
		widthStructured: false,
		drop: "8mm",
		stack: "30/22mm",
		weight: "304g",
		waterproof: "No",
		jsonldOk: false,
		alt: false,
		optionNameOk: false
	},
	{
		id: "p-metro-racer",
		handle: "metro-racer",
		title: "Metro Racer",
		line: "road",
		type: "Road running shoe",
		categoryProfileId: "footwear.road",
		price: 128,
		tint: "#3d4a6a",
		description: "Daily racer with a moderate stack and a snappy ride.",
		gtin: true,
		widthStructured: false,
		drop: "8mm",
		stack: "34/26mm",
		weight: "212g",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-metro-daily",
		handle: "metro-daily",
		title: "Metro Daily",
		line: "road",
		type: "Road running shoe",
		categoryProfileId: "footwear.road",
		price: 118,
		tint: "#455478",
		description: "Easy daily trainer. Soft foam, durable outsole.",
		gtin: true,
		widthStructured: false,
		drop: "10mm",
		stack: "36/26mm",
		weight: "248g",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-bridge-3",
		handle: "bridge-3",
		title: "Bridge 3",
		line: "road",
		type: "Road-to-trail shoe",
		categoryProfileId: "footwear.road",
		price: 142,
		tint: "#4a5c4e",
		description: "Road-to-trail hybrid. Low lugs, protective upper, 8mm drop.",
		gtin: false,
		widthStructured: true,
		drop: "8mm",
		stack: "32/24mm",
		weight: "256g",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-bridge-3-wide",
		handle: "bridge-3-wide",
		title: "Bridge 3 Wide",
		line: "road",
		type: "Road-to-trail shoe",
		categoryProfileId: "footwear.road",
		price: 142,
		tint: "#3e5044",
		description: "Bridge 3 in 2E. Same hybrid outsole.",
		gtin: false,
		widthStructured: true,
		drop: "8mm",
		stack: "32/24mm",
		weight: "262g",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-tempo",
		handle: "tempo",
		title: "Tempo",
		line: "road",
		type: "Road running shoe",
		categoryProfileId: "footwear.road",
		price: 136,
		tint: "#5a4a3a",
		description: "Cushioned road shoe for long easy days.",
		gtin: true,
		widthStructured: false,
		drop: "10mm",
		stack: "38/28mm",
		weight: "268g",
		jsonldOk: true,
		alt: false,
		optionNameOk: true
	},
	{
		id: "p-tempo-carbon",
		handle: "tempo-carbon",
		title: "Tempo Carbon",
		line: "road",
		type: "Road racing shoe",
		categoryProfileId: "footwear.road",
		price: 198,
		tint: "#2e2e38",
		description: "Limited carbon-plated racer. Not a trail shoe.",
		gtin: true,
		widthStructured: false,
		drop: "8mm",
		stack: "40/32mm",
		weight: "198g",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-ridge-2-gtx",
		handle: "ridge-2-gtx",
		title: "Ridge 2 GTX",
		line: "hike",
		type: "Hiking boot",
		categoryProfileId: "footwear.hike",
		price: 198,
		tint: "#4a4038",
		description: "Waterproof mid hiking boot. GORE-TEX, shank, sticky outsole.",
		gtin: true,
		widthStructured: false,
		drop: "10mm",
		weight: "540g",
		waterproof: "GORE-TEX",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-ridge-2",
		handle: "ridge-2",
		title: "Ridge 2",
		line: "hike",
		type: "Hiking boot",
		categoryProfileId: "footwear.hike",
		price: 178,
		tint: "#5a4c42",
		description: "Non-GTX Ridge 2 for dry three-season hiking.",
		gtin: true,
		widthStructured: false,
		drop: "10mm",
		weight: "510g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-alpine-last",
		handle: "alpine-last",
		title: "Alpine Last",
		line: "hike",
		type: "Hiking boot",
		categoryProfileId: "footwear.hike",
		price: 188,
		tint: "#3a4650",
		description: "Three-season hiking boot on a roomy last. Weekend trips, 20-mile days.",
		gtin: false,
		widthStructured: false,
		drop: "8mm",
		weight: "480g",
		waterproof: "DWR",
		jsonldOk: false,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-alpine-last-wide",
		handle: "alpine-last-wide",
		title: "Alpine Last Wide",
		line: "hike",
		type: "Hiking boot",
		categoryProfileId: "footwear.hike",
		price: 188,
		tint: "#323e48",
		description: "Alpine Last in 2E. Same shank and outsole.",
		gtin: false,
		widthStructured: true,
		drop: "8mm",
		weight: "492g",
		waterproof: "DWR",
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-switchback",
		handle: "switchback-mid",
		title: "Switchback Mid",
		line: "hike",
		type: "Hiking boot",
		categoryProfileId: "footwear.hike",
		price: 168,
		tint: "#4e5a3a",
		description: "Lighter mid for hut-to-hut hiking. Compatible with microspikes.",
		gtin: false,
		widthStructured: false,
		drop: "8mm",
		weight: "430g",
		waterproof: "No",
		jsonldOk: true,
		alt: false,
		optionNameOk: true
	},
	{
		id: "p-approach",
		handle: "approach-quiet",
		title: "Approach Quiet",
		line: "hike",
		type: "Approach shoe",
		categoryProfileId: "footwear.hike",
		price: 156,
		tint: "#3a3a42",
		description: "Quiet scrambling shoe. Sticky rubber, low profile, no squeak.",
		gtin: false,
		widthStructured: false,
		drop: "4mm",
		weight: "310g",
		waterproof: "No",
		jsonldOk: true,
		alt: true,
		optionNameOk: false
	},
	{
		id: "p-aftercamp",
		handle: "aftercamp-slide",
		title: "Aftercamp Slide",
		line: "recovery",
		type: "Recovery sandal",
		categoryProfileId: "footwear.recovery",
		price: 58,
		tint: "#6a5a48",
		description: "Post-trail recovery slide. Contoured footbed.",
		gtin: false,
		widthStructured: false,
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-aftercamp-wide",
		handle: "aftercamp-slide-wide",
		title: "Aftercamp Slide Wide",
		line: "recovery",
		type: "Recovery sandal",
		categoryProfileId: "footwear.recovery",
		price: 58,
		tint: "#5a4c3e",
		description: "Aftercamp in 2E.",
		gtin: false,
		widthStructured: true,
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	},
	{
		id: "p-lodge",
		handle: "lodge-wool",
		title: "Lodge Wool",
		line: "recovery",
		type: "Recovery slipper",
		categoryProfileId: "footwear.recovery",
		price: 72,
		tint: "#5a4858",
		description: "Wool recovery slipper for hut nights.",
		gtin: false,
		widthStructured: false,
		jsonldOk: false,
		alt: false,
		optionNameOk: true
	},
	{
		id: "p-lodge-wide",
		handle: "lodge-wool-wide",
		title: "Lodge Wool Wide",
		line: "recovery",
		type: "Recovery slipper",
		categoryProfileId: "footwear.recovery",
		price: 72,
		tint: "#4a3c4a",
		description: "Lodge Wool in 2E.",
		gtin: false,
		widthStructured: true,
		jsonldOk: true,
		alt: true,
		optionNameOk: true
	}
];
function readinessFor(seed) {
	const identity = (seed.gtin ? 1 : .4) * 100;
	const core = ((seed.alt ? 1 : .5) * .5 + .5) * 100;
	const taxonomy = 90;
	const decision = ((seed.widthStructured ? 1 : .2) * .35 + (seed.drop ? .7 : 0) * .25 + (seed.waterproof !== void 0 ? .6 : .4) * .2 + .2) * 100;
	const variants = (seed.optionNameOk ? 1 : .35) * 100;
	const offer = seed.jsonldOk ? 88 : 42;
	const policy = 80;
	const machine = seed.jsonldOk ? 78 : 36;
	const components = {
		identity,
		core,
		taxonomy,
		decision: Math.min(100, decision),
		variants,
		offer,
		policy,
		machine
	};
	const score = catalogReadiness(components);
	const gaps = [
		["Missing GTIN", identity],
		["Width not structured", seed.widthStructured ? 100 : 20],
		["JSON-LD Offer incomplete", offer],
		["Vague option names", variants],
		["Missing image alt", seed.alt ? 100 : 40]
	];
	gaps.sort((a, b) => a[1] - b[1]);
	return {
		score,
		components,
		topGap: gaps[0][0]
	};
}
var products = productSeeds.map((seed) => {
	const r = readinessFor(seed);
	const widths = seed.widthStructured || seed.title.includes("Wide") ? seed.title.includes("Wide") ? ["2E"] : ["D", "2E"] : ["D"];
	const facts = [
		fact("brand", "Brand", "Ridgeway", "verified", "shopify_field", "product.vendor", 1),
		fact("title", "Title", seed.title, "verified", "shopify_field", "product.title", 1),
		fact("gtin", "GTIN", seed.gtin ? "present on variants" : "missing", seed.gtin ? "verified" : "missing", "shopify_field", "variant.barcode", seed.gtin ? 1 : 0),
		fact("width", "Width", seed.widthStructured ? "D / 2E structured" : "Only in variant title", seed.widthStructured ? "verified" : "missing", seed.widthStructured ? "shopify_field" : "merchant_html", seed.widthStructured ? "variant.option.width" : "product.title", seed.widthStructured ? .95 : .35)
	];
	if (seed.drop) facts.push(fact("drop", "Drop", seed.drop, "inferred", "merchant_html", "product.description", .7));
	if (seed.stack) facts.push(fact("stack", "Stack height", seed.stack, "inferred", "merchant_html", "product.description", .65));
	if (seed.weight) facts.push(fact("weight", "Weight", seed.weight, "verified", "shopify_field", "product.metafield.weight", .9));
	if (seed.waterproof !== void 0) facts.push(fact("waterproof", "Waterproof", seed.waterproof, seed.title.includes("GTX") ? "verified" : "inferred", seed.title.includes("GTX") ? "shopify_field" : "merchant_html", seed.title.includes("GTX") ? "product.title" : "product.description", seed.title.includes("GTX") ? .95 : .6));
	if (!seed.jsonldOk) facts.push(fact("jsonld.availability", "JSON-LD availability", "missing", "missing", "merchant_jsonld", "script[type=ld+json]", 1));
	return {
		id: seed.id,
		handle: seed.handle,
		title: seed.title,
		vendor: "Ridgeway",
		productType: seed.type,
		line: seed.line,
		categoryProfileId: seed.categoryProfileId,
		status: "active",
		canonicalUrl: `https://ridgeway.example/products/${seed.handle}`,
		priceFrom: seed.price,
		priceTo: seed.price,
		variantCount: widths.length * 6,
		variants: sizes(seed.handle.replace(/-/g, "").slice(0, 8), seed.gtin ? 19e10 + seed.id.length * 1e3 : null, seed.price, widths),
		facts,
		readiness: r.score,
		readinessComponents: r.components,
		topGap: r.topGap,
		offerFreshness: seed.id === "p-cascade-gtx" ? "conflict" : seed.jsonldOk ? "fresh" : "stale",
		lastSync: NOW,
		tint: seed.tint,
		description: seed.description
	};
});
var intents = [
	{
		id: "i-pnw-wet",
		text: "waterproof trail running shoes for muddy Pacific Northwest winters",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.trail",
		weight: 1.4,
		priority: true,
		status: "active",
		linkedProductIds: ["p-cascade-gtx"],
		merchantP: {
			shopify_catalog: .86,
			openai_web: .42,
			perplexity_sonar: .38
		},
		typicalRank: 3,
		competitorMix: [
			{
				brandId: "hoka",
				p: .92,
				typicalRank: 1
			},
			{
				brandId: "salomon",
				p: .88,
				typicalRank: 2
			},
			{
				brandId: "rei",
				p: .55,
				typicalRank: 4
			}
		]
	},
	{
		id: "i-wide-over",
		text: "wide-fit trail shoes for overpronation",
		source: "synthetic",
		type: "constraint",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1.3,
		priority: true,
		status: "active",
		linkedProductIds: ["p-drift-2-wide", "p-bridge-3-wide"],
		merchantP: {
			shopify_catalog: .7,
			openai_web: .22,
			perplexity_sonar: .18
		},
		typicalRank: 4,
		competitorMix: [{
			brandId: "altra",
			p: .95,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .6,
			typicalRank: 2
		}]
	},
	{
		id: "i-light-hike",
		text: "lightweight hiking boots under 2 pounds",
		source: "synthetic",
		type: "attribute",
		funnelStage: "evaluation",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: 1.1,
		priority: true,
		status: "active",
		linkedProductIds: ["p-switchback", "p-alpine-last"],
		merchantP: {
			shopify_catalog: .8,
			openai_web: .36,
			perplexity_sonar: .33
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .9,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .4,
			typicalRank: 3
		}]
	},
	{
		id: "i-rocky",
		text: "best trail runners for rocky technical descents",
		source: "synthetic",
		type: "category",
		funnelStage: "discovery",
		specificity: "broad",
		categoryProfileId: "footwear.trail",
		weight: 1.2,
		priority: true,
		status: "active",
		linkedProductIds: ["p-scree-pro", "p-volcanic"],
		merchantP: {
			shopify_catalog: .78,
			openai_web: .4,
			perplexity_sonar: .37
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .9,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .85,
			typicalRank: 2
		}]
	},
	{
		id: "i-zero-drop",
		text: "zero-drop hiking shoes with toe protection",
		source: "synthetic",
		type: "attribute",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.hike",
		weight: .9,
		priority: true,
		status: "active",
		linkedProductIds: ["p-approach"],
		merchantP: {
			shopify_catalog: .35,
			openai_web: .08,
			perplexity_sonar: .1
		},
		typicalRank: 6,
		competitorMix: [{
			brandId: "altra",
			p: .96,
			typicalRank: 1
		}]
	},
	{
		id: "i-women-stack",
		text: "women's trail running shoes with high stack",
		source: "synthetic",
		type: "audience",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.trail",
		weight: 1,
		priority: true,
		status: "active",
		linkedProductIds: ["p-cascade", "p-hut-pack"],
		merchantP: {
			shopify_catalog: .55,
			openai_web: .28,
			perplexity_sonar: .24
		},
		typicalRank: 4,
		competitorMix: [{
			brandId: "hoka",
			p: .95,
			typicalRank: 1
		}, {
			brandId: "on",
			p: .5,
			typicalRank: 3
		}]
	},
	{
		id: "i-vs-speedgoat",
		text: "Ridgeway Cascade GTX vs Hoka Speedgoat",
		source: "merchant",
		type: "comparison",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1.5,
		priority: true,
		status: "active",
		linkedProductIds: ["p-cascade-gtx"],
		merchantP: {
			shopify_catalog: .95,
			openai_web: .62,
			perplexity_sonar: .58
		},
		typicalRank: 2,
		competitorMix: [{
			brandId: "hoka",
			p: .98,
			typicalRank: 1
		}]
	},
	{
		id: "i-20-miles",
		text: "shoes for backpacking 20 miles a day",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: 1.2,
		priority: true,
		status: "active",
		linkedProductIds: ["p-ridge-2-gtx", "p-alpine-last"],
		merchantP: {
			shopify_catalog: .74,
			openai_web: .34,
			perplexity_sonar: .3
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .88,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .55,
			typicalRank: 2
		}]
	},
	{
		id: "i-drain",
		text: "breathable summer trail shoes that drain well",
		source: "synthetic",
		type: "constraint",
		funnelStage: "evaluation",
		specificity: "mid-tail",
		categoryProfileId: "footwear.trail",
		weight: 1,
		priority: true,
		status: "active",
		linkedProductIds: ["p-drift-2", "p-cascade"],
		merchantP: {
			shopify_catalog: .82,
			openai_web: .48,
			perplexity_sonar: .44
		},
		typicalRank: 2,
		competitorMix: [{
			brandId: "salomon",
			p: .7,
			typicalRank: 2
		}, {
			brandId: "altra",
			p: .45,
			typicalRank: 3
		}]
	},
	{
		id: "i-microspikes",
		text: "hiking boots compatible with microspikes",
		source: "synthetic",
		type: "compatibility",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.hike",
		weight: .9,
		priority: true,
		status: "active",
		linkedProductIds: ["p-switchback", "p-ridge-2-gtx"],
		merchantP: {
			shopify_catalog: .6,
			openai_web: .16,
			perplexity_sonar: .14
		},
		typicalRank: 5,
		competitorMix: [{
			brandId: "salomon",
			p: .8,
			typicalRank: 1
		}]
	},
	{
		id: "i-hybrid",
		text: "cushioned road-to-trail hybrid shoes",
		source: "synthetic",
		type: "category",
		funnelStage: "discovery",
		specificity: "broad",
		categoryProfileId: "footwear.road",
		weight: 1,
		priority: false,
		status: "active",
		linkedProductIds: ["p-bridge-3"],
		merchantP: {
			shopify_catalog: .77,
			openai_web: .4,
			perplexity_sonar: .36
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "on",
			p: .9,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .7,
			typicalRank: 2
		}]
	},
	{
		id: "i-vegan",
		text: "vegan trail running shoes without leather",
		source: "synthetic",
		type: "constraint",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: .7,
		priority: false,
		status: "active",
		linkedProductIds: ["p-drift-2"],
		merchantP: {
			shopify_catalog: .5,
			openai_web: .2,
			perplexity_sonar: .18
		},
		typicalRank: 4,
		competitorMix: [{
			brandId: "altra",
			p: .7,
			typicalRank: 1
		}, {
			brandId: "on",
			p: .4,
			typicalRank: 3
		}]
	},
	{
		id: "i-ankles",
		text: "stable hiking boots for weak ankles",
		source: "synthetic",
		type: "audience",
		funnelStage: "evaluation",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: 1,
		priority: false,
		status: "active",
		linkedProductIds: ["p-ridge-2-gtx", "p-alpine-last"],
		merchantP: {
			shopify_catalog: .7,
			openai_web: .3,
			perplexity_sonar: .28
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .85,
			typicalRank: 1
		}]
	},
	{
		id: "i-scramble",
		text: "quiet approach shoes for scrambling",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "specific",
		categoryProfileId: "footwear.hike",
		weight: .8,
		priority: false,
		status: "active",
		linkedProductIds: ["p-approach"],
		merchantP: {
			shopify_catalog: .72,
			openai_web: .26,
			perplexity_sonar: .22
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .75,
			typicalRank: 1
		}]
	},
	{
		id: "i-bunions",
		text: "wide toe box trail shoes for bunions",
		source: "synthetic",
		type: "constraint",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1.2,
		priority: true,
		status: "active",
		linkedProductIds: ["p-drift-2-wide"],
		merchantP: {
			shopify_catalog: .68,
			openai_web: .18,
			perplexity_sonar: .16
		},
		typicalRank: 5,
		competitorMix: [{
			brandId: "altra",
			p: .97,
			typicalRank: 1
		}]
	},
	{
		id: "i-alps",
		text: "best shoes for hut-to-hut hiking in the Alps",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: .9,
		priority: false,
		status: "active",
		linkedProductIds: ["p-switchback", "p-hut-pack"],
		merchantP: {
			shopify_catalog: .58,
			openai_web: .22,
			perplexity_sonar: .2
		},
		typicalRank: 4,
		competitorMix: [{
			brandId: "salomon",
			p: .9,
			typicalRank: 1
		}, {
			brandId: "hoka",
			p: .5,
			typicalRank: 2
		}]
	},
	{
		id: "i-no-overheat",
		text: "waterproof hiking boots that don't overheat",
		source: "synthetic",
		type: "constraint",
		funnelStage: "evaluation",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: 1.1,
		priority: true,
		status: "active",
		linkedProductIds: ["p-ridge-2-gtx"],
		merchantP: {
			shopify_catalog: .76,
			openai_web: .32,
			perplexity_sonar: .3
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .86,
			typicalRank: 1
		}]
	},
	{
		id: "i-recovery",
		text: "recovery sandals after long trail days",
		source: "synthetic",
		type: "category",
		funnelStage: "discovery",
		specificity: "broad",
		categoryProfileId: "footwear.recovery",
		weight: .6,
		priority: false,
		status: "active",
		linkedProductIds: ["p-aftercamp"],
		merchantP: {
			shopify_catalog: .4,
			openai_web: .06,
			perplexity_sonar: .05
		},
		typicalRank: 7,
		competitorMix: [{
			brandId: "hoka",
			p: .5,
			typicalRank: 2
		}, {
			brandId: "on",
			p: .4,
			typicalRank: 3
		}]
	},
	{
		id: "i-granite",
		text: "durable outsole for granite and scree",
		source: "synthetic",
		type: "attribute",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1,
		priority: false,
		status: "active",
		linkedProductIds: ["p-scree-pro", "p-volcanic"],
		merchantP: {
			shopify_catalog: .7,
			openai_web: .34,
			perplexity_sonar: .3
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .88,
			typicalRank: 1
		}]
	},
	{
		id: "i-size14",
		text: "men's size 14 trail running shoes",
		source: "merchant",
		type: "constraint",
		funnelStage: "purchase",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: .8,
		priority: false,
		status: "active",
		linkedProductIds: ["p-cascade-gtx"],
		merchantP: {
			shopify_catalog: .2,
			openai_web: .05,
			perplexity_sonar: .04
		},
		typicalRank: 8,
		competitorMix: [{
			brandId: "hoka",
			p: .7,
			typicalRank: 1
		}, {
			brandId: "altra",
			p: .6,
			typicalRank: 2
		}]
	},
	{
		id: "i-weekend",
		text: "lightweight 3-season hiking boots for weekend trips",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.hike",
		weight: 1,
		priority: false,
		status: "active",
		linkedProductIds: ["p-alpine-last", "p-switchback"],
		merchantP: {
			shopify_catalog: .73,
			openai_web: .38,
			perplexity_sonar: .34
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .8,
			typicalRank: 1
		}]
	},
	{
		id: "i-rockplate",
		text: "trail shoes with rock plate for sharp volcanic rock",
		source: "synthetic",
		type: "attribute",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1.1,
		priority: true,
		status: "active",
		linkedProductIds: ["p-volcanic", "p-scree-pro"],
		merchantP: {
			shopify_catalog: .8,
			openai_web: .36,
			perplexity_sonar: .32
		},
		typicalRank: 3,
		competitorMix: [{
			brandId: "salomon",
			p: .7,
			typicalRank: 2
		}, {
			brandId: "hoka",
			p: .5,
			typicalRank: 3
		}]
	},
	{
		id: "i-altra-alt",
		text: "alternative to Salomon Ultra Glide for wide feet",
		source: "synthetic",
		type: "alternative",
		funnelStage: "evaluation",
		specificity: "specific",
		categoryProfileId: "footwear.trail",
		weight: 1,
		priority: false,
		status: "active",
		linkedProductIds: ["p-drift-2-wide"],
		merchantP: {
			shopify_catalog: .5,
			openai_web: .2,
			perplexity_sonar: .18
		},
		typicalRank: 4,
		competitorMix: [{
			brandId: "altra",
			p: .9,
			typicalRank: 1
		}, {
			brandId: "salomon",
			p: .85,
			typicalRank: 2
		}]
	},
	{
		id: "i-buy-ridge",
		text: "buy Ridgeway Ridge 2 GTX",
		source: "merchant",
		type: "branded",
		funnelStage: "purchase",
		specificity: "specific",
		categoryProfileId: "footwear.hike",
		weight: 1.6,
		priority: true,
		status: "active",
		linkedProductIds: ["p-ridge-2-gtx"],
		merchantP: {
			shopify_catalog: .98,
			openai_web: .88,
			perplexity_sonar: .84
		},
		typicalRank: 1,
		competitorMix: [{
			brandId: "rei",
			p: .7,
			typicalRank: 2
		}, {
			brandId: "backcountry",
			p: .5,
			typicalRank: 3
		}]
	},
	{
		id: "i-fastpack",
		text: "shoes for fastpacking with a 20L pack",
		source: "synthetic",
		type: "situation",
		funnelStage: "discovery",
		specificity: "mid-tail",
		categoryProfileId: "footwear.trail",
		weight: .9,
		priority: false,
		status: "active",
		linkedProductIds: ["p-hut-pack"],
		merchantP: {
			shopify_catalog: .76,
			openai_web: .4,
			perplexity_sonar: .36
		},
		typicalRank: 2,
		competitorMix: [{
			brandId: "salomon",
			p: .75,
			typicalRank: 2
		}, {
			brandId: "hoka",
			p: .55,
			typicalRank: 3
		}]
	}
];
var MODELS = {
	shopify_catalog: "shopify-catalog-2026-07",
	openai_web: "gpt-4.1-mini + web_search",
	perplexity_sonar: "sonar-pro"
};
function daysAgo(n) {
	const d = /* @__PURE__ */ new Date("2026-08-29T12:00:00.000Z");
	d.setUTCDate(d.getUTCDate() - n);
	return d.toISOString();
}
function buildMentions(intent, adapterId, included, merchantRank) {
	const mentions = [];
	const usedRanks = /* @__PURE__ */ new Set();
	if (included && merchantRank) {
		const productId = intent.linkedProductIds[0] ?? null;
		const product = products.find((p) => p.id === productId);
		mentions.push({
			id: `${intent.id}-${adapterId}-ridgeway`,
			brandId: "ridgeway",
			productId,
			displayText: product ? `Ridgeway ${product.title}` : "Ridgeway",
			rank: merchantRank,
			rankCredit: rankCredit(merchantRank),
			kind: adapterId === "shopify_catalog" ? "product_recommendation" : merchantRank <= 3 ? "product_recommendation" : "brand",
			url: product?.canonicalUrl ?? "https://ridgeway.example",
			domain: "ridgeway.example",
			matchConfidence: .96,
			resolved: true
		});
		usedRanks.add(merchantRank);
	}
	for (const mix of intent.competitorMix) {
		if (rng() > mix.p) continue;
		let rank = mix.typicalRank;
		while (usedRanks.has(rank)) rank += 1;
		usedRanks.add(rank);
		const brand = brands.find((b) => b.id === mix.brandId);
		const isRetailer = brand.entityType === "retailer";
		mentions.push({
			id: `${intent.id}-${adapterId}-${mix.brandId}-${rank}`,
			brandId: mix.brandId,
			productId: null,
			displayText: isRetailer ? `${brand.name} — Ridgeway listing` : brand.name,
			rank,
			rankCredit: rankCredit(rank),
			kind: isRetailer ? "merchant_offer" : "product_recommendation",
			url: `https://${brand.domain}`,
			domain: brand.domain,
			matchConfidence: .9,
			resolved: true
		});
	}
	mentions.sort((a, b) => a.rank - b.rank);
	return mentions;
}
function generateObservations() {
	const out = [];
	let n = 0;
	for (const intent of intents) for (const adapter of adapters) {
		const reps = intent.priority ? 3 : 1;
		for (let r = 1; r <= reps; r++) {
			n += 1;
			const p = intent.merchantP[adapter.id] ?? .3;
			const included = rng() < p;
			const merchantRank = included ? Math.max(1, Math.round(intent.typicalRank + (rng() - .4) * 2)) : null;
			const merchantLink = included && (adapter.id === "shopify_catalog" ? rng() < .92 : rng() < .28);
			const citedMerchant = included && (merchantLink || rng() < .18);
			const mentions = buildMentions(intent, adapter.id, included, merchantRank);
			const dayOffset = intent.priority ? r * 1.1 + rng() * 2 : rng() * 10;
			out.push({
				id: `obs-${n}`,
				intentId: intent.id,
				adapterId: adapter.id,
				repetition: r,
				observedAt: daysAgo(Math.floor(dayOffset)),
				signalClass: adapter.signalClass,
				model: MODELS[adapter.id],
				locale: "en-US",
				merchantIncluded: included,
				merchantRank,
				merchantLink,
				citedMerchant,
				latencyMs: Math.round(400 + rng() * 1800),
				costUsd: adapter.id === "shopify_catalog" ? .002 : .016 + rng() * .01,
				rawExcerpt: included ? `…${mentions[0]?.displayText ?? "Ridgeway"} is a relevant option for “${intent.text}”. Trade-offs include weight, waterproofing, and last shape…` : `Recommendations for “${intent.text}” emphasize ${mentions[0]?.displayText ?? "established trail brands"} with structured fit attributes…`,
				mentions
			});
		}
	}
	return out;
}
var observations = generateObservations();
var issues = [
	{
		id: "iss-gtin",
		ruleCode: "identity.gtin.missing",
		classification: "confirmed",
		title: "GTIN missing on 14 of 24 products",
		description: "Barcode/GTIN is empty on most trail and hiking variants. Identity resolution therefore falls back to title matching on catalog and API probes.",
		whyItMatters: "Official catalog retrieval and shopping feeds prefer stable GTINs. Without them, variants collapse and merchant-link matching is weaker.",
		mechanism: "Improve product identity matching on S2 catalog retrieval and S3 entity resolution.",
		confidence: .96,
		expectedImpact: 4,
		effort: 2,
		risk: 1,
		affectedProductIds: products.filter((p) => p.facts.some((f) => f.key === "gtin" && f.status === "missing")).map((p) => p.id),
		affectedIntentIds: intents.map((i) => i.id),
		proposedChanges: [{
			target: "variant.barcode",
			value: "Merchant-supplied GTIN/UPC per variant",
			provenance: "shopify_field — currently empty"
		}],
		successMetric: "Share of variants with GTIN; merchant-link match confidence",
		firstDetectedAt: "2026-08-01T00:00:00.000Z",
		evidence: ["S5: 14/24 products have empty variant.barcode", "S2: unmatched catalog rows on size 13 Cascade"],
		counterevidence: ["Branded purchase intent still resolves via domain"]
	},
	{
		id: "iss-jsonld",
		ruleCode: "schema.offer.availability",
		classification: "confirmed",
		title: "JSON-LD Offer missing availability on 8 product pages",
		description: "Product pages for Scree Pro, Volcanic, Alpine Last, Lodge Wool and others emit Product markup without Offer.availability.",
		whyItMatters: "Catalog and shopping surfaces treat incomplete Offer nodes as stale or ineligible.",
		mechanism: "Restore machine-readable offer freshness.",
		confidence: .94,
		expectedImpact: 3,
		effort: 2,
		risk: 1,
		affectedProductIds: products.filter((p) => !productSeeds.find((s) => s.id === p.id)?.jsonldOk).map((p) => p.id),
		affectedIntentIds: [
			"i-rocky",
			"i-rockplate",
			"i-weekend",
			"i-recovery"
		],
		proposedChanges: [{
			target: "jsonld.Offer.availability",
			value: "https://schema.org/InStock (from Shopify inventory)",
			provenance: "merchant_jsonld"
		}],
		successMetric: "Valid Product+Offer nodes on crawled pages",
		firstDetectedAt: "2026-08-01T00:00:00.000Z",
		evidence: ["S5: 8 pages fail Offer.availability", "S5: Volcanic schema_hash stale vs Shopify price"],
		counterevidence: []
	},
	{
		id: "iss-option1",
		ruleCode: "variants.option.vague",
		classification: "confirmed",
		title: "Variant option named “Option 1” on Volcanic and Approach Quiet",
		description: "Two products still use the Shopify default option name instead of Width or Last.",
		whyItMatters: "Agents and feeds cannot interpret Option 1 as a fit dimension.",
		mechanism: "Expose explicit option names for retrieval filters.",
		confidence: .99,
		expectedImpact: 3,
		effort: 1,
		risk: 1,
		affectedProductIds: ["p-volcanic", "p-approach"],
		affectedIntentIds: ["i-rockplate", "i-scramble"],
		proposedChanges: [{
			target: "product.options[0].name",
			value: "Width",
			provenance: "shopify_field"
		}],
		successMetric: "No products with default option names",
		firstDetectedAt: "2026-08-02T00:00:00.000Z",
		evidence: ["S5: option name = Option 1"],
		counterevidence: []
	},
	{
		id: "iss-width",
		ruleCode: "footwear.width.unstructured",
		classification: "confirmed",
		title: "Width is unstructured on 18 products",
		description: "2E lasts exist (Drift 2 Wide, Bridge 3 Wide, Alpine Last Wide) but most products do not expose width as a typed attribute. Category profile footwear.trail marks width as required.",
		whyItMatters: "Wide-fit and bunion intents currently resolve to Altra because width is a first-class filter there.",
		mechanism: "Improve matching on width-constrained retrieval.",
		confidence: .91,
		expectedImpact: 5,
		effort: 2,
		risk: 1,
		affectedProductIds: products.filter((p) => p.facts.some((f) => f.key === "width" && f.status !== "verified")).map((p) => p.id),
		affectedIntentIds: [
			"i-wide-over",
			"i-bunions",
			"i-altra-alt"
		],
		proposedChanges: [{
			target: "product.metafield.fit.width",
			value: "D | 2E | 4E — merchant confirmation required for remaining SKUs",
			provenance: "shopify_field on wide SKUs only"
		}],
		successMetric: "Inclusion rate on width-related intents",
		firstDetectedAt: "2026-08-01T00:00:00.000Z",
		evidence: ["S5: category profile requires width", "S3: Altra occupies rank 1 on 11/12 wide-fit probes"],
		counterevidence: ["Drift 2 Wide already has structured width and appears in Shopify Catalog for that intent"]
	},
	{
		id: "iss-price-conflict",
		ruleCode: "offer.price.conflict",
		classification: "confirmed",
		title: "Cascade GTX price disagrees between Shopify and JSON-LD",
		description: "Shopify variant price is $168; JSON-LD Offer.price is still $158 from the previous season.",
		whyItMatters: "Conflicting offers can suppress retrieval or show the wrong price in catalog surfaces.",
		mechanism: "Align offer freshness across sources.",
		confidence: .97,
		expectedImpact: 3,
		effort: 1,
		risk: 1,
		affectedProductIds: ["p-cascade-gtx"],
		affectedIntentIds: ["i-pnw-wet", "i-vs-speedgoat"],
		proposedChanges: [{
			target: "jsonld.Offer.price",
			value: "168.00 USD",
			provenance: "shopify_field variant.price"
		}],
		successMetric: "Zero price conflicts on active products",
		firstDetectedAt: "2026-08-18T00:00:00.000Z",
		evidence: ["S5: Shopify $168 vs JSON-LD $158", "S5: content hash changed 18 Aug"],
		counterevidence: []
	},
	{
		id: "iss-drop-stack",
		ruleCode: "footwear.geometry.prose_only",
		classification: "supported_hypothesis",
		title: "Drop and stack height live in prose, not attributes",
		description: "Approved competitors expose drop and stack as filterable fields. Ridgeway states them in descriptions (inferred, confidence 0.65–0.70).",
		whyItMatters: "High-stack and zero-drop intents cannot match on structured geometry, so Hoka and Altra occupy those clusters.",
		mechanism: "Improve attribute matching for geometry-constrained intents.",
		confidence: .72,
		expectedImpact: 4,
		effort: 2,
		risk: 1,
		affectedProductIds: products.filter((p) => p.line !== "recovery").map((p) => p.id),
		affectedIntentIds: [
			"i-women-stack",
			"i-zero-drop",
			"i-vs-speedgoat"
		],
		proposedChanges: [{
			target: "product.metafield.spec.drop_mm",
			value: "Merchant confirmation required — values currently inferred from description",
			provenance: "merchant_html product.description"
		}],
		successMetric: "Inclusion rate on stack/drop intents; reduction in inferred-only geometry facts",
		firstDetectedAt: "2026-08-04T00:00:00.000Z",
		evidence: ["S6: Hoka listings cite stack height in 9/10 high-stack probes", "S5: Ridgeway drop facts are inferred"],
		counterevidence: ["Shopify Catalog still retrieves Cascade on branded comparison"]
	},
	{
		id: "iss-gtx-struct",
		ruleCode: "footwear.waterproof.untyped",
		classification: "supported_hypothesis",
		title: "Waterproof is in the title, not a typed attribute",
		description: "GTX products are named clearly, but waterproof is not a metafield or Product additionalProperty. Non-GTX Cascade is sometimes retrieved for waterproof intents.",
		whyItMatters: "S3 probes often prefer Hoka/Salomon GTX models whose feeds mark waterproof=true.",
		mechanism: "Improve matching for waterproof-constrained product retrieval.",
		confidence: .7,
		expectedImpact: 4,
		effort: 2,
		risk: 1,
		affectedProductIds: [
			"p-cascade-gtx",
			"p-cascade",
			"p-ridge-2-gtx",
			"p-ridge-2"
		],
		affectedIntentIds: ["i-pnw-wet", "i-no-overheat"],
		proposedChanges: [{
			target: "product.metafield.spec.waterproof",
			value: "gore-tex | dwr | none",
			provenance: "product.title contains GTX"
		}],
		successMetric: "Inclusion rate on waterproof intents; fewer non-GTX false retrieves",
		firstDetectedAt: "2026-08-04T00:00:00.000Z",
		evidence: ["S3: OpenAI web-search probe included non-GTX Cascade in 2 waterproof runs", "S6: competitor GTX SKUs expose a waterproof attribute"],
		counterevidence: ["S2 Shopify Catalog ranks Cascade GTX first for the PNW intent"]
	},
	{
		id: "iss-merchant-link",
		ruleCode: "offer.merchant_link.low",
		classification: "supported_hypothesis",
		title: "Probes cite REI and Backcountry more than ridgeway.example",
		description: "When Ridgeway is recommended on S3 probes, the offer URL is often a retailer. DTC merchant-link share is 28% on API probes vs 92% on Shopify Catalog.",
		whyItMatters: "A brand mention is not a merchant offer. Retailer links send the session elsewhere.",
		mechanism: "Increase eligible DTC offer presence in cited sources.",
		confidence: .68,
		expectedImpact: 4,
		effort: 3,
		risk: 1,
		affectedProductIds: products.map((p) => p.id),
		affectedIntentIds: [
			"i-buy-ridge",
			"i-pnw-wet",
			"i-20-miles"
		],
		proposedChanges: [{
			target: "product.canonical_url + Offer.url",
			value: "Ensure canonical product URLs are crawlable and match feed item IDs",
			provenance: "observation.mentions.domain"
		}],
		successMetric: "Merchant link share on S3 probes",
		firstDetectedAt: "2026-08-05T00:00:00.000Z",
		evidence: ["S3: 41 retailer offer URLs vs 16 ridgeway.example URLs", "S2: catalog links resolve to merchant"],
		counterevidence: ["Branded purchase intent still returns ridgeway.example first"]
	},
	{
		id: "iss-recovery",
		ruleCode: "coverage.line.recovery",
		classification: "opportunity",
		title: "Recovery line has almost no intent coverage",
		description: "Aftercamp and Lodge Wool are in the catalog but the approved panel only has one recovery intent, and inclusion is near zero on S3.",
		whyItMatters: "If recovery is commercially important, it is currently unmeasured. If it is not, it is diluting catalog-readiness averages.",
		mechanism: "Either add recovery intents with business weight, or exclude the line from the panel average.",
		confidence: .64,
		expectedImpact: 2,
		effort: 1,
		risk: 1,
		affectedProductIds: products.filter((p) => p.line === "recovery").map((p) => p.id),
		affectedIntentIds: ["i-recovery"],
		proposedChanges: [{
			target: "intent.panel",
			value: "Add 3 recovery intents or exclude the line from store average",
			provenance: "user"
		}],
		successMetric: "Intent coverage for recovery cluster, or documented exclusion",
		firstDetectedAt: "2026-08-08T00:00:00.000Z",
		evidence: ["S3: 1/9 recovery observations included Ridgeway", "S5: 4 recovery products in catalog"],
		counterevidence: ["Low business weight currently assigned"]
	},
	{
		id: "iss-alt",
		ruleCode: "access.image.alt",
		classification: "confirmed",
		title: "Missing image alt text on 6 products",
		description: "Scree Pro, Volcanic, Tempo, Switchback Mid, Lodge Wool lack image alt metadata.",
		whyItMatters: "Alt text is a machine-access signal and a source of attribute language (terrain, waterproof, last).",
		mechanism: "Improve machine access and attribute language without inventing claims.",
		confidence: .9,
		expectedImpact: 2,
		effort: 1,
		risk: 1,
		affectedProductIds: [
			"p-scree-pro",
			"p-volcanic",
			"p-tempo",
			"p-switchback",
			"p-lodge"
		],
		affectedIntentIds: ["i-rocky", "i-rockplate"],
		proposedChanges: [{
			target: "product.media.alt",
			value: "Factual alt from title + terrain, no promotional claims",
			provenance: "shopify_field product.media"
		}],
		successMetric: "Alt coverage = 100% of active products",
		firstDetectedAt: "2026-08-02T00:00:00.000Z",
		evidence: ["S5: 6 products with empty media.alt"],
		counterevidence: []
	},
	{
		id: "iss-compare-copy",
		ruleCode: "content.comparison.facts",
		classification: "supported_hypothesis",
		title: "Cascade GTX vs Speedgoat comparison lacks structured facts",
		description: "The branded comparison intent often returns Hoka first. Cascade GTX description does not state drop, weight, and stack as comparable facts — they are buried in prose.",
		whyItMatters: "Comparison prompts reward explicit, comparable specifications.",
		mechanism: "Make verified geometry and weight facts extractable.",
		confidence: .66,
		expectedImpact: 3,
		effort: 2,
		risk: 2,
		affectedProductIds: ["p-cascade-gtx"],
		affectedIntentIds: ["i-vs-speedgoat"],
		proposedChanges: [{
			target: "product.description + metafields",
			value: "Publish only merchant-verified drop/weight/stack; do not copy competitor claims",
			provenance: "merchant_html"
		}],
		successMetric: "Rank credit on the comparison intent; no unsupported comparative claims",
		firstDetectedAt: "2026-08-06T00:00:00.000Z",
		evidence: ["S3: Hoka listed first in 7/9 comparison probes", "S5: drop/stack inferred from prose"],
		counterevidence: ["S2 catalog returns Cascade GTX for the branded query"]
	}
].map((iss) => {
	const evidenceStrength = iss.classification === "confirmed" ? .88 : iss.classification === "supported_hypothesis" ? .62 : .4;
	return {
		...iss,
		evidenceStrength,
		priorityScore: priorityScore({
			expectedImpact: iss.expectedImpact,
			evidenceStrength,
			businessWeight: 1,
			effort: iss.effort,
			risk: iss.risk
		})
	};
});
var experiments = [
	{
		id: "exp-width",
		name: "Structured width on 8 trail SKUs",
		hypothesis: "Exposing width as a typed option/metafield on trail shoes will raise inclusion on wide-fit intents without moving control intents.",
		status: "completed",
		recommendationId: "rec-width",
		issueId: "iss-width",
		primaryMetric: "Inclusion rate on width-related intents (S2+S3)",
		expectedDirection: "up",
		baselineStart: "2026-07-29T00:00:00.000Z",
		baselineEnd: "2026-08-11T00:00:00.000Z",
		implementationAt: "2026-08-12T16:00:00.000Z",
		postStart: "2026-08-13T00:00:00.000Z",
		postEnd: "2026-08-27T00:00:00.000Z",
		treatmentProductIds: [
			"p-drift-2",
			"p-drift-2-wide",
			"p-bridge-3",
			"p-bridge-3-wide"
		],
		treatmentIntentIds: ["i-wide-over", "i-bunions"],
		controlIntentIds: ["i-drain", "i-fastpack"],
		resultLabel: "positive_directional",
		resultSummary: "Treatment inclusion moved +11.4 pp; control +1.2 pp. Difference-in-differences is positive. Interval mostly above zero. No provider/model change in the window. Not a causal proof — labeled directional.",
		confidence: .71,
		confounders: ["Altra launched a new wide last page on 19 Aug (minor S3 competitor copy shift)"],
		preValue: .19,
		postValue: .304,
		controlPre: .44,
		controlPost: .456,
		createdAt: "2026-08-11T00:00:00.000Z"
	},
	{
		id: "exp-gtx",
		name: "Typed waterproof attribute on GTX SKUs",
		hypothesis: "A typed waterproof metafield will raise inclusion on waterproof intents and reduce non-GTX false retrieves.",
		status: "running",
		recommendationId: "rec-gtx",
		issueId: "iss-gtx-struct",
		primaryMetric: "Inclusion rate on waterproof intents",
		expectedDirection: "up",
		baselineStart: "2026-08-08T00:00:00.000Z",
		baselineEnd: "2026-08-21T00:00:00.000Z",
		implementationAt: "2026-08-22T18:30:00.000Z",
		postStart: "2026-08-23T00:00:00.000Z",
		postEnd: null,
		treatmentProductIds: ["p-cascade-gtx", "p-ridge-2-gtx"],
		treatmentIntentIds: ["i-pnw-wet", "i-no-overheat"],
		controlIntentIds: ["i-drain", "i-weekend"],
		resultLabel: null,
		resultSummary: "Post window still open. Early S2 retrieves look stable; S3 sample is too small to classify.",
		confidence: .4,
		confounders: ["Post window < 14 days"],
		preValue: .4,
		postValue: .43,
		controlPre: .41,
		controlPost: .4,
		createdAt: "2026-08-21T00:00:00.000Z"
	},
	{
		id: "exp-geometry",
		name: "Publish drop and stack as metafields",
		hypothesis: "Moving inferred geometry facts into verified metafields will improve rank credit on high-stack and comparison intents.",
		status: "baseline",
		recommendationId: "rec-geometry",
		issueId: "iss-drop-stack",
		primaryMetric: "Rank credit on geometry-constrained intents",
		expectedDirection: "up",
		baselineStart: "2026-08-15T00:00:00.000Z",
		baselineEnd: "2026-08-29T00:00:00.000Z",
		implementationAt: null,
		postStart: null,
		postEnd: null,
		treatmentProductIds: [
			"p-cascade-gtx",
			"p-cascade",
			"p-hut-pack",
			"p-tempo"
		],
		treatmentIntentIds: ["i-women-stack", "i-vs-speedgoat"],
		controlIntentIds: ["i-buy-ridge"],
		resultLabel: null,
		resultSummary: "Baseline frozen. Implement in Shopify, then mark implementation to open the post window.",
		confidence: 0,
		confounders: [],
		preValue: .31,
		postValue: null,
		controlPre: .86,
		controlPost: null,
		createdAt: "2026-08-15T00:00:00.000Z"
	}
];
var weekly = [
	{
		week: "2026-07-20",
		inclusion: .31,
		share: .18,
		readiness: 54,
		coverage: .44
	},
	{
		week: "2026-07-27",
		inclusion: .32,
		share: .19,
		readiness: 54,
		coverage: .44
	},
	{
		week: "2026-08-03",
		inclusion: .33,
		share: .19,
		readiness: 56,
		coverage: .48
	},
	{
		week: "2026-08-10",
		inclusion: .34,
		share: .2,
		readiness: 58,
		coverage: .48
	},
	{
		week: "2026-08-17",
		inclusion: .37,
		share: .22,
		readiness: 61,
		coverage: .52
	},
	{
		week: "2026-08-24",
		inclusion: .39,
		share: .24,
		readiness: 62,
		coverage: .56
	}
];
var weightMap = new Map(intents.map((i) => [i.id, i.weight]));
var approvedBrandIds = new Set(brands.filter((b) => b.status === "approved" && b.entityType === "competitor_brand").map((b) => b.id));
function workspaceMetrics(obs = observations) {
	const inc = inclusionRate(obs, weightMap);
	const link = merchantLinkShare(obs);
	const cite = citationShare(obs);
	const share = recommendationShare(obs, approvedBrandIds, "ridgeway");
	const byIntent = /* @__PURE__ */ new Map();
	for (const o of obs) {
		const list = byIntent.get(o.intentId) ?? [];
		list.push(o);
		byIntent.set(o.intentId, list);
	}
	const active = intents.filter((i) => i.status === "active");
	const covered = active.filter((i) => intentCovered(byIntent.get(i.id) ?? [])).length;
	const coverage = active.length === 0 ? 0 : covered / active.length;
	const readiness = meanReady();
	const avgCredit = obs.filter((o) => o.merchantIncluded && o.merchantRank).reduce((a, o) => a + rankCredit(o.merchantRank), 0) / Math.max(1, obs.filter((o) => o.merchantIncluded).length);
	const visibility = visibilityScore(inc.rate, avgCredit);
	const index = agentRankIndex({
		visibility,
		coverage: coverage * 100,
		readiness,
		sourcePresence: cite * 100,
		intentCount: active.length,
		adapterCount: adapters.length,
		observationCount: obs.length,
		panelCoverage: 1
	});
	return {
		inclusion: inc,
		linkShare: link,
		citationShare: cite,
		recShare: share,
		coverage,
		covered,
		activeIntents: active.length,
		readiness,
		visibility,
		index,
		observationCount: obs.length
	};
}
function meanReady() {
	return products.reduce((a, p) => a + p.readiness, 0) / products.length;
}
var metrics = workspaceMetrics();
var ridgewayPublicAudit = {
	id: "audit-ridgeway-preview",
	url: "https://ridgeway.example",
	email: "demo@ridgeway.example",
	domain: "ridgeway.example",
	createdAt: NOW,
	storeName: "Ridgeway",
	categoryGuess: "Trail and hiking footwear",
	readiness: Math.round(metrics.readiness),
	crawledPages: 28,
	intents: intents.slice(0, 5).map((i) => ({
		text: i.text,
		type: i.type,
		source: i.source
	})),
	issues: issues.slice(0, 3).map((i) => ({
		title: i.title,
		classification: i.classification,
		evidenceClass: i.classification === "confirmed" ? "S5" : "S6"
	})),
	competitors: [
		"Hoka",
		"Salomon",
		"Altra"
	],
	limitations: [
		"Public audit crawled 28 pages — not the full catalog.",
		"Five synthetic intents, labeled synthetic. Not search volume.",
		"Provider API probes are lab samples, not ChatGPT or Perplexity consumer ranking.",
		"No Shopify Admin catalog was connected."
	],
	signalNotes: [
		"S5 deterministic audit on public HTML and JSON-LD.",
		"S3 limited probes on two permitted APIs.",
		"S2 catalog retrieval requires an installed app."
	],
	schemaFindings: [
		{
			rule: "Offer.availability missing",
			severity: "high",
			detail: "8 product pages"
		},
		{
			rule: "gtin12/gtin13 absent",
			severity: "high",
			detail: "Majority of sampled products"
		},
		{
			rule: "Price conflict on Cascade GTX",
			severity: "medium",
			detail: "JSON-LD $158 vs visible $168"
		}
	]
};
function intentObservations(intentId, adapterId) {
	return observations.filter((o) => o.intentId === intentId && (!adapterId || o.adapterId === adapterId));
}
function productById(id) {
	return products.find((p) => p.id === id);
}
function intentById(id) {
	return intents.find((i) => i.id === id);
}
function issueById(id) {
	return issues.find((i) => i.id === id);
}
function brandById(id) {
	return brands.find((b) => b.id === id);
}
function lineLabel(line) {
	return {
		trail: "Trail",
		road: "Road",
		hike: "Hike",
		recovery: "Recovery"
	}[line];
}
//#endregion
export { workspace as S, productById as _, brands as a, ridgewayPublicAudit as b, inclusionRate as c, intents as d, issueById as f, observations as g, metrics as h, brandById as i, intentById as l, lineLabel as m, SIGNAL_META as n, evidenceLabel as o, issues as p, adapters as r, experiments as s, READINESS_WEIGHTS as t, intentObservations as u, products as v, weekly as x, rankCredit as y };
