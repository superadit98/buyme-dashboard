import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; isPositive: boolean };
  color?: "blue" | "green" | "amber" | "red";
  badge?: "utama" | "pendukung" | "tambahan";
}

const COLOR_MAP = {
  blue:  { bg: "bg-blue-900/20",  icon: "text-blue-400",  border: "border-blue-900/30" },
  green: { bg: "bg-green-900/20", icon: "text-green-400", border: "border-green-900/30" },
  amber: { bg: "bg-amber-900/20", icon: "text-amber-400", border: "border-amber-900/30" },
  red:   { bg: "bg-red-900/20",   icon: "text-red-400",   border: "border-red-900/30" },
};

const BADGE_MAP = {
  utama:     { label: "KPI Utama",     cls: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  pendukung: { label: "KPI Pendukung", cls: "bg-green-500/10 text-green-400 border-green-500/30" },
  tambahan:  { label: "KPI Tambahan",  cls: "bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border)]" },
};

const CARD_BORDER = {
  utama:     "border-blue-800/40",
  pendukung: "border-green-800/40",
  tambahan:  "border-[var(--border)]",
};

export default function KPICard({
  title, value, subtitle, icon: Icon, trend, color = "blue", badge,
}: KPICardProps) {
  const c = COLOR_MAP[color];
  const b = badge ? BADGE_MAP[badge] : null;
  const borderCls = badge ? CARD_BORDER[badge] : "border-[var(--border)]";

  return (
    <div className={`rounded-xl border bg-[var(--bg-card)] p-5 shadow-sm ${borderCls}`}>
      {/* Badge */}
      {b && (
        <span className={`mb-3 inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold ${b.cls}`}>
          {b.label}
        </span>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text-secondary)] truncate">{title}</p>
          <p className="mt-1 text-3xl font-bold text-[var(--text-primary)] leading-tight">{value}</p>
          {subtitle && (
            <p className="mt-1 text-xs text-[var(--text-muted)] leading-snug">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-sm font-medium ${trend.isPositive ? "text-green-400" : "text-red-400"}`}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-[var(--text-secondary)]">vs bulan lalu</span>
            </div>
          )}
        </div>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${c.bg} ${c.border}`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
}
