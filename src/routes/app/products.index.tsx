import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductMark } from "@/components/evidence/product-mark";
import { ScoreBar, toneForScore } from "@/components/evidence/score-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { lineLabel, products } from "@/lib/data/seed";
import { formatScore, formatUsd } from "@/lib/utils";
import type { ProductLine } from "@/lib/types";

export const Route = createFileRoute("/app/products/")({ component: ProductsList });

function ProductsList() {
  const [q, setQ] = useState("");
  const [line, setLine] = useState<"all" | ProductLine>("all");
  const rows = useMemo(
    () =>
      products
        .filter((p) => (line === "all" ? true : p.line === line))
        .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
        .slice()
        .sort((a, b) => a.readiness - b.readiness),
    [q, line],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Products"
        title="Catalog with provenance"
        description="Readiness is category-aware. Products are not penalized for fields that do not apply. Equal average — revenue weights need an outcomes integration."
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter products" className="sm:max-w-xs" />
        <div className="flex flex-wrap gap-2">
          {(["all", "trail", "road", "hike", "recovery"] as const).map((l) => (
            <Button key={l} size="sm" variant={line === l ? "default" : "outline"} onClick={() => setLine(l)}>
              {l === "all" ? "All lines" : lineLabel(l)}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {rows.map((p) => (
          <Link
            key={p.id}
            to="/app/products/$productId"
            params={{ productId: p.id }}
            className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <div className="flex items-start gap-3">
              <ProductMark tint={p.tint} line={p.line} />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-muted-foreground">
                  {p.productType} · {p.variantCount} variants · {formatUsd(p.priceFrom)}
                </p>
              </div>
              <span className="font-display text-xl tabular">{formatScore(p.readiness, 0)}</span>
            </div>
            <ScoreBar className="mt-3" value={p.readiness} tone={toneForScore(p.readiness)} />
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="outline">{lineLabel(p.line)}</Badge>
              <Badge variant={p.offerFreshness === "conflict" ? "danger" : p.offerFreshness === "stale" ? "caution" : "outline"}>
                {p.offerFreshness}
              </Badge>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Top gap: {p.topGap}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
