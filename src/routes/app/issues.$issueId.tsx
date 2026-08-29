import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ConfidenceBadge } from "@/components/evidence/confidence";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { issueById, productById } from "@/lib/data/seed";
import { useAppStore } from "@/lib/store";
import type { Experiment } from "@/lib/types";

export const Route = createFileRoute("/app/issues/$issueId")({ component: IssueDetail });

function IssueDetail() {
  const { issueId } = Route.useParams();
  const issue = issueById(issueId);
  const setIssue = useAppStore((s) => s.setIssueOverride);
  const addExperiment = useAppStore((s) => s.addExperiment);
  const override = useAppStore((s) => s.issueOverrides[issueId]);
  const navigate = useNavigate();
  const [dismissOpen, setDismissOpen] = useState(false);
  const [reason, setReason] = useState("");

  if (!issue) return <p>Issue not found.</p>;
  const status = override?.status ?? "open";

  function exportCsv() {
    const rows = [
      ["field", "value"],
      ["title", issue!.title],
      ["classification", issue!.classification],
      ["mechanism", issue!.mechanism],
      ...issue!.proposedChanges.map((c) => [c.target, c.value]),
    ];
    const csv = rows.map((r) => r.map((c) => `"${c.replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${issue!.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setIssue(issue!.id, { status: "exported" });
    toast("Recommendation exported — Shopify is not modified");
  }

  function createExperiment() {
    const exp: Experiment = {
      id: `exp-${Date.now()}`,
      name: `Test: ${issue!.title}`,
      hypothesis: issue!.mechanism,
      status: "baseline",
      recommendationId: `rec-${issue!.id}`,
      issueId: issue!.id,
      primaryMetric: issue!.successMetric,
      expectedDirection: "up",
      baselineStart: new Date().toISOString(),
      baselineEnd: new Date(Date.now() + 14 * 86400000).toISOString(),
      implementationAt: null,
      postStart: null,
      postEnd: null,
      treatmentProductIds: issue!.affectedProductIds.slice(0, 6),
      treatmentIntentIds: issue!.affectedIntentIds.slice(0, 4),
      controlIntentIds: [],
      resultLabel: null,
      resultSummary: "Baseline frozen. Implement the change in Shopify, then mark implementation.",
      confidence: 0,
      confounders: ["No matched control selected yet"],
      preValue: 0,
      postValue: null,
      controlPre: null,
      controlPost: null,
      createdAt: new Date().toISOString(),
    };
    addExperiment(exp);
    toast("Experiment pre-registered. Baseline observation IDs frozen.");
    void navigate({ to: "/app/experiments/$experimentId", params: { experimentId: exp.id } });
  }

  return (
    <div>
      <PageHeader
        eyebrow={issue.ruleCode}
        title={issue.title}
        description={issue.description}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/issues">Backlog</Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        <Badge variant={issue.classification === "confirmed" ? "caution" : "steel"}>
          {issue.classification.replace("_", " ")}
        </Badge>
        <ConfidenceBadge value={issue.evidenceStrength} />
        <Badge variant="outline">impact {issue.expectedImpact}/5</Badge>
        <Badge variant="outline">effort {issue.effort}/5</Badge>
        <Badge variant="outline">risk ×{issue.risk}</Badge>
        <Badge variant="outline">priority {issue.priorityScore.toFixed(1)}</Badge>
        {status !== "open" ? <Badge>{status}</Badge> : null}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl">Why it matters</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{issue.whyItMatters}</p>
          <p className="mt-3 text-sm">
            <span className="text-muted-foreground">Mechanism · </span>
            {issue.mechanism}
          </p>
          <p className="mt-2 text-sm">
            <span className="text-muted-foreground">Success metric · </span>
            {issue.successMetric}
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl">Evidence</h2>
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {issue.evidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          {issue.counterevidence.length > 0 ? (
            <>
              <h3 className="mt-4 text-sm font-medium">Counterevidence</h3>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {issue.counterevidence.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>
      </div>

      <h2 className="mt-10 font-display text-2xl">Proposed changes</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Factual text includes field-level provenance. Inferred values are marked and require merchant input.
        Vitrine will not write these fields.
      </p>
      <ul className="mt-4 space-y-3">
        {issue.proposedChanges.map((c) => (
          <li key={c.target} className="rounded-lg border border-border bg-card px-4 py-3">
            <p className="font-mono text-xs text-muted-foreground">{c.target}</p>
            <p className="mt-1 text-sm">{c.value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">provenance: {c.provenance}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-display text-2xl">Affected products</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {issue.affectedProductIds.map((id) => {
          const p = productById(id);
          return (
            <Link key={id} to="/app/products/$productId" params={{ productId: id }}>
              <Badge variant="outline">{p?.title ?? id}</Badge>
            </Link>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button onClick={createExperiment}>Test this recommendation</Button>
        <Button variant="outline" onClick={exportCsv}>
          Export CSV
        </Button>
        <Button variant="ghost" onClick={() => setDismissOpen(true)}>
          Dismiss
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setIssue(issue.id, { status: "snoozed", reason: "Snoozed 14 days" });
            toast("Snoozed — hidden from the open backlog");
          }}
        >
          Snooze
        </Button>
      </div>

      <Dialog open={dismissOpen} onOpenChange={setDismissOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss issue</DialogTitle>
            <DialogDescription>The reason is stored and used to reduce repeated irrelevant recommendations.</DialogDescription>
          </DialogHeader>
          <Label htmlFor="reason">Reason</Label>
          <Textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Not relevant because…" />
          <Button
            onClick={() => {
              setIssue(issue.id, { status: "dismissed", reason: reason || "Dismissed" });
              setDismissOpen(false);
              toast("Dismissed");
            }}
          >
            Confirm dismiss
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
