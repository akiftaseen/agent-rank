import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { TrendChart } from "@/components/charts/trend";
import { ConfidenceBadge } from "@/components/evidence/confidence";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { ScoreBar, toneForScore } from "@/components/evidence/score-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  adapters,
  experiments,
  intents,
  issues,
  metrics,
  products,
  weekly,
  workspace,
} from "@/lib/data/seed";
import { READINESS_WEIGHTS } from "@/lib/scoring";
import { formatPct, formatScore } from "@/lib/utils";

export const Route = createFileRoute("/app/")({ component: Overview });

function Overview() {
  const openIssues = issues.slice().sort((a, b) => b.priorityScore - a.priorityScore).slice(0, 4);
  const weak = intents
    .filter((i) => i.status === "active")
    .slice()
    .sort((a, b) => a.merchantP.openai_web - b.merchantP.openai_web)
    .slice(0, 4);
  const strong = intents
    .filter((i) => i.status === "active")
    .slice()
    .sort((a, b) => b.merchantP.openai_web - a.merchantP.openai_web)
    .slice(0, 3);

  const avgComponents = Object.keys(READINESS_WEIGHTS).reduce(
    (acc, key) => {
      acc[key] = products.reduce((s, p) => s + (p.readinessComponents[key] ?? 0), 0) / products.length;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="What changed, what matters, what to do"
        description={`${workspace.storeName} · ${workspace.productCount} products · panel of ${metrics.activeIntents} intents · ${metrics.observationCount} observations. Compatible panel across the last six weeks.`}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/issues">Open backlog</Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          label="Vitrine Index"
          value={metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—"}
          hint={
            metrics.index.value != null
              ? `${metrics.index.label} confidence · not a universal percentile`
              : "Building baseline"
          }
        />
        <Kpi
          label="Recommendation inclusion"
          value={formatPct(metrics.inclusion.rate, 0)}
          hint={`${formatPct(metrics.inclusion.lower, 0)}–${formatPct(metrics.inclusion.upper, 0)} · n=${metrics.inclusion.n}`}
        />
        <Kpi
          label="Competitive share"
          value={formatPct(metrics.recShare, 0)}
          hint="Among approved brand competitors only"
        />
        <Kpi
          label="Catalog readiness"
          value={formatScore(metrics.readiness, 0)}
          hint="Equal product average · category-aware"
        />
      </div>

      <div className="mt-3 rounded-lg border border-border bg-card px-4 py-3">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Signal coverage</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <SignalBadge code="S2" showName />
          <SignalBadge code="S3" showName />
          <SignalBadge code="S5" showName />
          <SignalBadge code="S6" showName />
          <Badge variant="outline">S1 native — not connected</Badge>
          <Badge variant="outline">S4 referrals — not connected</Badge>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {adapters.map((a) => a.surface).join(" · ")}. AI-attributed sessions are hidden until an outcomes
          integration exists.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inclusion trend</CardTitle>
            <p className="text-sm text-muted-foreground">Same panel · weekly · S2+S3 blended for display, filterable on Intents</p>
          </CardHeader>
          <CardContent>
            <TrendChart data={weekly} dataKey="inclusion" label="Inclusion" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Readiness components</CardTitle>
            <p className="text-sm text-muted-foreground">Store average · footwear profiles v1.0</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(avgComponents).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="capitalize text-muted-foreground">{key}</span>
                  <span className="tabular">{Math.round(value)}</span>
                </div>
                <ScoreBar value={value} tone={toneForScore(value)} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Weakest intents</CardTitle>
            <Link to="/app/intents" className="text-xs text-primary">
              All intents
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {weak.map((i) => (
              <Link
                key={i.id}
                to="/app/intents/$intentId"
                params={{ intentId: i.id }}
                className="block rounded-md border border-border px-3 py-2 hover:bg-accent"
              >
                <p className="text-sm">{i.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i.type} · {i.source} · typical S3 inclusion {formatPct(i.merchantP.openai_web, 0)}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Strongest clusters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {strong.map((i) => (
              <Link
                key={i.id}
                to="/app/intents/$intentId"
                params={{ intentId: i.id }}
                className="block rounded-md border border-border px-3 py-2 hover:bg-accent"
              >
                <p className="text-sm">{i.text}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {i.type} · S2 {formatPct(i.merchantP.shopify_catalog, 0)} · S3 {formatPct(i.merchantP.openai_web, 0)}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Next actions</CardTitle>
            <Link to="/app/issues" className="text-xs text-primary">
              Full backlog
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {openIssues.map((iss) => (
              <Link
                key={iss.id}
                to="/app/issues/$issueId"
                params={{ issueId: iss.id }}
                className="block rounded-md border border-border px-3 py-3 hover:bg-accent"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={iss.classification === "confirmed" ? "caution" : "steel"}>
                    {iss.classification.replace("_", " ")}
                  </Badge>
                  <ConfidenceBadge value={iss.evidenceStrength} />
                  <span className="text-xs text-muted-foreground">priority {iss.priorityScore.toFixed(1)}</span>
                </div>
                <p className="mt-2 text-sm">{iss.title}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Experiments</CardTitle>
            <Link to="/app/experiments" className="text-xs text-primary">
              Ledger
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {experiments.map((exp) => (
              <Link
                key={exp.id}
                to="/app/experiments/$experimentId"
                params={{ experimentId: exp.id }}
                className="block rounded-md border border-border px-3 py-3 hover:bg-accent"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      exp.resultLabel === "positive_directional"
                        ? "positive"
                        : exp.status === "running"
                          ? "steel"
                          : "outline"
                    }
                  >
                    {exp.resultLabel?.replace("_", " ") ?? exp.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm">{exp.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{exp.primaryMetric}</p>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <ArrowRight className="size-3.5" />
        No S1 Shopify agentic sales or Google AI impressions are connected. Outcome tiles stay empty rather
        than estimated.
      </p>
    </div>
  );
}

function Kpi({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl tabular tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{hint}</p>
    </div>
  );
}
