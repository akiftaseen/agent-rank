import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function TrendChart({
  data,
  dataKey,
  label,
}: {
  data: { week: string; [k: string]: string | number }[];
  dataKey: string;
  label: string;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-48 rounded-md bg-secondary/50" />;

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="week"
            tickFormatter={(v: string) => v.slice(5)}
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              background: "var(--color-popover)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(v) => `Week of ${v}`}
            formatter={(v: number) => [typeof v === "number" && v <= 1 ? `${(v * 100).toFixed(0)}%` : v, label]}
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.12}
            strokeWidth={1.6}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
