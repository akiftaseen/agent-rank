import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { brandById, intents, observations } from "@/lib/data/seed";

export const Route = createFileRoute("/app/competitors/$brandId")({ component: CompetitorDetail });

function CompetitorDetail() {
  const { brandId } = Route.useParams();
  const brand = brandById(brandId);
  if (!brand) return <p>Not found.</p>;
  const winning = intents.filter((i) =>
    observations.some((o) => o.intentId === i.id && o.mentions.some((m) => m.brandId === brand.id && m.rank === 1)),
  );

  return (
    <div>
      <PageHeader
        eyebrow={brand.entityType.replace("_", " ")}
        title={brand.name}
        description={brand.discoveryReason}
        actions={
          <Button asChild variant="outline">
            <Link to="/app/competitors">All competitors</Link>
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        <Badge>{brand.status}</Badge>
        <Badge variant="outline">{brand.domain}</Badge>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Aliases: {brand.aliases.join(", ") || "none"}</p>
      <h2 className="mt-8 font-display text-2xl">Winning intents (first position in at least one sample)</h2>
      <ul className="mt-3 space-y-2">
        {winning.map((i) => (
          <li key={i.id}>
            <Link className="text-sm hover:text-primary" to="/app/intents/$intentId" params={{ intentId: i.id }}>
              {i.text}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-muted-foreground">
        Public competitor facts retain source URLs and observation dates. This demo does not store competitor HTML.
      </p>
    </div>
  );
}
