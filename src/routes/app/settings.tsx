import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { adapters, workspace } from "@/lib/data/seed";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

function SettingsPage() {
  const aliases = useAppStore((s) => s.brandAliases);
  const setAliases = useAppStore((s) => s.setBrandAliases);
  const [aliasText, setAliasText] = useState(aliases.join(", "));
  const [kill, setKill] = useState<Record<string, boolean>>({});

  return (
    <div className="max-w-2xl">
      <PageHeader
        eyebrow="Settings"
        title="Workspace"
        description="Demo store is pre-connected. Vitrine requests read_products only — never customer or order scopes."
      />

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Store</h2>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd>{workspace.storeName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Domain</dt>
            <dd>{workspace.domain}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Market</dt>
            <dd>
              {workspace.country} · {workspace.language} · {workspace.currency}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Plan</dt>
            <dd className="capitalize">{workspace.plan} · $249/mo</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">Granted scopes: read_products. No write_products, no customers, no orders.</p>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Brand aliases</h2>
        <Label htmlFor="aliases" className="mt-3 block text-muted-foreground">
          Comma-separated
        </Label>
        <Input
          id="aliases"
          className="mt-1.5"
          value={aliasText}
          onChange={(e) => setAliasText(e.target.value)}
        />
        <Button
          className="mt-3"
          size="sm"
          onClick={() => {
            setAliases(aliasText.split(",").map((s) => s.trim()).filter(Boolean));
            toast("Aliases saved");
          }}
        >
          Save aliases
        </Button>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Adapters</h2>
        <p className="mt-1 text-sm text-muted-foreground">Global kill switch per adapter. Failures are not converted into zero visibility.</p>
        <ul className="mt-4 space-y-3">
          {adapters.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm">{a.surface}</p>
                <p className="text-xs text-muted-foreground">{a.code}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={kill[a.id] ? "danger" : "positive"}>{kill[a.id] ? "disabled" : a.status}</Badge>
                <Switch
                  checked={!kill[a.id]}
                  onCheckedChange={(v) => {
                    setKill((s) => ({ ...s, [a.id]: !v }));
                    toast(v ? `${a.provider} enabled` : `${a.provider} kill switch on`);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Usage</h2>
        <p className="mt-2 text-sm">
          {workspace.probeUsed.toLocaleString()} of {workspace.probeQuota.toLocaleString()} probe units this
          period.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          A probe unit is one intent × one adapter × one locale × one repetition. Unused units do not roll
          over. Provider outages release reserved units where practical.
        </p>
      </section>

      <section className="mt-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-medium">Data</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Demo data lives in this browser. Export observations from Reports. Deleting the workspace in a
          production app queues hard deletion within 30 days.
        </p>
      </section>
    </div>
  );
}
