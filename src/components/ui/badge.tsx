import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "border-transparent bg-secondary text-muted-foreground",
        steel: "border-transparent bg-primary/15 text-primary",
        positive: "border-transparent bg-positive/15 text-positive",
        caution: "border-transparent bg-caution/15 text-caution",
        danger: "border-transparent bg-danger/15 text-danger",
        outline: "border-border text-muted-foreground",
        s1: "border-transparent bg-positive/15 text-positive",
        s2: "border-transparent bg-info/15 text-info",
        s3: "border-transparent bg-primary/15 text-primary",
        s4: "border-transparent bg-caution/15 text-caution",
        s5: "border-transparent bg-secondary text-foreground",
        s6: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
