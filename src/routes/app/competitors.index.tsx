import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { brands, observations } from "@/lib/data/seed";
import { rankCredit } from "@/lib/scoring";
import { useAppStore } from "@/lib/store";
import { formatPct } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/app/competitors/")({ component: CompetitorsList });

function CompetitorsList() {
  const statusMap = useAppStore((s) => s.competitorStatus);
  const setStatus = useAppStore((s) => s.setCompetitorStatus);

  const rows = brands
    .filter((b) => b.id !== "ridgeway")
    .map((b) => {
      const status = statusMap[b.id] ?? b.status;
      let credit = 0;
      let wins = 0;
      for (const o of observations) {
        const m = o.mentions.find((x) => x.brandId === b.id);
        if (m) {
          credit += m.rankCredit;
          if (m.rank === 1) wins += 1;
        }
      }
      return { brand: b, status, credit, wins };
    })
    .sort((a, b) => b.credit - a.credit);

  const totalCredit = rows.filter((r) => r.status === "approved" && r.brand.entityType === "competitor_brand").reduce((s, r) => s + r.credit, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Competitors"
        title="Approved set and candidates"
        description="Auto-detected entities stay candidates until you approve them. Retailers are classified separately and excluded from brand share unless you choose a retailer view."
      />
      <div className="space-y-3">
        {rows.map(({ brand, status, credit, wins }) => (
          <div key={brand.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link to="/app/competitors/$brandId" params={{ brandId: brand.id }} className="font-medium hover:text-primary">
                    {brand.name}
                  </Link>
                  <Badge variant="outline">{brand.entityType.replace("_", " ")}</Badge>
                  <Badge variant={status === "approved" ? "positive" : status === "ignored" ? "outline" : "caution"}>
                    {status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{brand.discoveryReason}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {brand.domain}
                  {brand.aliases.length ? ` · ${brand.aliases.join(", ")}` : ""}
                </p>
              </div>
              <div className="text-sm sm:text-right">
                <p className="tabular">
                  {brand.entityType === "competitor_brand" && status === "approved" && totalCredit
                    ? formatPct(credit / (totalCredit + observations.filter((o) => o.mentions.some((m) => m.brandId === "ridgeway")).reduce((s, o) => s + (o.mentions.find((m) => m.brandId === "ridgeway")?.rankCredit ?? 0), 0)), 0)
                    : "—"}{" "}
                  <span className="text-muted-foreground">share</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {wins} first-position mentions · credit {credit.toFixed(1)}
                </p>
                {brand.entityType !== "merchant_brand" ? (
                  <div className="mt-2 flex gap-2 sm:justify-end">
                    <Button
                      size="sm"
                      variant={status === "approved" ? "default" : "outline"}
                      onClick={() => {
                        setStatus(brand.id, "approved");
                        toast("Competitor approved — included in share denominator");
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setStatus(brand.id, "ignored");
                        toast("Ignored — excluded from official set");
                      }}
                    >
                      Ignore
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Rank credit = 1 / log2(rank + 1). Unresolved entities are excluded. {rankCredit(1).toFixed(2)} at rank 1.
      </p>
    </div>
  );
}
