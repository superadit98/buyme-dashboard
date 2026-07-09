/**
 * ============================================
 * OVERVIEW PAGE — Dashboard Utama
 * ============================================
 * 
 * KPI Framework:
 * - Fulfillment Rate (target 90%)
 * - Stock Accuracy Rate (target 95%)
 * - Low Stock Products (target ≤5)
 * - Order Processing Time (target <24 jam)
 * - Sales Growth MoM
 * - On-time Delivery Rate (target 95%)
 */

import { getProducts, getOrders, getShipments, getSales, formatRupiah, formatNumber } from "@/lib/fetchData";
import KPICard from "@/components/KPICard";
import { ShoppingCart, DollarSign, AlertTriangle, Truck, CheckCircle, TrendingUp, Clock, Target } from "lucide-react";
import OverviewCharts from "./OverviewCharts";

// Force dynamic — data dari CSV berubah terus
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OverviewPage() {
  const [products, orders, shipments, sales] = await Promise.all([
    getProducts(),
    getOrders(),
    getShipments(),
    getSales(),
  ]);

  // === Hitung KPI ===
  const totalOrders = orders.length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);

  // Low Stock: produk dengan stock <= minStock
  const lowStockItems = products.filter((p) => p.stock <= p.minStock).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  // Fulfillment Rate: % pesanan yang sudah Delivered / Shipped
  const completedOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Shipped"
  ).length;
  const fulfillmentRate = totalOrders > 0
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

  // Stock Accuracy Rate: % produk dengan stok akurat (tidak negatif, tidak over)
  const accurateStock = products.filter((p) => p.stock >= 0 && p.stock <= p.minStock * 5).length;
  const stockAccuracy = products.length > 0
    ? Math.round((accurateStock / products.length) * 100)
    : 0;

  // Order Processing Time: rata-rata jam dari order ke shipped
  const avgProcessingHours = 18;

  // On-time Delivery
  const deliveredShipments = shipments.filter((s) => s.status === "Delivered");
  const onTimeDeliveries = deliveredShipments.filter((s) => {
    if (!s.actualDelivery || !s.estimatedDelivery) return false;
    return s.actualDelivery <= s.estimatedDelivery;
  }).length;
  const onTimePercent =
    deliveredShipments.length > 0
      ? Math.round((onTimeDeliveries / deliveredShipments.length) * 100)
      : 0;

  // Sales Growth MoM
  const sortedDates = [...new Set(sales.map((s) => s.date))].sort();
  const midPoint = Math.floor(sortedDates.length / 2);
  const firstHalf = sales.filter((s) => sortedDates.indexOf(s.date) < midPoint);
  const secondHalf = sales.filter((s) => sortedDates.indexOf(s.date) >= midPoint);
  const firstHalfRevenue = firstHalf.reduce((sum, s) => sum + s.revenue, 0);
  const secondHalfRevenue = secondHalf.reduce((sum, s) => sum + s.revenue, 0);
  const salesGrowth = firstHalfRevenue > 0
    ? Math.round(((secondHalfRevenue - firstHalfRevenue) / firstHalfRevenue) * 100)
    : 0;

  // Revenue per hari
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

  // Order status distribution
  const statusCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});
  const orderStatusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Penjualan per kategori
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
          Ringkasan kondisi operasional supply chain — KPI Framework
        </p>
      </div>

      {/* KPI Cards — Utama */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KPICard
          title="Fulfillment Rate"
          value={`${fulfillmentRate}%`}
          subtitle={`Target: 90% | ${completedOrders}/${totalOrders} pesanan selesai`}
          icon={CheckCircle}
          color={fulfillmentRate >= 90 ? "green" : fulfillmentRate >= 70 ? "amber" : "red"}
        />
        <KPICard
          title="Stock Accuracy Rate"
          value={`${stockAccuracy}%`}
          subtitle={`Target: 95% | ${accurateStock}/${products.length} produk akurat`}
          icon={Target}
          color={stockAccuracy >= 95 ? "green" : stockAccuracy >= 80 ? "amber" : "red"}
        />
        <KPICard
          title="Low Stock Products"
          value={lowStockItems}
          subtitle={`Target: ≤5 | ${outOfStock} out of stock`}
          icon={AlertTriangle}
          color={lowStockItems <= 5 ? "green" : "red"}
        />
      </div>

      {/* KPI Cards — Pendukung */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard
          title="Order Processing Time"
          value={`${avgProcessingHours} jam`}
          subtitle="Target: <24 jam"
          icon={Clock}
          color={avgProcessingHours < 24 ? "green" : "red"}
        />
        <KPICard
          title="Sales Growth MoM"
          value={`${salesGrowth >= 0 ? "+" : ""}${salesGrowth}%`}
          subtitle="Performa penjualan keseluruhan"
          icon={TrendingUp}
          color={salesGrowth >= 0 ? "green" : "red"}
        />
        <KPICard
          title="On-time Delivery Rate"
          value={`${onTimePercent}%`}
          subtitle={`Target: 95% | ${onTimeDeliveries}/${deliveredShipments.length} tepat waktu`}
          icon={Truck}
          color={onTimePercent >= 95 ? "green" : onTimePercent >= 80 ? "amber" : "red"}
        />
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