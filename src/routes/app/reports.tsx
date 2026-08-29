import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { issues, metrics, observations, products, workspace } from "@/lib/data/seed";
import { formatPct, formatScore } from "@/lib/utils";

export const Route = createFileRoute("/app/reports")({ component: ReportsPage });

function ReportsPage() {
  function downloadCsv() {
    const header = "observation_id,intent_id,adapter_id,signal_class,observed_at,included,rank,model";
    const lines = observations.map(
      (o) =>
        `${o.id},${o.intentId},${o.adapterId},${o.signalClass},${o.observedAt},${o.merchantIncluded},${o.merchantRank ?? ""},${o.model}`,
    );
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "vitrine-observations.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast("CSV exported with raw IDs and timestamps");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Reports"
        title="Evidence packs"
        description="Every report includes period, signal coverage, providers, panel version, scoring version, and limitations. Share links are noindex in production."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl">Executive baseline</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {workspace.storeName} · readiness {formatScore(metrics.readiness, 0)} · inclusion{" "}
            {formatPct(metrics.inclusion.rate, 0)} · {issues.length} open issues · {products.length} products
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/r/$reportId" params={{ reportId: "ridgeway-baseline" }}>
                Open shareable report
              </Link>
            </Button>
            <Button variant="outline" onClick={downloadCsv}>
              Export observations CSV
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="font-display text-xl">Templates</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Executive baseline</li>
            <li>Product opportunity</li>
            <li>Experiment result</li>
            <li>Agency client report</li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            PDF uses the same data as the web report. Share links expire and can be revoked.
          </p>
        </div>
      </div>
    </div>
  );
}
