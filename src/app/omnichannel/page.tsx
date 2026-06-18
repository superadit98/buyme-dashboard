/**
 * ============================================
 * OMNICHANNEL PAGE — Monitoring Multi-Channel
 * ============================================
 * 
 * Menampilkan performa penjualan berdasarkan channel:
 * - Shopee
 * - Tokopedia
 * - TikTok Shop
 * - Website
 * 
 * Data diambil dari Google Sheets CSV via fetchData.
 */

import { getOrders, getSales, formatRupiah, formatNumber } from "@/lib/fetchData";
import { Store, ShoppingBag, Globe, Video, ExternalLink } from "lucide-react";
import OmnichannelCharts from "./OmnichannelCharts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Channel config — icon dan warna
const CHANNEL_CONFIG: Record<string, { icon: typeof Store; color: string; bgColor: string }> = {
  "Shopee": { icon: ShoppingBag, color: "text-orange-400", bgColor: "bg-orange-500/10" },
  "Tokopedia": { icon: Store, color: "text-green-400", bgColor: "bg-green-500/10" },
  "TikTok Shop": { icon: Video, color: "text-pink-400", bgColor: "bg-pink-500/10" },
  "Website": { icon: Globe, color: "text-blue-400", bgColor: "bg-blue-500/10" },
};

export default async function OmnichannelPage() {
  const [orders, sales] = await Promise.all([getOrders(), getSales()]);

  // Hitung data per channel
  const channels = ["Shopee", "Tokopedia", "TikTok Shop", "Website"];

  const channelStats = channels.map((ch) => {
    const chOrders = orders.filter((o) => o.channel === ch);
    const chSales = sales.filter((s) => s.channel === ch);
    const totalRevenue = chSales.reduce((sum, s) => sum + s.revenue, 0);
    const totalProfit = chSales.reduce((sum, s) => sum + s.profit, 0);
    const delivered = chOrders.filter((o) => o.status === "Delivered").length;
    const pending = chOrders.filter((o) => o.status === "Pending" || o.status === "Packed").length;
    const cancelled = chOrders.filter((o) => o.status === "Cancelled").length;
    const fulfillmentRate = chOrders.length > 0
      ? Math.round(((chOrders.length - cancelled) / chOrders.length) * 100)
      : 0;
    const totalQty = chSales.reduce((sum, s) => sum + s.quantity, 0);

    return {
      name: ch,
      totalOrders: chOrders.length,
      totalRevenue,
      totalProfit,
      delivered,
      pending,
      cancelled,
      fulfillmentRate,
      totalQty,
    };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue);

  // Total stats
  const totalOrdersAll = orders.length;
  const totalRevenueAll = sales.reduce((sum, s) => sum + s.revenue, 0);

  // Data untuk chart
  const chartData = channelStats.map((ch) => ({
    name: ch.name,
    revenue: ch.totalRevenue,
    orders: ch.totalOrders,
    profit: ch.totalProfit,
  }));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Omnichannel Monitoring</h1>
        <p className="text-sm text-gray-400">
          Performa penjualan dari berbagai channel penjualan
        </p>
      </div>

      {/* Channel Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channelStats.map((ch) => {
          const config = CHANNEL_CONFIG[ch.name] || { icon: Store, color: "text-gray-400", bgColor: "bg-gray-500/10" };
          const Icon = config.icon;
          const revenueShare = totalRevenueAll > 0
            ? Math.round((ch.totalRevenue / totalRevenueAll) * 100)
            : 0;

          return (
            <div
              key={ch.name}
              className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-400">{ch.name}</p>
                  <p className="mt-2 text-2xl font-bold text-gray-100">
                    {formatRupiah(ch.totalRevenue)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {revenueShare}% dari total revenue
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${config.bgColor}`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#262636] pt-4">
                <div>
                  <p className="text-xs text-gray-500">Pesanan</p>
                  <p className="text-lg font-bold text-gray-100">{ch.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Terjual</p>
                  <p className="text-lg font-bold text-gray-100">{ch.totalQty}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Selesai</p>
                  <p className="text-lg font-bold text-green-600">{ch.delivered}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Fulfillment</p>
                  <p className={`text-lg font-bold ${ch.fulfillmentRate >= 80 ? "text-green-600" : "text-amber-600"}`}>
                    {ch.fulfillmentRate}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Comparison Chart */}
      <OmnichannelCharts data={chartData} />

      {/* Channel Detail Table */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] shadow-sm">
        <div className="border-b border-[#262636] px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-100">
            Detail Per Channel
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#262636] bg-[#111118]">
                <th className="px-4 py-3 font-medium text-gray-400">Channel</th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">Pesanan</th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">Terjual</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Revenue</th>
                <th className="px-4 py-3 text-right font-medium text-gray-400">Profit</th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">Fulfillment</th>
                <th className="px-4 py-3 text-center font-medium text-gray-400">Batal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#262636]">
              {channelStats.map((ch) => (
                <tr key={ch.name} className="hover:bg-[#1e1e2a]">
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className="font-medium text-gray-100">{ch.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-gray-400">{ch.totalOrders}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-gray-400">{ch.totalQty}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-gray-100">{formatRupiah(ch.totalRevenue)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-green-600">{formatRupiah(ch.totalProfit)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-center">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      ch.fulfillmentRate >= 80 ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {ch.fulfillmentRate}%
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-center text-red-400">{ch.cancelled}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-[#262636] px-4 py-3 text-sm text-gray-500">
          Total {totalOrdersAll} pesanan dari {channels.length} channel
        </div>
      </div>
    </div>
  );
}
