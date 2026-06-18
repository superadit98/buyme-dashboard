/**
 * ============================================
 * DELIVERY PAGE — Tracking Pengiriman
 * ============================================
 * 
 * Tabel pengiriman dengan:
 * - Status tracking
 * - Carrier info (JNE, J&T, SiCepat, dll)
 * - On-time vs delayed analysis
 */

import { getShipments, getOrders, formatRupiah } from "@/lib/fetchData";
import DeliveryTable from "./DeliveryTable";

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

  // Enrich shipments with order data
  const enriched = shipments.map((s) => {
    const order = orders.find((o) => o.id === s.orderId);
    return {
      ...s,
      customerName: order?.customerName || "-",
      orderTotal: order?.total || 0,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Delivery</h1>
        <p className="text-sm text-gray-500">
          Tracking pengiriman ke pelanggan
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Pengiriman</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{stats.inTransit}</p>
          <p className="text-xs text-gray-500">Dalam Perjalanan</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          <p className="text-xs text-gray-500">Terkirim</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-red-600">{stats.delayed}</p>
          <p className="text-xs text-gray-500">Terlambat</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-100">{formatRupiah(stats.totalCost)}</p>
          <p className="text-xs text-gray-500">Total Ongkir</p>
        </div>
      </div>

      <DeliveryTable shipments={enriched} />
    </div>
  );
}
