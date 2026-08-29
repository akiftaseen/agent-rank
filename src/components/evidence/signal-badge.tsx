import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SIGNAL_META } from "@/lib/scoring";
import type { SignalClass } from "@/lib/types";

const variant: Record<SignalClass, "s1" | "s2" | "s3" | "s4" | "s5" | "s6"> = {
  S1: "s1",
  S2: "s2",
  S3: "s3",
  S4: "s4",
  S5: "s5",
  S6: "s6",
};

export function SignalBadge({ code, showName }: { code: SignalClass; showName?: boolean }) {
  const meta = SIGNAL_META[code];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>
          <Badge variant={variant[code]}>
            {code}
            {showName ? ` · ${meta.short}` : null}
          </Badge>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-medium text-foreground">{meta.name}</p>
        <p className="mt-1 text-muted-foreground">{meta.fidelity}</p>
      </TooltipContent>
    </Tooltip>
  );
}
