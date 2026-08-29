import { cn } from "@/lib/utils";

export function Logo({ className, markOnly }: { className?: string; markOnly?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden>
        <rect x="3" y="5" width="26" height="22" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <rect x="7" y="9" width="18" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <path d="M7 16h18" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        <path d="M16 9v14" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      </svg>
      {markOnly ? null : (
        <span className="font-display text-xl font-medium tracking-tight">Vitrine</span>
      )}
    </span>
  );
}
