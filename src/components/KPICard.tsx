import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;     // Positive = naik, negative = turun
    isPositive: boolean;
  };
  color?: "blue" | "green" | "amber" | "red";
}

const COLOR_MAP = {
  blue: {
    bg: "bg-blue-900/20",
    icon: "text-blue-600",
    border: "border-blue-900/30",
  },
  green: {
    bg: "bg-green-900/20",
    icon: "text-green-600",
    border: "border-green-900/30",
  },
  amber: {
    bg: "bg-amber-900/20",
    icon: "text-amber-600",
    border: "border-amber-900/30",
  },
  red: {
    bg: "bg-red-900/20",
    icon: "text-red-600",
    border: "border-red-900/30",
  },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
}: KPICardProps) {
  const colors = COLOR_MAP[color];

  return (
    <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-100">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-400">vs bulan lalu</span>
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
