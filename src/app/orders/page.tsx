/**
 * ============================================
 * ORDERS PAGE — Order Fulfillment Monitoring
 * ============================================
 * 
 * Menampilkan:
 * - Status pesanan: Pending, Packed, Shipped, Delivered
 * - Channel penjualan (Shopee, Tokopedia, TikTok Shop, Website)
 * - Search by customer name or order ID
 * - Filter by status
 */

import { getOrders, formatRupiah } from "@/lib/fetchData";
import OrdersTable from "./OrdersTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrdersPage() {
  const orders = await getOrders();

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    packed: orders.filter((o) => o.status === "Packed").length,
    shipped: orders.filter((o) => o.status === "Shipped").length,
    delivered: orders.filter((o) => o.status === "Delivered").length,
    cancelled: orders.filter((o) => o.status === "Cancelled").length,
    totalRevenue: orders
      .filter((o) => o.status !== "Cancelled")
      .reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Order Fulfillment</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Pemantauan status pesanan dari seluruh channel penjualan
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-3">
        <StatusPill label="Total" count={stats.total} color="bg-gray-50/10 text-[var(--text-secondary)]" />
        <StatusPill label="Pending" count={stats.pending} color="bg-amber-50/10 text-amber-400" />
        <StatusPill label="Packed" count={stats.packed} color="bg-blue-50/10 text-blue-400" />
        <StatusPill label="Shipped" count={stats.shipped} color="bg-indigo-50/10 text-indigo-400" />
        <StatusPill label="Delivered" count={stats.delivered} color="bg-green-50/10 text-green-400" />
        <StatusPill label="Cancelled" count={stats.cancelled} color="bg-red-50/10 text-red-400" />
        <div className="ml-auto flex items-center rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2 shadow-sm">
          <span className="text-sm text-[var(--text-secondary)]">Total Revenue:</span>
          <span className="ml-2 font-bold text-[var(--text-primary)]">{formatRupiah(stats.totalRevenue)}</span>
        </div>
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}

function StatusPill({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${color}`}
    >
      {label}
      <span className="font-bold">{count}</span>
    </span>
  );
}
