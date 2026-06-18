"use client";

import { useState, useMemo } from "react";
import type { Product } from "@/lib/types";
import { formatRupiah } from "@/lib/fetchData";
import SearchFilter from "@/components/SearchFilter";

interface InventoryTableProps {
  products: Product[];
}

function StockBadge({ product }: { product: Product }) {
  if (product.stock === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-400 border border-red-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Out of Stock
      </span>
    );
  }
  if (product.stock <= product.minStock) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        Low Stock
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-400 border border-green-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
      In Stock
    </span>
  );
}

export default function InventoryTable({ products }: InventoryTableProps) {
  const [search, setSearch] = useState("");
  const [showLowStock, setShowLowStock] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());

      const matchLowStock = !showLowStock || p.stock <= p.minStock;

      return matchSearch && matchLowStock;
    });
  }, [products, search, showLowStock]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Cari produk, SKU, atau kategori..."
        />
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showLowStock}
            onChange={(e) => setShowLowStock(e.target.checked)}
            className="h-4 w-4 rounded border-gray-600 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-[var(--text-secondary)]">Tampilkan stok menipis saja</span>
        </label>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">SKU</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Nama Produk</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Kategori</th>
              <th className="px-4 py-3 text-right font-medium text-[var(--text-secondary)]">Harga</th>
              <th className="px-4 py-3 text-right font-medium text-[var(--text-secondary)]">Stok</th>
              <th className="px-4 py-3 text-right font-medium text-[var(--text-secondary)]">Min. Stok</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Supplier</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262636]">
            {filtered.map((product) => (
              <tr key={product.id} className="hover:bg-[var(--bg-elevated)]">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-[var(--text-muted)]">
                  {product.sku}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--text-primary)]">{product.name}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-secondary)]">
                  {product.category}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-[var(--text-primary)]">
                  {formatRupiah(product.price)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <span
                    className={
                      product.stock === 0
                        ? "font-bold text-red-600"
                        : product.stock <= product.minStock
                        ? "font-bold text-amber-600"
                        : "text-[var(--text-secondary)]"
                    }
                  >
                    {product.stock} {product.unit}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-[var(--text-muted)]">
                  {product.minStock} {product.unit}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-secondary)]">
                  {product.supplier}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StockBadge product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
        Menampilkan {filtered.length} dari {products.length} produk
      </div>
    </div>
  );
}
