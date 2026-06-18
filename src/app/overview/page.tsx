/**
 * ============================================
 * OVERVIEW PAGE — Dashboard Utama
 * ============================================
 * 
 * KPI sesuai proposal:
 * - Total Orders
 * - Total Sales (Revenue)
 * - Low Stock Products
 * - Fulfillment Rate (% pesanan selesai)
 * - On-time Delivery Rate
 * - Top Selling Product
 * - Sales Growth
 */

import { getProducts, getOrders, getShipments, getSales, formatRupiah, formatNumber } from "@/lib/fetchData";
import KPICard from "@/components/KPICard";
import { ShoppingCart, DollarSign, AlertTriangle, Truck, CheckCircle, TrendingUp, Award } from "lucide-react";
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
  const lowStockItems = products.filter((p) => p.stock <= p.minStock).length;

  // Fulfillment Rate: % pesanan yang sudah Delivered / Shipped (selesai diproses)
  const completedOrders = orders.filter(
    (o) => o.status === "Delivered" || o.status === "Shipped"
  ).length;
  const fulfillmentRate = totalOrders > 0
    ? Math.round((completedOrders / totalOrders) * 100)
    : 0;

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

  // Top Selling Product (by total quantity sold across all sales)
  const productSales = sales.reduce<Record<string, { name: string; quantity: number; revenue: number }>>(
    (acc, s) => {
      if (!acc[s.productCategory]) acc[s.productCategory] = { name: s.productCategory, quantity: 0, revenue: 0 };
      acc[s.productCategory].quantity += s.quantity;
      acc[s.productCategory].revenue += s.revenue;
      return acc;
    },
    {}
  );
  const topSelling = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)[0];

  // Sales Growth (perbandingan 2 periode — misal minggu ini vs minggu lalu)
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
        <h1 className="text-2xl font-bold text-gray-100">Dashboard Overview</h1>
        <p className="text-sm text-gray-400">
          Ringkasan kondisi operasional BuyMe secara keseluruhan
        </p>
      </div>

      {/* KPI Cards — sesuai proposal */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Orders"
          value={formatNumber(totalOrders)}
          subtitle={`${orders.filter((o) => o.status === "Pending").length} perlu diproses`}
          icon={ShoppingCart}
          color="blue"
        />
        <KPICard
          title="Total Sales"
          value={formatRupiah(totalRevenue)}
          subtitle={`Profit: ${formatRupiah(totalProfit)}`}
          icon={DollarSign}
          color="green"
        />
        <KPICard
          title="Low Stock Products"
          value={lowStockItems}
          subtitle={`${products.filter((p) => p.stock === 0).length} out of stock`}
          icon={AlertTriangle}
          color={lowStockItems > 5 ? "red" : "amber"}
        />
        <KPICard
          title="Fulfillment Rate"
          value={`${fulfillmentRate}%`}
          subtitle={`${completedOrders}/${totalOrders} pesanan selesai`}
          icon={CheckCircle}
          color={fulfillmentRate >= 80 ? "green" : "amber"}
        />
      </div>

      {/* Second row KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard
          title="On-time Delivery"
          value={`${onTimePercent}%`}
          subtitle={`${onTimeDeliveries}/${deliveredShipments.length} tepat waktu`}
          icon={Truck}
          color={onTimePercent >= 90 ? "green" : onTimePercent >= 70 ? "amber" : "red"}
        />
        <KPICard
          title="Top Selling Product"
          value={topSelling ? topSelling.name : "-"}
          subtitle={topSelling ? `${topSelling.quantity} terjual` : "Belum ada data"}
          icon={Award}
          color="blue"
        />
        <KPICard
          title="Sales Growth"
          value={`${salesGrowth >= 0 ? "+" : ""}${salesGrowth}%`}
          subtitle={salesGrowth >= 0 ? "Minggu ini vs lalu" : "Minggu ini vs lalu"}
          icon={TrendingUp}
          color={salesGrowth >= 0 ? "green" : "red"}
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
