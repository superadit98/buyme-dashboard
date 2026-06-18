"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatRupiah } from "@/lib/fetchData";

interface Props {
  channelData: { name: string; revenue: number; profit: number; orders: number }[];
  categoryData: { name: string; revenue: number; quantity: number }[];
}

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function SalesCharts({ channelData, categoryData }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Channel Performance */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Revenue per Channel
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={channelData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2a" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#5a5a72" />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#5a5a72"
              tickFormatter={(v) =>
                v >= 1000000
                  ? `${(v / 1000000).toFixed(1)}jt`
                  : `${(v / 1000).toFixed(0)}rb`
              }
            />
            <Tooltip
              formatter={(value: number) => formatRupiah(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #262636",
                backgroundColor: "#1e1e2a",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" fill="#22c55e" name="Profit" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Channel summary */}
        <div className="mt-3 space-y-2 border-t border-[#262636] pt-3">
          {channelData.map((ch, i) => (
            <div key={ch.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-400">{ch.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{ch.orders} transaksi</span>
                <span className="font-medium text-gray-100">
                  {formatRupiah(ch.revenue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Performance */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Revenue per Kategori
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              dataKey="revenue"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {categoryData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatRupiah(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #262636",
                backgroundColor: "#1e1e2a",
                color: "#f1f5f9",
              }}
              labelStyle={{ color: "#f1f5f9" }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Category summary */}
        <div className="mt-3 space-y-2 border-t border-[#262636] pt-3">
          {categoryData.map((cat, i) => (
            <div key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-400">{cat.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{cat.quantity} terjual</span>
                <span className="font-medium text-gray-100">
                  {formatRupiah(cat.revenue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
