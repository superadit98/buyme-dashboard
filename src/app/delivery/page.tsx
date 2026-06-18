/**
 * ============================================
 * DELIVERY PAGE — Delivery Performance Monitoring
 * ============================================
 * 
 * Sesuai proposal:
 * - Persentase pengiriman tepat waktu
 * - Jumlah pengiriman yang mengalami keterlambatan
 * - Wilayah tujuan pengiriman terbanyak
 */

import { getShipments, getOrders, formatRupiah } from "@/lib/fetchData";
import DeliveryTable from "./DeliveryTable";
import { MapPin, Clock, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DeliveryPage() {
  const [shipments, orders] = await Promise.all([getShipments(), getOrders()]);

  const stats = {
    total: shipments.length,
    inTransit: shipments.filter((s) => s.status === "In Transit").length,
    delivered: shipments.filter((s) => s.status === "Delivered").length,
    delayed: shipments.filter((s) => s.status === "Delayed").length,
    pending: shipments.filter((s) => s.status === "Pending").length,
    totalCost: shipments.reduce((sum, s) => sum + s.cost, 0),
    totalWeight: shipments.reduce((sum, s) => sum + s.weight, 0),
  };

  // On-time analysis
  const deliveredShipments = shipments.filter((s) => s.status === "Delivered");
  const onTime = deliveredShipments.filter((s) => {
    if (!s.actualDelivery || !s.estimatedDelivery) return false;
    return s.actualDelivery <= s.estimatedDelivery;
  }).length;
  const onTimePercent = deliveredShipments.length > 0
    ? Math.round((onTime / deliveredShipments.length) * 100)
    : 0;
  const delayed = deliveredShipments.filter((s) => {
    if (!s.actualDelivery || !s.estimatedDelivery) return false;
    return s.actualDelivery > s.estimatedDelivery;
  }).length;

  // Top destinations
  const destinationCounts = shipments.reduce<Record<string, number>>(
    (acc, s) => {
      const dest = s.destination || (orders.find((o) => o.id === s.orderId)?.address || "-");
      acc[dest] = (acc[dest] || 0) + 1;
      return acc;
    },
    {}
  );
  const topDestinations = Object.entries(destinationCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Enrich shipments with order data
  const enriched = shipments.map((s) => {
    const order = orders.find((o) => o.id === s.orderId);
    return {
      ...s,
      customerName: order?.customerName || "-",
      orderTotal: order?.total || 0,
      destination: s.destination || order?.address || "-",
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Delivery Performance</h1>
        <p className="text-sm text-gray-400">
          Monitoring pengiriman dan performa ketepatan waktu
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Pengiriman</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{onTimePercent}%</p>
          <p className="text-xs text-gray-500">Tepat Waktu</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.inTransit + stats.pending}</p>
          <p className="text-xs text-gray-500">Dalam Perjalanan</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-red-600">{stats.delayed + delayed}</p>
          <p className="text-xs text-gray-500">Terlambat</p>
        </div>
      </div>

      {/* Top Destinations + On-time Detail */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top Destinations */}
        <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-gray-100">Wilayah Tujuan Terbanyak</h2>
          </div>
          <div className="space-y-3">
            {topDestinations.map(([dest, count], index) => (
              <div
                key={dest}
                className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-100">{dest}</span>
                </div>
                <span className="text-sm font-medium text-gray-400">{count} pengiriman</span>
              </div>
            ))}
          </div>
        </div>

        {/* On-time Performance */}
        <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold text-gray-100">Detail Ketepatan Waktu</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3">
              <span className="text-gray-400">Total Selesai Dikirim</span>
              <span className="font-bold text-gray-100">{deliveredShipments.length}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3">
              <span className="text-gray-400">Tepat Waktu</span>
              <span className="font-bold text-green-600">{onTime}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3">
              <span className="text-gray-400">Terlambat</span>
              <span className="font-bold text-red-600">{delayed}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3">
              <span className="text-gray-400">Total Ongkir</span>
              <span className="font-bold text-gray-100">{formatRupiah(stats.totalCost)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3">
              <span className="text-gray-400">Total Berat</span>
              <span className="font-bold text-gray-100">{stats.totalWeight.toFixed(1)} kg</span>
            </div>
          </div>
        </div>
      </div>

      <DeliveryTable shipments={enriched} />
    </div>
  );
}
