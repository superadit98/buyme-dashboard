import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "amber" | "red";
  badge?: "utama" | "pendukung" | "tambahan";
}

const COLOR_MAP = {
  blue: {
    bg: "bg-blue-900/20",
    icon: "text-blue-500",
    border: "border-blue-900/30",
  },
  green: {
    bg: "bg-green-900/20",
    icon: "text-green-500",
    border: "border-green-900/30",
  },
  amber: {
    bg: "bg-amber-900/20",
    icon: "text-amber-500",
    border: "border-amber-900/30",
  },
  red: {
    bg: "bg-red-900/20",
    icon: "text-red-500",
    border: "border-red-900/30",
  },
};

const BADGE_MAP = {
  utama: {
    label: "KPI Utama",
    class: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  },
  pendukung: {
    label: "KPI Pendukung",
    class: "bg-green-500/15 text-green-400 border border-green-500/30",
  },
  tambahan: {
    label: "KPI Tambahan",
    class: "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border)]",
  },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
  badge,
}: KPICardProps) {
  const colors = COLOR_MAP[color];
  const badgeInfo = badge ? BADGE_MAP[badge] : null;

  return (
    <div className={`rounded-xl border bg-[var(--bg-card)] p-6 shadow-sm ${badge === "utama" ? "border-blue-800/40" : badge === "pendukung" ? "border-green-800/40" : "border-[var(--border)]"}`}>
      {/* Badge */}
      {badgeInfo && (
        <div className="mb-3">
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${badgeInfo.class}`}>
            {badgeInfo.label}
          </span>
        </div>
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--text-secondary)]">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-[var(--text-secondary)]">vs bulan lalu</span>
            </div>
          )}
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.border} border`}
        >
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>
      </div>
    </div>
  );
}
