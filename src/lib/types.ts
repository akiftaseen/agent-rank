export type SignalClass = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export type IntentSource = "synthetic" | "merchant" | "first_party" | "imported";
export type IntentType =
  | "category"
  | "constraint"
  | "attribute"
  | "audience"
  | "situation"
  | "compatibility"
  | "comparison"
  | "alternative"
  | "branded";
export type FunnelStage = "discovery" | "evaluation" | "purchase";
export type Specificity = "broad" | "mid-tail" | "specific";
export type IssueClass = "confirmed" | "supported_hypothesis" | "opportunity";
export type IssueStatus = "open" | "dismissed" | "snoozed" | "exported";
export type ExperimentStatus = "baseline" | "running" | "completed" | "closed";
export type ResultLabel =
  | "positive_directional"
  | "negative_directional"
  | "no_detectable_change"
  | "inconclusive";
export type CompetitorStatus = "candidate" | "approved" | "ignored";
export type EntityType = "merchant_brand" | "competitor_brand" | "retailer" | "marketplace" | "manufacturer";
export type MentionKind =
  | "brand"
  | "product_recommendation"
  | "merchant_offer"
  | "comparison"
  | "negative"
  | "citation_only";
export type ConfidenceLabel = "high" | "medium" | "low" | "insufficient";
export type ProductLine = "trail" | "road" | "hike" | "recovery";

export type Adapter = {
  id: string;
  code: string;
  provider: string;
  surface: string;
  signalClass: SignalClass;
  approximatesConsumer: boolean;
  status: "active" | "degraded" | "disabled";
};

export type Provenance = {
  sourceType:
    | "shopify_field"
    | "merchant_jsonld"
    | "merchant_html"
    | "feed"
    | "third_party"
    | "user"
    | "model_inference";
  locator: string;
  observedAt: string;
  confidence: number;
};

export type Fact = {
  key: string;
  label: string;
  value: string;
  status: "verified" | "inferred" | "conflicting" | "missing";
  provenance: Provenance;
};

export type Variant = {
  id: string;
  sku: string;
  title: string;
  gtin: string | null;
  options: Record<string, string>;
  price: number;
  compareAt: number | null;
  available: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  line: ProductLine;
  categoryProfileId: string;
  status: "active" | "draft";
  canonicalUrl: string;
  priceFrom: number;
  priceTo: number;
  variantCount: number;
  variants: Variant[];
  facts: Fact[];
  readiness: number;
  readinessComponents: Record<string, number>;
  topGap: string;
  offerFreshness: "fresh" | "stale" | "conflict";
  lastSync: string;
  tint: string;
  description: string;
};

export type Intent = {
  id: string;
  text: string;
  source: IntentSource;
  type: IntentType;
  funnelStage: FunnelStage;
  specificity: Specificity;
  categoryProfileId: string;
  weight: number;
  priority: boolean;
  status: "active" | "candidate" | "archived";
  linkedProductIds: string[];
  merchantP: Record<string, number>;
  typicalRank: number;
  competitorMix: { brandId: string; p: number; typicalRank: number }[];
};

export type Mention = {
  id: string;
  brandId: string | null;
  productId: string | null;
  displayText: string;
  rank: number;
  rankCredit: number;
  kind: MentionKind;
  url: string | null;
  domain: string | null;
  matchConfidence: number;
  resolved: boolean;
};

export type Observation = {
  id: string;
  intentId: string;
  adapterId: string;
  repetition: number;
  observedAt: string;
  signalClass: SignalClass;
  model: string;
  locale: string;
  merchantIncluded: boolean;
  merchantRank: number | null;
  merchantLink: boolean;
  citedMerchant: boolean;
  latencyMs: number;
  costUsd: number;
  rawExcerpt: string;
  mentions: Mention[];
};

export type Brand = {
  id: string;
  name: string;
  domain: string;
  entityType: EntityType;
  aliases: string[];
  status: CompetitorStatus;
  discoveryReason: string;
};

export type Issue = {
  id: string;
  ruleCode: string;
  classification: IssueClass;
  title: string;
  description: string;
  whyItMatters: string;
  mechanism: string;
  confidence: number;
  expectedImpact: 1 | 2 | 3 | 4 | 5;
  effort: 1 | 2 | 3 | 4 | 5;
  risk: 1 | 2;
  priorityScore: number;
  evidenceStrength: number;
  affectedProductIds: string[];
  affectedIntentIds: string[];
  proposedChanges: { target: string; value: string; provenance: string }[];
  successMetric: string;
  firstDetectedAt: string;
  evidence: string[];
  counterevidence: string[];
};

export type Experiment = {
  id: string;
  name: string;
  hypothesis: string;
  status: ExperimentStatus;
  recommendationId: string | null;
  issueId: string | null;
  primaryMetric: string;
  expectedDirection: "up" | "down";
  baselineStart: string;
  baselineEnd: string;
  implementationAt: string | null;
  postStart: string | null;
  postEnd: string | null;
  treatmentProductIds: string[];
  treatmentIntentIds: string[];
  controlIntentIds: string[];
  resultLabel: ResultLabel | null;
  resultSummary: string;
  confidence: number;
  confounders: string[];
  preValue: number;
  postValue: number | null;
  controlPre: number | null;
  controlPost: number | null;
  createdAt: string;
};

export type MetricPoint = {
  week: string;
  inclusion: number;
  share: number;
  readiness: number;
  coverage: number;
};

export type WeeklyIntentMetric = {
  week: string;
  intentId: string;
  adapterId: string;
  inclusion: number;
  samples: number;
};

export type CategoryProfile = {
  id: string;
  name: string;
  version: string;
  required: string[];
  recommended: string[];
};

export type PublicAudit = {
  id: string;
  url: string;
  email: string;
  domain: string;
  createdAt: string;
  storeName: string;
  categoryGuess: string;
  readiness: number;
  crawledPages: number;
  intents: { text: string; type: IntentType; source: IntentSource }[];
  issues: { title: string; classification: IssueClass; evidenceClass: SignalClass }[];
  competitors: string[];
  limitations: string[];
  signalNotes: string[];
  schemaFindings: { rule: string; severity: "high" | "medium" | "low"; detail: string }[];
};

export type WorkspaceMeta = {
  name: string;
  storeName: string;
  domain: string;
  country: string;
  language: string;
  currency: string;
  plan: "starter" | "growth" | "agency";
  probeUsed: number;
  probeQuota: number;
  lastScanAt: string;
  catalogSyncedAt: string;
  productCount: number;
  locale: string;
};
