import { createServerFn } from "@tanstack/react-start";
import { generateLocalAudit } from "./generate";
import type { PublicAudit } from "@/lib/types";

export const enhanceAudit = createServerFn({ method: "POST" })
  .validator((input: { url: string; email: string }) => input)
  .handler(async ({ data }): Promise<PublicAudit> => {
    const base = generateLocalAudit(data);
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey || base.domain.includes("ridgeway")) return base;

    try {
      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 700,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content:
                "You write bounded public-audit notes for a commerce evidence tool. Never invent product facts, prices, GTINs, or competitor ranks. Never claim ChatGPT ranking. Return compact JSON only.",
            },
            {
              role: "user",
              content: `Store URL domain: ${base.domain}. Return JSON {"categoryGuess": string, "syntheticIntents": string[5], "technicalChecks": string[3], "caveat": string}. Intents must be buyer needs, labeled as synthetic. Technical checks must be things a public HTML pass would look for (schema, GTIN, canonical), not invented findings.`,
            },
          ],
        }),
      });
      if (!res.ok) return base;
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const text = body.choices?.[0]?.message?.content ?? "";
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}");
      if (jsonStart < 0 || jsonEnd < 0) return base;
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
        categoryGuess?: string;
        syntheticIntents?: string[];
        technicalChecks?: string[];
        caveat?: string;
      };
      return {
        ...base,
        categoryGuess: parsed.categoryGuess ?? base.categoryGuess,
        intents: (parsed.syntheticIntents ?? []).slice(0, 5).map((t, i) => ({
          text: t,
          type: i === 2 ? "branded" : i === 4 ? "comparison" : "category",
          source: "synthetic" as const,
        })),
        schemaFindings: (parsed.technicalChecks ?? []).slice(0, 3).map((detail) => ({
          rule: "Public HTML check",
          severity: "medium" as const,
          detail,
        })),
        limitations: parsed.caveat ? [parsed.caveat, ...base.limitations] : base.limitations,
      };
    } catch {
      return base;
    }
  });
