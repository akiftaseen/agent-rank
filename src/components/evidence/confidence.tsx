import { Badge } from "@/components/ui/badge";
import type { ConfidenceLabel } from "@/lib/types";
import { evidenceLabel } from "@/lib/scoring";

export function ConfidenceBadge({ value }: { value: number | ConfidenceLabel }) {
  const label = typeof value === "number" ? evidenceLabel(value) : value;
  const variant =
    label === "high" ? "positive" : label === "medium" ? "steel" : label === "low" ? "caution" : "outline";
  const text =
    label === "high" ? "High" : label === "medium" ? "Medium" : label === "low" ? "Low" : "Insufficient";
  return <Badge variant={variant}>{text}</Badge>;
}
