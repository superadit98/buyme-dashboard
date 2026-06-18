/**
 * Root page renders the Overview content directly.
 * Avoids redirect loop between Next.js basePath and nginx trailing slash.
 */
import { getProducts, getOrders, getShipments, getSales, formatRupiah, formatNumber } from "@/lib/fetchData";
import KPICard from "@/components/KPICard";
import { ShoppingCart, Package, AlertTriangle, Truck } from "lucide-react";
import OverviewCharts from "./overview/OverviewCharts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [products, orders, shipments, sales] = await Promise.all([
    getProducts(),
    getOrders(),
    getShipments(),
    getSales(),
  ]);

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
  const orderStatusData = Object.entries(statusCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const categoryRevenue = sales.reduce<Record<string, number>>((acc, s) => {
    acc[s.productCategory] = (acc[s.productCategory] || 0) + s.revenue;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryRevenue)
    .map(([name, revenue]) => ({ name, revenue }))
    .sort((a, b) => b.revenue - a.revenue);

  const totalRevenue = sales.reduce((sum, s) => sum + s.revenue, 0);
  const totalProfit = sales.reduce((sum, s) => sum + s.profit, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Overview</h1>
        <p className="text-sm text-gray-400">Ringkasan data supply chain e-commerce</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Orders" value={formatNumber(totalOrders)} subtitle={`${orders.filter((o) => o.status === "Pending" || o.status === "Packed").length} perlu diproses`} icon={ShoppingCart} color="blue" />
        <KPICard title="Total Products Sold" value={formatNumber(totalProductsSold)} subtitle={`${formatRupiah(totalRevenue)} total revenue`} icon={Package} color="green" />
        <KPICard title="Low Stock Items" value={lowStockItems} subtitle={`${products.filter((p) => p.stock === 0).length} out of stock`} icon={AlertTriangle} color={lowStockItems > 5 ? "red" : "amber"} />
        <KPICard title="On-time Delivery" value={`${onTimePercent}%`} subtitle={`${onTimeDeliveries}/${deliveredShipments.length} tepat waktu`} icon={Truck} color={onTimePercent >= 90 ? "green" : onTimePercent >= 70 ? "amber" : "red"} />
      </div>
      <OverviewCharts revenueData={revenueChartData} orderStatusData={orderStatusData} categoryData={categoryData} totalRevenue={totalRevenue} totalProfit={totalProfit} />
    </div>
  );
}
