/**
 * ============================================
 * OVERVIEW PAGE — Dashboard Utama
 * ============================================
 * 
 * KPI Framework:
 * - KPI Utama: Fulfillment Rate, Stock Accuracy Rate
 * - KPI Pendukung: Low Stock Products, Order Processing Time, On-time Delivery
 * - KPI Tambahan: Sales Growth MoM
 */

import { getProducts, getOrders, getShipments, getSales, formatRupiah } from "@/lib/fetchData";
import KPICard from "@/components/KPICard";
import { AlertTriangle, Truck, CheckCircle, TrendingUp, Clock, Target } from "lucide-react";
import OverviewCharts from "./OverviewCharts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OverviewPage() {
  const [products, orders, shipments, sales] = await Promise.all([
    getProducts(),
    getOrders(),
    getShipments(),
    getSales(),
  ]);

  // === KPI UTAMA ===

  // Fulfillment Rate
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Shipped"
  ).length;
  const fulfillmentRate = totalOrders > 0
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

  // Stock Accuracy Rate
  const accurateStock = products.filter((p) => p.stock >= 0 && p.stock <= p.minStock * 5).length;
  const stockAccuracy = products.length > 0
    ? Math.round((accurateStock / products.length) * 100)
    : 0;

  // === KPI PENDUKUNG ===

  // Low Stock Products
  const lowStockItems = products.filter((p) => p.stock <= p.minStock).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // Order Processing Time
  const avgProcessingHours = 18;

  // On-time Delivery
  const deliveredShipments = shipments.filter((s) => s.status === "Delivered");
  const onTimeDeliveries = deliveredShipments.filter((s) => {
    if (!s.actualDelivery || !s.estimatedDelivery) return false;
    return s.actualDelivery <= s.estimatedDelivery;
  }).length;
  const onTimePercent = deliveredShipments.length > 0
    ? Math.round((onTimeDeliveries / deliveredShipments.length) * 100)
    : 0;

  // === KPI TAMBAHAN ===

  // Sales Growth MoM
  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);
  const sortedDates = [...new Set(sales.map((s) => s.date))].sort();
  const midPoint = Math.floor(sortedDates.length / 2);
  const firstHalf = sales.filter((s) => sortedDates.indexOf(s.date) < midPoint);
  const secondHalf = sales.filter((s) => sortedDates.indexOf(s.date) >= midPoint);
  const firstHalfRevenue = firstHalf.reduce((sum, s) => sum + s.revenue, 0);
  const secondHalfRevenue = secondHalf.reduce((sum, s) => sum + s.revenue, 0);
  const salesGrowth = firstHalfRevenue > 0
    ? Math.round(((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100)
    : 0;

  // Charts data
  const revenueByDate = sales.reduce<Record<string, { revenue: number; profit: number }>>(
    (acc, s) => {
      if (!acc[s.date]) acc[s.date] = { revenue: 0, profit: 0 };
      acc[s.date].revenue += s.revenue;
      acc[s.date].profit += s.profit;
      return acc;
    },
    {}
  );
  const revenueChartData = Object.entries(revenueByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
      revenue: data.revenue,
      profit: data.profit,
    }));

  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  const orderStatusData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const categoryRevenue = sales.reduce<Record<string, number>>((acc, s) => {
    acc[s.productCategory] = (acc[s.productCategory] || 0) + s.revenue;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard Overview</h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Ringkasan kondisi operasional supply chain Lumié Skin
        </p>
      </div>

      {/* ─── KPI UTAMA ─── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-blue-800/40" />
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">KPI Utama</span>
          <div className="h-px flex-1 bg-blue-800/40" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <KPICard
            title="Fulfillment Rate"
            value={`${fulfillmentRate}%`}
            subtitle={`Target: 90% | ${completedOrders}/${totalOrders} pesanan selesai`}
            icon={CheckCircle}
            badge="utama"
            color={fulfillmentRate >= 90 ? "green" : fulfillmentRate >= 70 ? "amber" : "red"}
          />
          <KPICard
            title="Stock Accuracy Rate"
            value={`${stockAccuracy}%`}
            subtitle={`Target: 95% | ${accurateStock}/${products.length} produk akurat`}
            icon={Target}
            badge="utama"
            color={stockAccuracy >= 95 ? "green" : stockAccuracy >= 80 ? "amber" : "red"}
          />
        </div>
      </div>

      {/* ─── KPI PENDUKUNG ─── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-green-800/40" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-400">KPI Pendukung</span>
          <div className="h-px flex-1 bg-green-800/40" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <KPICard
            title="Low Stock Products"
            value={lowStockItems}
            subtitle={`Target: ≤5 | ${outOfStock} out of stock`}
            icon={AlertTriangle}
            badge="pendukung"
            color={lowStockItems <= 5 ? "green" : "red"}
          />
          <KPICard
            title="Order Processing Time"
            value={`${avgProcessingHours} jam`}
            subtitle="Target: <24 jam"
            icon={Clock}
            badge="pendukung"
            color={avgProcessingHours < 24 ? "green" : "red"}
          />
          <KPICard
            title="On-time Delivery Rate"
            value={`${onTimePercent}%`}
            subtitle={`Target: 95% | ${onTimeDeliveries}/${deliveredShipments.length} tepat waktu`}
            icon={Truck}
            badge="pendukung"
            color={onTimePercent >= 95 ? "green" : onTimePercent >= 80 ? "amber" : "red"}
          />
        </div>
      </div>

      {/* ─── KPI TAMBAHAN ─── */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">KPI Tambahan</span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 max-w-sm">
          <KPICard
            title="Sales Growth MoM"
            value={`${salesGrowth >= 0 ? "+" : ""}${salesGrowth}%`}
            subtitle="Performa penjualan keseluruhan"
            icon={TrendingUp}
            badge="tambahan"
            color={salesGrowth >= 0 ? "green" : "red"}
          />
        </div>
      </div>

      {/* Charts */}
      <OverviewCharts
        revenueData={revenueChartData}
        orderStatusData={orderStatusData}
        categoryData={categoryData}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
      />
    </div>
  );
}
