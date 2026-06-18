/**
 * ============================================
 * INVENTORY PAGE — Manajemen Produk
 * ============================================
 * 
 * Tabel produk dengan:
 * - Search by name/SKU
 * - Filter low stock
 * - Status indicator (In Stock, Low Stock, Out of Stock)
 */

import { getProducts, formatRupiah } from "@/lib/fetchData";
import InventoryTable from "./InventoryTable";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InventoryPage() {
  const products = await getProducts();

  // Pre-calculate stats for the client component
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.stock > p.minStock).length,
    lowStock: products.filter((p) => p.stock > 0 && p.stock <= p.minStock).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Inventory</h1>
        <p className="text-sm text-gray-400">
          Daftar produk dan status stok
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

      {/* Table */}
      <InventoryTable products={products} />
    </div>
  );
}
