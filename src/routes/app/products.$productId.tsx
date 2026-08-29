import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductMark } from "@/components/evidence/product-mark";
import { ScoreBar, toneForScore } from "@/components/evidence/score-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { intents, issues, lineLabel, productById } from "@/lib/data/seed";
import { READINESS_WEIGHTS } from "@/lib/scoring";
import { formatScore, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/app/products/$productId")({ component: ProductDetail });

function ProductDetail() {
  const { productId } = Route.useParams();
  const product = productById(productId);
  if (!product) return <p>Product not found.</p>;
  const relatedIntents = intents.filter((i) => i.linkedProductIds.includes(product.id));
  const relatedIssues = issues.filter((i) => i.affectedProductIds.includes(product.id));

  return (
    <div>
      <PageHeader
        eyebrow={lineLabel(product.line)}
        title={product.title}
        description={product.description}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/products">All products</Link>
          </Button>
        }
      />
      <div className="flex items-center gap-4">
        <ProductMark tint={product.tint} line={product.line} className="size-14 rounded-lg" />
        <div>
          <p className="text-sm text-muted-foreground">
            {product.canonicalUrl} · {product.variantCount} variants · {formatUsd(product.priceFrom)}
          </p>
          <div className="mt-2 flex gap-2">
            <Badge variant="outline">{product.productType}</Badge>
            <Badge variant={product.offerFreshness === "conflict" ? "danger" : "outline"}>{product.offerFreshness}</Badge>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Agent readiness {formatScore(product.readiness, 0)}</h2>
          <p className="mt-1 text-sm text-muted-foreground">Profile {product.categoryProfileId} v1.0</p>
          <div className="mt-4 space-y-3">
            {Object.entries(READINESS_WEIGHTS).map(([key, weight]) => {
              const v = product.readinessComponents[key] ?? 0;
              return (
                <div key={key}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="capitalize text-muted-foreground">
                      {key} · w{weight}
                    </span>
                    <span className="tabular">{Math.round(v)}</span>
                  </div>
                  <ScoreBar value={v} tone={toneForScore(v)} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl">Facts with provenance</h2>
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border">
            {product.facts.map((f) => (
              <li key={f.key} className="px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium">{f.label}</p>
                  <Badge
                    variant={
                      f.status === "verified" ? "positive" : f.status === "missing" ? "danger" : f.status === "inferred" ? "caution" : "outline"
                    }
                  >
                    {f.status}
                  </Badge>
                </div>
                <p className="mt-1 text-sm">{f.value}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {f.provenance.sourceType} · {f.provenance.locator} · conf {f.provenance.confidence.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 className="mt-10 font-display text-2xl">Variants</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-elevated text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">SKU</th>
              <th className="px-3 py-2 font-medium">Options</th>
              <th className="px-3 py-2 font-medium">GTIN</th>
              <th className="px-3 py-2 font-medium">Price</th>
              <th className="px-3 py-2 font-medium">Avail</th>
            </tr>
          </thead>
          <tbody>
            {product.variants.slice(0, 8).map((v) => (
              <tr key={v.id} className="border-t border-border">
                <td className="px-3 py-2 font-mono text-xs">{v.sku}</td>
                <td className="px-3 py-2 text-muted-foreground">
                  {Object.entries(v.options)
                    .map(([k, val]) => `${k} ${val}`)
                    .join(" · ")}
                </td>
                <td className="px-3 py-2 font-mono text-xs">{v.gtin ?? "—"}</td>
                <td className="px-3 py-2 tabular">{formatUsd(v.price)}</td>
                <td className="px-3 py-2">{v.available ? "in stock" : "out"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Showing 8 of {product.variants.length} variants.</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Intents</h2>
          <ul className="mt-3 space-y-2">
            {relatedIntents.map((i) => (
              <li key={i.id}>
                <Link className="text-sm hover:text-primary" to="/app/intents/$intentId" params={{ intentId: i.id }}>
                  {i.text}
                </Link>
              </li>
            ))}
            {relatedIntents.length === 0 ? <p className="text-sm text-muted-foreground">Not linked to the active panel.</p> : null}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-2xl">Issues</h2>
          <ul className="mt-3 space-y-2">
            {relatedIssues.map((i) => (
              <li key={i.id}>
                <Link className="text-sm hover:text-primary" to="/app/issues/$issueId" params={{ issueId: i.id }}>
                  {i.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
