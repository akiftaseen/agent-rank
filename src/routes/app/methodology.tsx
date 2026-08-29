import { createFileRoute } from "@tanstack/react-router";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { PageHeader } from "@/components/layout/page-header";
import { adapters } from "@/lib/data/seed";
import { READINESS_WEIGHTS, SIGNAL_META, rankCredit } from "@/lib/scoring";
import type { SignalClass } from "@/lib/types";

export const Route = createFileRoute("/app/methodology")({ component: MethodologyPage });

function MethodologyPage() {
  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Methodology v1.0"
        title="How evidence is graded"
        description="Formulas are versioned. Historical trends recompute with the scoring version in force at the time. This page is the source of labels used in the product."
      />

      <h2 className="font-display text-2xl">Signal classes</h2>
      <ul className="mt-4 space-y-3">
        {(Object.keys(SIGNAL_META) as SignalClass[]).map((code) => (
          <li key={code} className="rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <SignalBadge code={code} />
              <span className="text-sm font-medium">{SIGNAL_META[code].name}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{SIGNAL_META[code].fidelity}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Adapters in this workspace</h2>
      <ul className="mt-4 space-y-3">
        {adapters.map((a) => (
          <li key={a.id} className="rounded-lg border border-border bg-card px-4 py-3">
            <div className="flex items-center gap-2">
              <SignalBadge code={a.signalClass} />
              <span className="text-sm">{a.surface}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {a.approximatesConsumer
                ? "Approximates a consumer surface"
                : "Does not approximate the consumer product UI"}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Sampling</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Priority intents: 3 repetitions per adapter, staggered. Exploratory intents: 1 repetition, low
        confidence. Minimum for a provisional aggregate: 20 intents, 2 adapters, 60 successful observations.
        Provider errors are not counted as non-inclusion.
      </p>

      <h2 className="mt-10 font-display text-2xl">Scores</h2>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          <span className="text-foreground">Rank credit</span> at 1-indexed rank r is 1 / log2(r + 1). Rank 1
          = {rankCredit(1).toFixed(3)}.
        </p>
        <p>
          <span className="text-foreground">Inclusion rate</span> is a weighted mean of merchant inclusion on
          the approved panel. Intervals use a Jeffreys beta approximation.
        </p>
        <p>
          <span className="text-foreground">Catalog readiness</span> uses category profiles. Component weights:
          {Object.entries(READINESS_WEIGHTS)
            .map(([k, w]) => ` ${k} ${w}`)
            .join(" ·")}
          . N/A fields are excluded from the denominator.
        </p>
        <p>
          <span className="text-foreground">Vitrine Index</span> = 0.45 visibility + 0.25 coverage + 0.20
          readiness + 0.10 source presence. Shown only above coverage thresholds. Never compared across
          unrelated categories as a percentile. Excludes referral traffic and revenue.
        </p>
        <p>
          <span className="text-foreground">Issue priority</span> = impact × evidence strength × business
          weight / max(effort × risk, 0.25). Backlog ordering only.
        </p>
      </div>

      <h2 className="mt-10 font-display text-2xl">Experiment labels</h2>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
        <li>positive_directional / negative_directional — interval mostly off zero, control does not explain it</li>
        <li>no_detectable_change — narrow interval around zero with adequate coverage</li>
        <li>inconclusive — sparse samples, panel break, or a blocking confounder</li>
        <li>“Caused” is not used</li>
      </ul>

      <h2 className="mt-10 font-display text-2xl">Known limitations</h2>
      <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
        <li>API probes are not the ChatGPT, Gemini, or Perplexity consumer shopping UI.</li>
        <li>Repeated API calls can be correlated through caching; intervals are descriptive.</li>
        <li>This demo workspace uses a fixture catalog (Ridgeway) rather than a live Shopify Admin token.</li>
        <li>No customer or order scopes. No automated publishing.</li>
      </ul>
    </div>
  );
}
