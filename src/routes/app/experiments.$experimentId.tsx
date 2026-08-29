import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { intentById, productById } from "@/lib/data/seed";
import { allExperiments, useAppStore } from "@/lib/store";
import { formatDate, formatPct } from "@/lib/utils";

export const Route = createFileRoute("/app/experiments/$experimentId")({ component: ExperimentDetail });

function ExperimentDetail() {
  const { experimentId } = Route.useParams();
  const extra = useAppStore((s) => s.extraExperiments);
  const overrides = useAppStore((s) => s.experimentOverrides);
  const patch = useAppStore((s) => s.patchExperiment);
  const exp = allExperiments(extra, overrides).find((e) => e.id === experimentId);
  if (!exp) return <p>Experiment not found.</p>;

  const did =
    exp.postValue != null && exp.controlPre != null && exp.controlPost != null
      ? exp.postValue - exp.preValue - (exp.controlPost - exp.controlPre)
      : null;

  return (
    <div>
      <PageHeader
        eyebrow="Experiment"
        title={exp.name}
        description={exp.hypothesis}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/experiments">Ledger</Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        <Badge>{exp.status}</Badge>
        {exp.resultLabel ? (
          <Badge variant={exp.resultLabel === "positive_directional" ? "positive" : "outline"}>
            {exp.resultLabel.replaceAll("_", " ")}
          </Badge>
        ) : null}
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <Item label="Primary metric" value={exp.primaryMetric} />
        <Item label="Expected direction" value={exp.expectedDirection} />
        <Item label="Baseline" value={`${formatDate(exp.baselineStart)} – ${formatDate(exp.baselineEnd)}`} />
        <Item
          label="Implementation"
          value={exp.implementationAt ? formatDate(exp.implementationAt) : "Not marked"}
        />
      </dl>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="Treatment pre" value={formatPct(exp.preValue, 1)} />
        <Stat label="Treatment post" value={exp.postValue == null ? "—" : formatPct(exp.postValue, 1)} />
        <Stat label="Diff-in-diff" value={did == null ? "—" : `${did >= 0 ? "+" : ""}${(did * 100).toFixed(1)} pp`} />
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{exp.resultSummary}</p>

      {exp.confounders.length > 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-elevated p-4">
          <p className="text-sm font-medium">Confounders</p>
          <ul className="mt-2 list-disc pl-4 text-sm text-muted-foreground">
            {exp.confounders.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <h2 className="mt-10 font-display text-2xl">Treatment</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Products:{" "}
        {exp.treatmentProductIds.map((id) => productById(id)?.title ?? id).join(", ") || "—"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Intents: {exp.treatmentIntentIds.map((id) => intentById(id)?.text ?? id).join(" · ") || "—"}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Controls: {exp.controlIntentIds.map((id) => intentById(id)?.text ?? id).join(" · ") || "none — weak causal evidence"}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {exp.status === "baseline" ? (
          <Button
            onClick={() => {
              patch(exp.id, {
                status: "running",
                implementationAt: new Date().toISOString(),
                postStart: new Date().toISOString(),
                resultSummary: "Implementation marked. Post-window probes will use the same panel, adapters, and locale.",
              });
              toast("Implementation recorded. Shopify writes still happen outside Vitrine.");
            }}
          >
            Mark implemented
          </Button>
        ) : null}
        {exp.status === "running" ? (
          <Button
            onClick={() => {
              patch(exp.id, {
                status: "completed",
                resultLabel: "inconclusive",
                postEnd: new Date().toISOString(),
                resultSummary:
                  "Closed as inconclusive — post window shorter than 14 days or sample coverage insufficient. Not a negative result.",
              });
              toast("Closed as inconclusive");
            }}
          >
            Close as inconclusive
          </Button>
        ) : null}
        {exp.status === "completed" ? (
          <Button variant="outline" onClick={() => patch(exp.id, { status: "closed" })}>
            Adopt / close
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm">{value}</dd>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl tabular">{value}</p>
    </div>
  );
}
