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

interface ChartData {
  revenueData: { date: string; revenue: number; profit: number }[];
  orderStatusData: { name: string; value: number }[];
  categoryData: { name: string; revenue: number }[];
  totalRevenue: number;
  totalProfit: number;
}

const PIE_COLORS = ["#f59e0b", "#3b82f6", "#6366f1", "#22c55e", "#ef4444"];
const CATEGORY_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899"];

const chartStyle = {
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  background: "#ffffff",
  color: "#1e293b",
  fontSize: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

export default function OverviewCharts({
  revenueData,
  orderStatusData,
  categoryData,
  totalRevenue,
  totalProfit,
}: ChartData) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue & Profit per Hari */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
          <div className="mb-1 text-sm font-semibold text-[var(--text-primary)]">
            Revenue & Profit per Hari
          </div>
          <p className="mb-4 text-xs text-[var(--text-muted)]">Trend pendapatan harian bulan ini</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={revenueData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                tickLine={false}
                interval="preserveStartEnd"
              />
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
                contentStyle={chartStyle}
              />
              <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
              <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[3, 3, 0, 0]} maxBarSize={20} />
              <Bar dataKey="profit" fill="#22c55e" name="Profit" radius={[3, 3, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 text-xs">
            <div>
              <p className="text-[var(--text-muted)]">Total Revenue</p>
              <p className="font-bold text-[var(--text-primary)]">{formatRupiah(totalRevenue)}</p>
            </div>
            <div className="text-right">
              <p className="text-[var(--text-muted)]">Total Profit</p>
              <p className="font-bold text-green-400">{formatRupiah(totalProfit)}</p>
            </div>
          </div>
        </div>

        {/* Status Pesanan */}
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
          <div className="mb-1 text-sm font-semibold text-[var(--text-primary)]">
            Distribusi Status Pesanan
          </div>
          <p className="mb-4 text-xs text-[var(--text-muted)]">Breakdown status dari total pesanan</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={orderStatusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
                paddingAngle={2}
                label={({ name, percent }) =>
                  percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
                }
                labelLine={false}
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} pesanan`, "Jumlah"]}
                contentStyle={chartStyle}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend manual */}
          <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
            {orderStatusData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {item.name}: {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue per Kategori */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-sm">
        <div className="mb-1 text-sm font-semibold text-[var(--text-primary)]">
          Revenue per Kategori Produk
        </div>
        <p className="mb-4 text-xs text-[var(--text-muted)]">Kontribusi revenue dari setiap kategori skincare</p>
        <ResponsiveContainer width="100%" height={Math.max(200, categoryData.length * 45)}>
          <BarChart data={categoryData} layout="vertical" barSize={22}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`
              }
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
              formatter={(value: number) => [formatRupiah(value), "Revenue"]}
              contentStyle={chartStyle}
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {categoryData.map((entry, index) => (
                <Cell key={`cat-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
