import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ConfidenceBadge } from "@/components/evidence/confidence";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { issues } from "@/lib/data/seed";
import { useAppStore } from "@/lib/store";
import type { IssueClass } from "@/lib/types";

export const Route = createFileRoute("/app/issues/")({ component: IssuesList });

const TABS: { id: "all" | IssueClass | "dismissed"; label: string }[] = [
  { id: "all", label: "All open" },
  { id: "confirmed", label: "Confirmed" },
  { id: "supported_hypothesis", label: "Hypotheses" },
  { id: "opportunity", label: "Opportunities" },
  { id: "dismissed", label: "Dismissed" },
];

function IssuesList() {
  const overrides = useAppStore((s) => s.issueOverrides);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");

  const rows = useMemo(() => {
    return issues
      .map((iss) => ({ iss, status: overrides[iss.id]?.status ?? "open" }))
      .filter(({ iss, status }) => {
        if (tab === "dismissed") return status === "dismissed" || status === "snoozed";
        if (status !== "open" && status !== "exported") return false;
        if (tab === "all") return true;
        return iss.classification === tab;
      })
      .sort((a, b) => b.iss.priorityScore - a.iss.priorityScore);
  }, [overrides, tab]);

  return (
    <div>
      <PageHeader
        eyebrow="Issues"
        title="Evidence-backed backlog"
        description="Confirmed technical issues are separated from supported hypotheses. Priority is backlog ordering, not predicted revenue."
      />
      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <Button key={t.id} size="sm" variant={tab === t.id ? "default" : "outline"} onClick={() => setTab(t.id)}>
            {t.label}
          </Button>
        ))}
      </div>
      <div className="space-y-3">
        {rows.map(({ iss, status }) => (
          <Link
            key={iss.id}
            to="/app/issues/$issueId"
            params={{ issueId: iss.id }}
            className="block rounded-xl border border-border bg-card p-4 hover:bg-accent"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{iss.priorityScore.toFixed(1)}</span>
              <Badge
                variant={
                  iss.classification === "confirmed" ? "caution" : iss.classification === "opportunity" ? "outline" : "steel"
                }
              >
                {iss.classification.replace("_", " ")}
              </Badge>
              <ConfidenceBadge value={iss.evidenceStrength} />
              {status !== "open" ? <Badge variant="outline">{status}</Badge> : null}
            </div>
            <p className="mt-2 font-medium">{iss.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {iss.affectedProductIds.length} products · {iss.affectedIntentIds.length} intents · effort {iss.effort} ·
              risk {iss.risk}
            </p>
          </Link>
        ))}
        {rows.length === 0 ? <p className="text-sm text-muted-foreground">Nothing in this tab.</p> : null}
      </div>
    </div>
  );
}
