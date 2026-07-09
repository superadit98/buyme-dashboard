"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatRupiah } from "@/lib/fetchData";

interface Props {
  channelData: { name: string; revenue: number; profit: number; orders: number }[];
  categoryData: { name: string; revenue: number; quantity: number }[];
  salesTrend: { date: string; revenue: number; profit: number }[];
}

const COLORS = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#7c3aed"];

const tooltipStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  color: "#1e293b",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const labelStyle = { color: "#1e293b", fontWeight: 600 };

export default function SalesCharts({ channelData, categoryData, salesTrend }: Props) {
  const catHeight = Math.max(220, categoryData.length * 48);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Tren Penjualan */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Tren Penjualan</h3>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Revenue & profit harian</p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} interval="preserveStartEnd" />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`}
            />
            <Tooltip
              formatter={(value: number) => [formatRupiah(value), ""]}
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={2} dot={{ r: 3 }} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue per Channel */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
        <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Revenue per Channel</h3>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Shopee, Tokopedia, TikTok Shop</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={channelData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} tickLine={false} />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`}
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

        {/* Channel summary */}
        <div className="mt-3 space-y-2 border-t border-[var(--border)] pt-3">
          {channelData.map((ch, i) => (
            <div key={ch.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[var(--text-secondary)]">{ch.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[var(--text-muted)]">{ch.orders} transaksi</span>
                <span className="font-semibold text-[var(--text-primary)]">{formatRupiah(ch.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue per Kategori */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm lg:col-span-2">
        <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Revenue per Kategori Produk</h3>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Kontribusi revenue per kategori skincare</p>
        <ResponsiveContainer width="100%" height={catHeight}>
          <BarChart data={categoryData} layout="vertical" barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`}
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12, fill: "#475569" }}
              tickLine={false}
              axisLine={false}
              width={90}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatRupiah(value as number), "Revenue"]}
              contentStyle={tooltipStyle}
              labelStyle={labelStyle}
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {categoryData.map((_, index) => (
                <Cell key={`cat-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
