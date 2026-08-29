import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as generateLocalAudit } from "./generate-SE3YaFLZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-Bs1bChTt.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var enhanceAudit_createServerFn_handler = createServerRpc({
	id: "0e517499775c5a0ef420d8b0956a6ece644aecbcc10e65f36639213e2b1eb216",
	name: "enhanceAudit",
	filename: "src/lib/audit/server.ts"
}, (opts) => enhanceAudit.__executeServer(opts));
var enhanceAudit = createServerFn({ method: "POST" }).validator((input) => input).handler(enhanceAudit_createServerFn_handler, async ({ data }) => {
	const base = generateLocalAudit(data);
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey || base.domain.includes("ridgeway")) return base;
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 700,
				temperature: .3,
				messages: [{
					role: "system",
					content: "You write bounded public-audit notes for a commerce evidence tool. Never invent product facts, prices, GTINs, or competitor ranks. Never claim ChatGPT ranking. Return compact JSON only."
				}, {
					role: "user",
					content: `Store URL domain: ${base.domain}. Return JSON {"categoryGuess": string, "syntheticIntents": string[5], "technicalChecks": string[3], "caveat": string}. Intents must be buyer needs, labeled as synthetic. Technical checks must be things a public HTML pass would look for (schema, GTIN, canonical), not invented findings.`
				}]
			})
		});
		if (!res.ok) return base;
		const text = (await res.json()).choices?.[0]?.message?.content ?? "";
		const jsonStart = text.indexOf("{");
		const jsonEnd = text.lastIndexOf("}");
		if (jsonStart < 0 || jsonEnd < 0) return base;
		const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
		return {
			...base,
			categoryGuess: parsed.categoryGuess ?? base.categoryGuess,
			intents: (parsed.syntheticIntents ?? []).slice(0, 5).map((t, i) => ({
				text: t,
				type: i === 2 ? "branded" : i === 4 ? "comparison" : "category",
				source: "synthetic"
			})),
			schemaFindings: (parsed.technicalChecks ?? []).slice(0, 3).map((detail) => ({
				rule: "Public HTML check",
				severity: "medium",
				detail
			})),
			limitations: parsed.caveat ? [parsed.caveat, ...base.limitations] : base.limitations
		};
	} catch {
		return base;
	}
});
//#endregion
export { enhanceAudit_createServerFn_handler };
