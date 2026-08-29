import { cn } from "@/lib/utils";

export function ScoreBar({
  value,
  className,
  tone = "steel",
}: {
  value: number;
  className?: string;
  tone?: "steel" | "positive" | "caution" | "danger";
}) {
  const color =
    tone === "positive"
      ? "bg-positive"
      : tone === "caution"
        ? "bg-caution"
        : tone === "danger"
          ? "bg-danger"
          : "bg-primary";
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-secondary", className)}>
      <div className={cn("h-full rounded-full", color)} style={{ width: `${v}%` }} />
    </div>
  );
}

export function toneForScore(score: number): "positive" | "caution" | "danger" | "steel" {
  if (score >= 75) return "positive";
  if (score >= 50) return "steel";
  if (score >= 30) return "caution";
  return "danger";
}
