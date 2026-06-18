/**
 * ============================================
 * INVENTORY PAGE — Manajemen Persediaan Barang
 * ============================================
 * 
 * Sesuai proposal:
 * - Jumlah stok setiap produk
 * - Produk dengan stok rendah
 * - Produk yang perlu direstock
 * - Produk dengan tingkat penjualan tertinggi
 */

import { getProducts, getSales, formatRupiah } from "@/lib/fetchData";
import InventoryTable from "./InventoryTable";
import { AlertTriangle, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InventoryPage() {
  const [products, sales] = await Promise.all([getProducts(), getSales()]);

  // Pre-calculate stats
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > p.minStock).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= p.minStock).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  };

  // Restock alerts — produk yang stock <= minStock
  const restockAlerts = products
    .filter((p) => p.stock <= p.minStock)
    .sort((a, b) => a.stock - b.stock);

  // Top selling products by category
  const categorySales = sales.reduce<Record<string, { quantity: number; revenue: number }>>(
    (acc, s) => {
      if (!acc[s.productCategory]) acc[s.productCategory] = { quantity: 0, revenue: 0 };
      acc[s.productCategory].quantity += s.quantity;
      acc[s.productCategory].revenue += s.revenue;
      return acc;
    },
    {}
  );
  const topSelling = Object.entries(categorySales)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Inventory Management</h1>
        <p className="text-sm text-gray-400">
          Informasi persediaan barang dan status stok
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-gray-100">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Produk</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{stats.inStock}</p>
          <p className="text-xs text-gray-500">Stok Aman</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
          <p className="text-xs text-gray-500">Stok Menipis</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
          <p className="text-xs text-gray-500">Habis</p>
        </div>
        <div className="rounded-lg border border-[#262636] bg-[#16161f] p-4 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-100">{formatRupiah(stats.totalValue)}</p>
          <p className="text-xs text-gray-500">Nilai Stok</p>
        </div>
      </div>

      {/* Restock Alerts */}
      {restockAlerts.length > 0 && (
        <div className="rounded-xl border border-amber-900/30 bg-[#16161f] p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-gray-100">Restock Alerts</h2>
            <span className="ml-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
              {restockAlerts.length} produk perlu restock
            </span>
          </div>
          <div className="space-y-2">
            {restockAlerts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-[#262636] bg-[#1c1c28] px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    p.stock === 0
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {p.stock}
                  </span>
                  <div>
                    <span className="font-medium text-gray-100">{p.name}</span>
                    <span className="ml-2 text-xs text-gray-500">({p.sku})</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Min: {p.minStock} {p.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Selling Products */}
      <div className="rounded-xl border border-[#262636] bg-[#16161f] p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-400" />
          <h2 className="text-lg font-semibold text-gray-100">Produk Terlaris</h2>
        </div>
        <div className="space-y-3">
          {topSelling.map((item, index) => (
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
                <span className="text-gray-400">{item.quantity} terjual</span>
                <span className="font-medium text-gray-100">{formatRupiah(item.revenue)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <InventoryTable products={products} />
    </div>
  );
}
