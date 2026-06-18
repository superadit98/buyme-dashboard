/**
 * ============================================
 * SALES PAGE — Sales Analytics
 * ============================================
 * 
 * Sesuai proposal:
 * - Tren penjualan
 * - Produk terlaris
 * - Kategori produk terlaris
 * - Performa penjualan berdasarkan channel
 */

import { getSales, formatRupiah } from "@/lib/fetchData";
import SalesCharts from "./SalesCharts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SalesPage() {
  const sales = await getSales();

  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const totalCost = sales.reduce((sum, s) => sum + s.cost, 0);
  const totalQty = sales.reduce((sum, s) => sum + s.quantity, 0);
  const avgOrderValue = sales.length > 0 ? totalRevenue / sales.length : 0;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Channel breakdown
  const channelData = sales.reduce<Record<string, { revenue: number; profit: number; orders: number }>>(
    (acc, s) => {
      if (!acc[s.channel]) acc[s.channel] = { revenue: 0, profit: 0, orders: 0 };
      acc[s.channel].revenue += s.revenue;
      acc[s.channel].profit += s.profit;
      acc[s.channel].orders += 1;
      return acc;
    },
    {}
  );
  const channelChartData = Object.entries(channelData)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Category breakdown
  const categoryData = sales.reduce<Record<string, { revenue: number; quantity: number }>>(
    (acc, s) => {
      if (!acc[s.productCategory]) acc[s.productCategory] = { revenue: 0, quantity: 0 };
      acc[s.productCategory].revenue += s.revenue;
      acc[s.productCategory].quantity += s.quantity;
      return acc;
    },
    {}
  );
  const categoryChartData = Object.entries(categoryData)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue);

  // Sales trend (revenue per date)
  const trendByDate = sales.reduce<Record<string, { revenue: number; profit: number }>>(
    (acc, s) => {
      if (!acc[s.date]) acc[s.date] = { revenue: 0, profit: 0 };
      acc[s.date].revenue += s.revenue;
      acc[s.date].profit += s.profit;
      return acc;
    },
    {}
  );
  const salesTrend = Object.entries(trendByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      revenue: data.revenue,
      profit: data.profit,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Sales Analytics</h1>
        <p className="text-sm text-gray-400">
          Analisis penjualan, tren, dan performa per channel & kategori
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-6">
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-100">{formatRupiah(totalRevenue)}</p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-green-600">{formatRupiah(totalProfit)}</p>
          <p className="text-xs text-gray-500">Total Profit</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-100">{formatRupiah(totalCost)}</p>
          <p className="text-xs text-gray-500">Total Modal</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{totalQty}</p>
          <p className="text-xs text-gray-500">Total Terjual</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-100">{formatRupiah(avgOrderValue)}</p>
          <p className="text-xs text-gray-500">Rata-rata/Transaksi</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{profitMargin.toFixed(1)}%</p>
          <p className="text-xs text-gray-500">Profit Margin</p>
        </div>
      </div>

      {/* Charts */}
      <SalesCharts
        channelData={channelChartData}
        categoryData={categoryChartData}
        salesTrend={salesTrend}
      />

      {/* Sales Table */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] shadow-sm">
        <div className="border-b border-[#262636] px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-100">
            Detail Transaksi
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#262636] bg-[#111118]">
                <th className="px-4 py-3 font-medium text-gray-400">ID</th>
                <th className="px-4 py-3 font-medium text-gray-400">Order</th>
                <th className="px-4 py-3 font-medium text-gray-400">Tanggal</th>
                <th className="px-4 py-3 font-medium text-gray-400">Kategori</th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">Qty</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Revenue</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Modal</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Profit</th>
                <th className="px-4 py-3 font-medium text-gray-400">Channel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262636]">
              {sales.map((s) => (
                <tr key={s.id} className="hover:bg-[#1e1e2a]">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">{s.id}</td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-blue-600">{s.orderId}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                    {new Date(s.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-400">{s.productCategory}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-gray-400">{s.quantity}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-gray-100">{formatRupiah(s.revenue)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-gray-500">{formatRupiah(s.cost)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-green-600">{formatRupiah(s.profit)}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="inline-flex items-center rounded-md bg-[#1e1e2a] px-2 py-0.5 text-xs font-medium text-gray-300">
                      {s.channel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#262636] px-4 py-3 text-sm text-gray-500">
          Total {sales.length} transaksi
        </div>
      </div>
    </div>
  );
}
