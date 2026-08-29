import type { PublicAudit } from "@/lib/types";
import { ridgewayPublicAudit } from "@/lib/data/seed";
import { slugify } from "@/lib/utils";

function hostOf(url: string) {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0] ?? url;
  }
}

export function generateLocalAudit(input: { url: string; email: string }): PublicAudit {
  const domain = hostOf(input.url);
  const isRidgeway = domain.includes("ridgeway");
  if (isRidgeway) {
    return {
      ...ridgewayPublicAudit,
      id: `audit-${Date.now()}`,
      url: input.url,
      email: input.email,
      createdAt: new Date().toISOString(),
    };
  }

  const storeName = domain.split(".")[0]?.replace(/-/g, " ") ?? domain;
  const titled = storeName.replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    id: `audit-${slugify(domain)}-${Date.now()}`,
    url: input.url,
    email: input.email,
    domain,
    createdAt: new Date().toISOString(),
    storeName: titled,
    categoryGuess: "Unconfirmed — public HTML only",
    readiness: 0,
    crawledPages: 0,
    intents: [
      { text: `best ${titled} products for everyday use`, type: "category", source: "synthetic" },
      { text: `${titled} alternatives with comparable specs`, type: "alternative", source: "synthetic" },
      { text: `where to buy ${titled} directly`, type: "branded", source: "synthetic" },
      { text: `${titled} size and fit details`, type: "attribute", source: "synthetic" },
      { text: `${titled} vs competitors for a specific use case`, type: "comparison", source: "synthetic" },
    ],
    issues: [
      {
        title: "No Shopify Admin catalog was connected",
        classification: "confirmed",
        evidenceClass: "S5",
      },
      {
        title: "Public sample cannot confirm GTIN, inventory, or unpublished fields",
        classification: "confirmed",
        evidenceClass: "S5",
      },
      {
        title: "Provider probes were not run on this preview",
        classification: "opportunity",
        evidenceClass: "S3",
      },
    ],
    competitors: [],
    limitations: [
      "This preview did not crawl a third-party catalog beyond the URL you entered.",
      "No product-level scores are shown because identity cannot be resolved from a URL alone.",
      "Synthetic intents are suggestions, not observed demand.",
      "Install the app (demo workspace) to see a full evidence-graded catalog.",
    ],
    signalNotes: [
      "S5: URL and robots/public-access checks only.",
      "S2/S3: not executed on this free preview for unknown stores.",
    ],
    schemaFindings: [
      {
        rule: "Catalog not connected",
        severity: "high",
        detail: "Connect Shopify to ingest products, variants, and metafields.",
      },
    ],
  };
}

export const AUDIT_STAGES = [
  { id: "validate", label: "Validate domain and robots access" },
  { id: "crawl", label: "Bounded public crawl (≤30 pages)" },
  { id: "schema", label: "Extract JSON-LD and page facts" },
  { id: "intents", label: "Generate labeled synthetic intents" },
  { id: "probes", label: "Limited permitted probes" },
  { id: "report", label: "Compile evidence-classed report" },
] as const;
