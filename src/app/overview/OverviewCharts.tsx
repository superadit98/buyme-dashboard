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
const CATEGORY_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function OverviewCharts({
  revenueData,
  orderStatusData,
  categoryData,
  totalRevenue,
  totalProfit,
}: ChartData) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Revenue Chart */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Revenue & Profit per Hari
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2a" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#5a5a72"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#5a5a72"
              tickFormatter={(v) =>
                v >= 1000000 ? `${(v / 1000000).toFixed(1)}jt` : `${(v / 1000).toFixed(0)}rb`
              }
            />
            <Tooltip
              formatter={(value: number) => formatRupiah(value)}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #262636",
                background: "#1e1e2a",
              }}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" radius={[4, 4, 0, 0]} />
            <Bar dataKey="profit" fill="#22c55e" name="Profit" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 flex justify-between border-t border-[#262636] pt-3 text-sm">
          <span className="text-gray-500">Total Revenue</span>
          <span className="font-semibold text-gray-100">{formatRupiah(totalRevenue)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Total Profit</span>
          <span className="font-semibold text-green-600">{formatRupiah(totalProfit)}</span>
        </div>
      </div>

      {/* Order Status Pie */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Status Pesanan
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={orderStatusData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {orderStatusData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} pesanan`, "Jumlah"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Category Revenue */}
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
                  fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
