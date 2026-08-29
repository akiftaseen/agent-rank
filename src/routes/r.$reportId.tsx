import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { issues, metrics, workspace } from "@/lib/data/seed";
import { formatPct, formatScore } from "@/lib/utils";

export const Route = createFileRoute("/r/$reportId")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: SharedReport,
});

function SharedReport() {
  const { reportId } = Route.useParams();
  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Logo />
        <Button asChild size="sm" variant="outline">
          <Link to="/app">Workspace</Link>
        </Button>
      </header>
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          Shared report · {reportId} · noindex
        </p>
        <h1 className="mt-3 font-display text-4xl">{workspace.storeName} baseline</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Window 1–29 Aug 2026 · panel v1 · scoring v1.0 · locale en-US
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Mini label="Index" value={metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—"} />
          <Mini label="Inclusion" value={formatPct(metrics.inclusion.rate, 0)} />
          <Mini label="Readiness" value={formatScore(metrics.readiness, 0)} />
          <Mini label="Coverage" value={formatPct(metrics.coverage, 0)} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <SignalBadge code="S2" showName />
          <SignalBadge code="S3" showName />
          <SignalBadge code="S5" showName />
        </div>
        <h2 className="mt-10 font-display text-2xl">Priority issues</h2>
        <ul className="mt-3 space-y-3">
          {issues.slice(0, 5).map((iss) => (
            <li key={iss.id} className="rounded-lg border border-border bg-card px-4 py-3">
              <Badge variant="outline">{iss.classification.replace("_", " ")}</Badge>
              <p className="mt-2 text-sm">{iss.title}</p>
            </li>
          ))}
        </ul>
        <section className="mt-10 rounded-lg border border-border bg-elevated p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Limitations</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Provider API probes are lab samples, not consumer ChatGPT or Perplexity ranking.</li>
            <li>Index is not comparable across unrelated categories.</li>
            <li>No S1 native channel data or S4 referral outcomes in this report.</li>
            <li>Directional experiment labels are not causal proof.</li>
          </ul>
        </section>
      </article>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl tabular">{value}</p>
    </div>
  );
}
