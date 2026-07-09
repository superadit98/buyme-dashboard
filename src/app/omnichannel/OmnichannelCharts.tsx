"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatRupiah } from "@/lib/fetchData";

interface Props {
  data: { name: string; revenue: number; orders: number; profit: number }[];
}

const COLORS = ["#f97316", "#16a34a", "#ec4899", "#2563eb"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const labelStyle = { color: "#1e293b", fontWeight: 600 };

export default function OmnichannelCharts({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Revenue & Profit per Channel */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Revenue & Profit per Channel</h3>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Perbandingan revenue dan profit antar marketplace</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`
              }
            />
            <Tooltip
              formatter={(value: number) => [formatRupiah(value), ""]}
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" fill="#2563eb" name="Revenue" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="profit" fill="#16a34a" name="Profit" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Distribusi Pesanan */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Distribusi Pesanan per Channel</h3>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Proporsi jumlah order dari setiap marketplace</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              dataKey="orders"
              paddingAngle={2}
              label={({ name, percent }) =>
                percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} pesanan`, "Jumlah"]}
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend manual */}
        <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3">
          {data.map((ch, i) => (
            <div key={ch.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[var(--text-secondary)]">{ch.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-muted)]">{ch.orders} pesanan</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatRupiah(ch.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
