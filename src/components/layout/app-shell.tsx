import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Beaker,
  BookOpen,
  Flag,
  LayoutDashboard,
  Menu,
  Package,
  ScrollText,
  Settings,
  Swords,
  Target,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { adapters, metrics, workspace } from "@/lib/data/seed";
import { cn, formatRelative } from "@/lib/utils";

const NAV = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/intents", label: "Intents", icon: Target },
  { to: "/app/products", label: "Products", icon: Package },
  { to: "/app/competitors", label: "Competitors", icon: Swords },
  { to: "/app/issues", label: "Issues", icon: Flag },
  { to: "/app/experiments", label: "Experiments", icon: Beaker },
  { to: "/app/reports", label: "Reports", icon: ScrollText },
  { to: "/app/methodology", label: "Methodology", icon: BookOpen },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-0.5">
      {NAV.map((item) => {
        const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors duration-150",
              active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const usedPct = Math.round((workspace.probeUsed / workspace.probeQuota) * 100);
  return (
    <div className="flex h-full flex-col">
      <Link to="/" onClick={onNavigate} className="mb-6 flex items-center px-2 pt-1 text-foreground">
        <Logo />
      </Link>
      <div className="mb-4 rounded-lg border border-border bg-card px-3 py-3">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Workspace</p>
        <p className="mt-1 font-medium">{workspace.storeName}</p>
        <p className="text-xs text-muted-foreground">{workspace.domain}</p>
      </div>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto space-y-3 pt-6">
        <div className="rounded-lg border border-border bg-card px-3 py-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Probe units</span>
            <span className="tabular text-foreground">
              {workspace.probeUsed.toLocaleString()} / {workspace.probeQuota.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary" style={{ width: `${usedPct}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">Growth plan · unused units do not roll over</p>
        </div>
        <p className="px-1 text-[11px] leading-relaxed text-muted-foreground">
          Read-only demo catalog. Vitrine never writes to a store.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const index = metrics.index;

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-background px-3 py-4 lg:flex lg:flex-col">
        <SidebarBody />
      </aside>
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-sm">
          <Button variant="ghost" size="icon-sm" className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm">
              <span className="text-muted-foreground">Ridgeway · en-US · </span>
              <span className="text-foreground">
                {index.value != null ? `Index ${Math.round(index.value)} · ${index.label} confidence` : "Index unavailable"}
              </span>
            </p>
          </div>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Fresh {formatRelative(workspace.lastScanAt)} · {adapters.filter((a) => a.status === "active").length} adapters
          </p>
          <Button asChild variant="outline" size="sm">
            <Link to="/app/methodology">Signal classes</Link>
          </Button>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SidebarBody onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
