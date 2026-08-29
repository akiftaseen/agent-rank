import { cn } from "@/lib/utils";
import type { ProductLine } from "@/lib/types";

export function ProductMark({
  tint,
  line,
  className,
}: {
  tint: string;
  line: ProductLine;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex size-10 items-center justify-center rounded-md", className)}
      style={{ background: tint }}
      aria-hidden
    >
      <svg viewBox="0 0 32 32" className="size-6 text-paper">
        {line === "recovery" ? (
          <path
            d="M6 18c4-6 16-6 20 0v4c-4 3-16 3-20 0v-4z"
            fill="currentColor"
            opacity="0.9"
          />
        ) : line === "hike" ? (
          <path
            d="M5 20c2-8 8-11 14-9 4 1 7 4 8 8v3H5v-2z"
            fill="currentColor"
            opacity="0.9"
          />
        ) : (
          <path
            d="M4 19c3-7 10-10 16-7 3 1.5 6 3 8 6v3.5H4V19z"
            fill="currentColor"
            opacity="0.9"
          />
        )}
      </svg>
    </span>
  );
}
