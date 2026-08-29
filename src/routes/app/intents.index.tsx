import { createFileRoute, Link } from "@tanstack/react-router";
import { Pin, PinOff } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adapters, intentObservations, intents } from "@/lib/data/seed";
import { inclusionRate } from "@/lib/scoring";
import { useAppStore } from "@/lib/store";
import { formatPct } from "@/lib/utils";

export const Route = createFileRoute("/app/intents/")({ component: IntentsList });

function IntentsList() {
  const overrides = useAppStore((s) => s.intentOverrides);
  const setOverride = useAppStore((s) => s.setIntentOverride);
  const signalFilter = useAppStore((s) => s.signalFilter);
  const setSignalFilter = useAppStore((s) => s.setSignalFilter);
  const [q, setQ] = useState("");
  const [source, setSource] = useState("all");

  const rows = useMemo(() => {
    return intents
      .filter((i) => !overrides[i.id]?.archived)
      .filter((i) => (source === "all" ? true : i.source === source))
      .filter((i) => i.text.toLowerCase().includes(q.toLowerCase()))
      .map((i) => {
        let obs = intentObservations(i.id);
        if (signalFilter === "S2") obs = obs.filter((o) => o.signalClass === "S2");
        if (signalFilter === "S3") obs = obs.filter((o) => o.signalClass === "S3");
        const inc = inclusionRate(obs);
        const leader = obs
          .flatMap((o) => o.mentions)
          .filter((m) => m.brandId && m.brandId !== "ridgeway")
          .sort((a, b) => a.rank - b.rank)[0];
        return { intent: i, inc, n: obs.length, leader: leader?.displayText ?? "—", pinned: overrides[i.id]?.pinned };
      })
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || a.inc.rate - b.inc.rate);
  }, [overrides, q, source, signalFilter]);

  return (
    <div>
      <PageHeader
        eyebrow="Intents"
        title="Approved buyer panel"
        description="Synthetic intents are labeled. Weights are not search volume. Editing wording would create a panel break — archive instead in this demo."
      />
      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter intents" className="sm:max-w-xs" />
        <div className="flex flex-wrap gap-2">
          {["all", "synthetic", "merchant"].map((s) => (
            <Button key={s} size="sm" variant={source === s ? "default" : "outline"} onClick={() => setSource(s)}>
              {s}
            </Button>
          ))}
          {(["all", "S2", "S3"] as const).map((s) => (
            <Button key={s} size="sm" variant={signalFilter === s ? "secondary" : "ghost"} onClick={() => setSignalFilter(s)}>
              {s === "all" ? "All signals" : s}
            </Button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-elevated text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-3 py-3 font-medium">Intent</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="px-3 py-3 font-medium">Inclusion</th>
              <th className="px-3 py-3 font-medium">n</th>
              <th className="px-3 py-3 font-medium">Leader</th>
              <th className="px-3 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ intent, inc, n, leader, pinned }) => (
              <tr key={intent.id} className="border-t border-border">
                <td className="px-3 py-3">
                  <Link to="/app/intents/$intentId" params={{ intentId: intent.id }} className="hover:text-primary">
                    {intent.text}
                  </Link>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {intent.type} · {intent.funnelStage} · {intent.specificity}
                    {intent.priority ? " · priority" : ""}
                  </p>
                </td>
                <td className="px-3 py-3">
                  <Badge variant={intent.source === "synthetic" ? "steel" : "outline"}>{intent.source}</Badge>
                </td>
                <td className="px-3 py-3 tabular">
                  {formatPct(inc.rate, 0)}
                  <span className="block text-[11px] text-muted-foreground">
                    {formatPct(inc.lower, 0)}–{formatPct(inc.upper, 0)}
                  </span>
                </td>
                <td className="px-3 py-3 tabular text-muted-foreground">{n}</td>
                <td className="px-3 py-3 text-muted-foreground">{leader}</td>
                <td className="px-3 py-3">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={pinned ? "Unpin" : "Pin"}
                    onClick={() => setOverride(intent.id, { pinned: !pinned })}
                  >
                    {pinned ? <Pin className="size-4 text-primary" /> : <PinOff className="size-4" />}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {adapters.length} adapters · Jeffreys interval on unweighted repetitions. Cross-provider charts are
        descriptive and do not imply equal audience size.
      </p>
    </div>
  );
}
