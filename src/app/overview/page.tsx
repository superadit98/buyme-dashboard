/**
 * ============================================
 * OVERVIEW PAGE — Dashboard Utama
 * ============================================
 * 
 * Menampilkan:
 * - KPI Cards: Total Orders, Total Products Sold, Low Stock, On-time Delivery %
 * - Top Selling Products (by category)
 * - Revenue chart (Recharts)
 * - Order status distribution
 * - Category breakdown
 */

import { getProducts, getOrders, getShipments, getSales, formatRupiah, formatNumber } from "@/lib/fetchData";
import KPICard from "@/components/KPICard";
import { ShoppingCart, Package, AlertTriangle, Truck, TrendingUp } from "lucide-react";
import OverviewCharts from "./OverviewCharts";

// Force dynamic — data dari CSV berubah terus
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OverviewPage() {
  // Fetch semua data dari Google Sheets CSV
  const [products, orders, shipments, sales] = await Promise.all([
    getProducts(),
    getOrders(),
    getShipments(),
    getSales(),
  ]);

  // === Hitung KPI ===
  const totalOrders = orders.length;
  const totalProductsSold = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((sum, o) => sum + o.items, 0);
  const lowStockItems = products.filter((p) => p.stock <= p.minStock).length;
  const deliveredShipments = shipments.filter((s) => s.status === "Delivered");
  const onTimeDeliveries = deliveredShipments.filter((s) => {
    if (!s.actualDelivery || !s.estimatedDelivery) return false;
    return s.actualDelivery <= s.estimatedDelivery;
  }).length;
  const onTimePercent =
    deliveredShipments.length > 0
      ? Math.round((onTimeDeliveries / deliveredShipments.length) * 100)
      : 0;

  // === Top Selling Products (by category) ===
  const categoryAgg = sales.reduce<Record<string, { quantity: number; revenue: number }>>(
    (acc, s) => {
      if (!acc[s.productCategory]) acc[s.productCategory] = { quantity: 0, revenue: 0 };
      acc[s.productCategory].quantity += s.quantity;
      acc[s.productCategory].revenue += s.revenue;
      return acc;
    },
    {}
  );
  const topProducts = Object.entries(categoryAgg)
    .map(([name, data]) => ({
      name,
      quantity: data.quantity,
      revenue: data.revenue,
    }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  // === Data untuk charts ===
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

  // Total revenue & profit
  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Overview</h1>
        <p className="text-sm text-gray-400">
          Ringkasan data supply chain e-commerce
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Orders"
          value={formatNumber(totalOrders)}
          subtitle={`${orders.filter((o) => o.status === "Pending" || o.status === "Packed").length} perlu diproses`}
          icon={ShoppingCart}
          color="blue"
        />
        <KPICard
          title="Total Products Sold"
          value={formatNumber(totalProductsSold)}
          subtitle={`${formatRupiah(totalRevenue)} total revenue`}
          icon={Package}
          color="green"
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockItems}
          subtitle={`${products.filter((p) => p.stock === 0).length} out of stock`}
          icon={AlertTriangle}
          color={lowStockItems > 5 ? "red" : "amber"}
        />
        <KPICard
          title="On-time Delivery"
          value={`${onTimePercent}%`}
          subtitle={`${onTimeDeliveries}/${deliveredShipments.length} tepat waktu`}
          icon={Truck}
          color={onTimePercent >= 90 ? "green" : onTimePercent >= 70 ? "amber" : "red"}
        />
      </div>

      {/* Top Selling Products */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-gray-100">Top Selling Products</h2>
        </div>
        <div className="space-y-3">
          {topProducts.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-100">{item.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">
                  {item.quantity} terjual
                </span>
                <span className="font-medium text-gray-100">
                  {formatRupiah(item.revenue)}
                </span>
              </div>
            </div>
          ))}
          {topProducts.length === 0 && (
            <p className="text-center text-gray-500">Belum ada data penjualan</p>
          )}
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
