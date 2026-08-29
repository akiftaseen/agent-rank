import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { allExperiments, useAppStore } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/app/experiments/")({ component: ExperimentsList });

function ExperimentsList() {
  const extra = useAppStore((s) => s.extraExperiments);
  const overrides = useAppStore((s) => s.experimentOverrides);
  const rows = allExperiments(extra, overrides);

  return (
    <div>
      <PageHeader
        eyebrow="Experiments"
        title="Intervention ledger"
        description="Pre-register a hypothesis, freeze the baseline, attach the Shopify diff, then classify the result. “Caused” is prohibited without an approved causal design."
      />
      <div className="space-y-3">
        {rows.map((exp) => (
          <Link
            key={exp.id}
            to="/app/experiments/$experimentId"
            params={{ experimentId: exp.id }}
            className="block rounded-xl border border-border bg-card p-4 hover:bg-accent"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  exp.resultLabel === "positive_directional"
                    ? "positive"
                    : exp.resultLabel === "negative_directional"
                      ? "danger"
                      : exp.status === "running"
                        ? "steel"
                        : "outline"
                }
              >
                {exp.resultLabel?.replaceAll("_", " ") ?? exp.status}
              </Badge>
              <span className="text-xs text-muted-foreground">{formatDate(exp.createdAt)}</span>
            </div>
            <p className="mt-2 font-medium">{exp.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">{exp.hypothesis}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
