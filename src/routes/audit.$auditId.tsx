import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ridgewayPublicAudit } from "@/lib/data/seed";
import { useAppStore } from "@/lib/store";
import { formatDateTime } from "@/lib/utils";

export const Route = createFileRoute("/audit/$auditId")({ component: AuditReport });

function AuditReport() {
  const { auditId } = Route.useParams();
  const audits = useAppStore((s) => s.audits);
  const audit = audits.find((a) => a.id === auditId) ?? ridgewayPublicAudit;

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5">
        <Link to="/" className="text-foreground">
          <Logo />
        </Link>
        <Button asChild size="sm">
          <Link to="/app">
            Full workspace
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </header>
      <article className="mx-auto max-w-3xl px-4 pb-20">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Public audit · bounded sample</p>
        <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">{audit.storeName}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {audit.domain} · {formatDateTime(audit.createdAt)} · {audit.crawledPages} pages crawled
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Category guess: {audit.categoryGuess}</p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Mini label="Readiness" value={audit.readiness ? String(Math.round(audit.readiness)) : "n/a"} />
          <Mini label="Synthetic intents" value={String(audit.intents.length)} />
          <Mini label="Issues shown" value={String(audit.issues.length)} />
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Signal coverage</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {audit.signalNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Synthetic buyer intents</h2>
          <p className="mt-1 text-sm text-muted-foreground">Labeled synthetic. Not search volume or observed demand.</p>
          <ol className="mt-4 space-y-3">
            {audit.intents.map((intent, i) => (
              <li key={i} className="rounded-lg border border-border bg-card px-4 py-3">
                <p className="text-sm">{intent.text}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">{intent.type}</Badge>
                  <Badge variant="steel">{intent.source}</Badge>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Issues</h2>
          <ul className="mt-4 space-y-3">
            {audit.issues.map((issue) => (
              <li key={issue.title} className="rounded-lg border border-border bg-card px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <SignalBadge code={issue.evidenceClass} />
                  <Badge variant={issue.classification === "confirmed" ? "caution" : "outline"}>
                    {issue.classification.replace("_", " ")}
                  </Badge>
                </div>
                <p className="mt-2 text-sm">{issue.title}</p>
              </li>
            ))}
          </ul>
        </section>

        {audit.schemaFindings.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl">Schema findings</h2>
            <ul className="mt-4 space-y-2">
              {audit.schemaFindings.map((f) => (
                <li key={f.detail} className="flex justify-between gap-4 border-b border-border py-2 text-sm">
                  <span>
                    {f.rule}
                    <span className="block text-muted-foreground">{f.detail}</span>
                  </span>
                  <Badge variant={f.severity === "high" ? "danger" : "caution"}>{f.severity}</Badge>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {audit.competitors.length > 0 ? (
          <section className="mt-10">
            <h2 className="font-display text-2xl">Candidate competitors</h2>
            <p className="mt-1 text-sm text-muted-foreground">Unapproved. Not used in share denominators.</p>
            <p className="mt-3 text-sm">{audit.competitors.join(" · ")}</p>
          </section>
        ) : null}

        <section className="mt-10 rounded-lg border border-border bg-elevated p-4">
          <h2 className="font-medium">Limitations</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {audit.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link to="/app">Open Ridgeway demo workspace</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/">Run another URL</Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-2xl tabular">{value}</p>
    </div>
  );
}
