import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adapters, intentById, intentObservations, issues, productById } from "@/lib/data/seed";
import { inclusionRate } from "@/lib/scoring";
import { formatDateTime, formatPct } from "@/lib/utils";

export const Route = createFileRoute("/app/intents/$intentId")({ component: IntentDetail });

function IntentDetail() {
  const { intentId } = Route.useParams();
  const intent = intentById(intentId);
  if (!intent) return <p>Intent not found.</p>;
  const obs = intentObservations(intent.id);
  const related = issues.filter((i) => i.affectedIntentIds.includes(intent.id));

  return (
    <div>
      <PageHeader
        eyebrow="Intent"
        title={intent.text}
        description={`${intent.type} · ${intent.funnelStage} · ${intent.specificity} · weight ${intent.weight} (${intent.source === "synthetic" ? "not search volume" : "merchant-entered"})`}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/intents">Back to panel</Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        <Badge variant="steel">{intent.source}</Badge>
        {intent.priority ? <Badge>priority · 3 repetitions</Badge> : <Badge variant="outline">exploratory · 1 repetition</Badge>}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {adapters.map((a) => {
          const subset = obs.filter((o) => o.adapterId === a.id);
          const inc = inclusionRate(subset);
          return (
            <Card key={a.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="text-base">{a.provider}</CardTitle>
                  <SignalBadge code={a.signalClass} />
                </div>
                <p className="text-xs text-muted-foreground">{a.surface}</p>
              </CardHeader>
              <CardContent>
                <p className="font-display text-3xl tabular">{formatPct(inc.rate, 0)}</p>
                <p className="text-xs text-muted-foreground">
                  {formatPct(inc.lower, 0)}–{formatPct(inc.upper, 0)} · n={inc.n}
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Does not approximate the consumer {a.provider} app.
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-10 font-display text-2xl">Observations</h2>
      <div className="mt-3 space-y-3">
        {obs.map((o) => (
          <div key={o.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <SignalBadge code={o.signalClass} />
              <span className="text-muted-foreground">{o.model}</span>
              <span className="text-muted-foreground">{formatDateTime(o.observedAt)}</span>
              <span className="text-muted-foreground">rep {o.repetition}</span>
              <Badge variant={o.merchantIncluded ? "positive" : "outline"}>
                {o.merchantIncluded ? `included · rank ${o.merchantRank}` : "not included"}
              </Badge>
              {o.merchantLink ? <Badge variant="steel">merchant link</Badge> : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.rawExcerpt}</p>
            <ul className="mt-3 space-y-1 text-sm">
              {o.mentions.map((m) => (
                <li key={m.id} className="flex justify-between gap-3">
                  <span>
                    <span className="tabular text-muted-foreground">{m.rank}.</span> {m.displayText}
                    <span className="text-muted-foreground"> · {m.kind.replace("_", " ")}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{m.domain}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 className="mt-10 font-display text-2xl">Linked products</h2>
      <ul className="mt-3 space-y-2">
        {intent.linkedProductIds.map((id) => {
          const p = productById(id);
          if (!p) return null;
          return (
            <li key={id}>
              <Link className="text-sm hover:text-primary" to="/app/products/$productId" params={{ productId: id }}>
                {p.title}
              </Link>
            </li>
          );
        })}
      </ul>

      {related.length > 0 ? (
        <>
          <h2 className="mt-10 font-display text-2xl">Why we might be losing</h2>
          <ul className="mt-3 space-y-2">
            {related.map((iss) => (
              <li key={iss.id}>
                <Link className="text-sm hover:text-primary" to="/app/issues/$issueId" params={{ issueId: iss.id }}>
                  {iss.title}
                </Link>
                <span className="text-xs text-muted-foreground"> · {iss.classification.replace("_", " ")}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
