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
  data: {
    name: string;
    revenue: number;
    orders: number;
    profit: number;
  }[];
}

const COLORS = ["#f97316", "#22c55e", "#ec4899", "#3b82f6"];

export default function OmnichannelCharts({ data }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Revenue Comparison */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Revenue & Profit per Channel
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
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
      </div>

      {/* Orders Share */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold text-gray-100">
          Distribusi Pesanan per Channel
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={95}
              dataKey="orders"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value} pesanan`, "Jumlah"]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Channel summary */}
        <div className="mt-3 space-y-2 border-t border-[#262636] pt-3">
          {data.map((ch, i) => (
            <div key={ch.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-gray-400">{ch.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{ch.orders} pesanan</span>
                <span className="font-medium text-gray-100">
                  {formatRupiah(ch.revenue)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
