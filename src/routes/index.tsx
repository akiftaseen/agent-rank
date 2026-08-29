import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { SignalBadge } from "@/components/evidence/signal-badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUDIT_STAGES, generateLocalAudit } from "@/lib/audit/generate";
import { enhanceAudit } from "@/lib/audit/server";
import { metrics, products, workspace } from "@/lib/data/seed";
import { useAppStore } from "@/lib/store";
import { formatPct, formatScore } from "@/lib/utils";
import type { SignalClass } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const addAudit = useAppStore((s) => s.addAudit);
  const [url, setUrl] = useState("https://ridgeway.example");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);

  async function runAudit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!url.trim()) {
      setError("Enter a store URL.");
      return;
    }
    if (!consent) {
      setError("Consent is required to process public pages.");
      return;
    }
    setRunning(true);
    setStage(0);
    for (let i = 0; i < AUDIT_STAGES.length; i++) {
      setStage(i);
      await new Promise((r) => setTimeout(r, 420));
    }
    let audit = generateLocalAudit({ url: url.trim(), email: email.trim() || "preview@local" });
    try {
      audit = await enhanceAudit({ data: { url: url.trim(), email: email.trim() || "preview@local" } });
    } catch {
      /* local audit is sufficient */
    }
    addAudit(audit);
    setRunning(false);
    void navigate({ to: "/audit/$auditId", params: { auditId: audit.id } });
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/app/methodology">Methodology</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/app">
              Open demo
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 sm:pt-16">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          AI commerce evidence · Shopify-first · read-only
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-medium leading-[1.12] tracking-tight sm:text-6xl">
          See which buyer needs surface your products.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Independent, product-level observability for catalogs. Grade the evidence, find the gap, and
          test whether a change moved anything — without writing to the store.
        </p>

        <form
          onSubmit={runAudit}
          className="mt-10 max-w-xl rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-panel)] sm:p-6"
        >
          <div className="grid gap-3">
            <div>
              <Label htmlFor="url">Store URL</Label>
              <Input
                id="url"
                className="mt-1.5"
                placeholder="https://your-store.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                autoComplete="url"
              />
            </div>
            <div>
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                className="mt-1.5"
                type="email"
                placeholder="you@brand.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
              <span>
                I confirm I am authorized to audit this store’s public pages. Vitrine honors robots, bounds
                the crawl, and does not scrape consumer chat UIs.
              </span>
            </label>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            {running ? (
              <div className="rounded-md border border-border bg-elevated px-3 py-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Running bounded audit</p>
                <ol className="mt-2 space-y-1.5">
                  {AUDIT_STAGES.map((s, i) => (
                    <li key={s.id} className="flex items-center gap-2 text-sm">
                      <span
                        className={
                          i < stage
                            ? "text-positive"
                            : i === stage
                              ? "text-primary"
                              : "text-muted-foreground"
                        }
                      >
                        {i < stage ? <Check className="size-3.5" /> : <span className="inline-block size-3.5 rounded-full border border-current" />}
                      </span>
                      <span className={i === stage ? "text-foreground" : "text-muted-foreground"}>{s.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Run public audit
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              Preview uses a sample of public pages, five synthetic intents, and limited probes. Not a rank
              guarantee. Try the prefilled Ridgeway URL, or open the full demo workspace.
            </p>
          </div>
        </form>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">What this measures</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Every observation carries a signal class. Native channel data, official catalog retrieval,
              provider API probes, and deterministic audits are never presented as equivalent.
            </p>
            <ul className="mt-6 space-y-3">
              {(
                [
                  ["S2", "Official catalog retrieval — eligibility, not ChatGPT placement"],
                  ["S3", "Permitted API probes — lab samples with model, time, and locale"],
                  ["S5", "Deterministic catalog and schema audit — confirmed technical issues"],
                  ["S6", "Comparative hypotheses — directional, never causal on their own"],
                ] as [SignalClass, string][]
              ).map(([code, copy]) => (
                <li key={code} className="flex items-start gap-3 text-sm">
                  <SignalBadge code={code} />
                  <span className="text-muted-foreground">{copy}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Example evidence · Ridgeway demo</p>
            <p className="mt-3 font-display text-2xl">{workspace.storeName}</p>
            <p className="text-sm text-muted-foreground">Trail and hiking footwear · 24 products · en-US</p>
            <dl className="mt-6 grid grid-cols-2 gap-4">
              <Stat label="Catalog readiness" value={formatScore(metrics.readiness, 0)} />
              <Stat
                label="Inclusion rate"
                value={formatPct(metrics.inclusion.rate, 0)}
                hint={`${formatPct(metrics.inclusion.lower, 0)}–${formatPct(metrics.inclusion.upper, 0)} Jeffreys`}
              />
              <Stat
                label="Index"
                value={metrics.index.value != null ? formatScore(metrics.index.value, 0) : "—"}
                hint={`${metrics.index.label} confidence`}
              />
              <Stat label="Active products" value={String(products.length)} />
            </dl>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Index is a communication composite, shown only above coverage thresholds. It is not a universal
              percentile and excludes referral revenue.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link to="/app">Inspect the Ridgeway workspace</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <Note
            title="Measurement before automation"
            body="Recommendations are exact and provenance-constrained. The MVP never writes product fields, themes, or feeds."
          />
          <Note
            title="No consumer-interface scraping"
            body="Probes use official catalog APIs and permitted provider APIs. Labels name the surface, not the consumer app."
          />
          <Note
            title="The sellable unit is a decision"
            body="A prioritized backlog with evidence, expected mechanism, and an experiment ledger — not a vanity score."
          />
        </div>
        <div className="mt-12 flex items-start gap-3 rounded-lg border border-border bg-elevated px-4 py-4 text-sm text-muted-foreground">
          <Lock className="mt-0.5 size-4 shrink-0" />
          Vitrine does not promise placement in ChatGPT, Gemini, or any consumer assistant. Samples include
          dates, providers, repetitions, and uncertainty.
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="font-display text-3xl tabular tracking-tight">{value}</dd>
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Note({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
