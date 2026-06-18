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

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function SalesCharts({ channelData, categoryData, salesTrend }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Sales Trend */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Tren Penjualan
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2a" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#5a5a72" />
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
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Revenue" />
            <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </div>

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
            <Legend />
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
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm lg:col-span-2">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Revenue per Kategori Produk
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={categoryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2a" />
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              stroke="#5a5a72"
              tickFormatter={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`
              }
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fontSize: 12 }}
              stroke="#5a5a72"
              width={80}
            />
            <Tooltip
              formatter={(value: number) => formatRupiah(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #262636",
                background: "#1e1e2a",
              }}
            />
            <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
              {categoryData.map((_, index) => (
                <Cell
                  key={`cat-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
