"use client";

import { useState, useMemo } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { formatRupiah } from "@/lib/fetchData";
import StatusBadge from "@/components/StatusBadge";
import SearchFilter from "@/components/SearchFilter";

interface OrdersTableProps {
  orders: Order[];
}

const STATUS_OPTIONS: OrderStatus[] = [
  "Pending",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const CHANNEL_COLORS: Record<string, string> = {
  "Shopee": "bg-orange-500/10 text-orange-400",
  "Tokopedia": "bg-green-500/10 text-green-400",
  "TikTok Shop": "bg-pink-500/10 text-pink-400",
  "Website": "bg-blue-500/10 text-blue-400",
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");
  const [channelFilter, setChannelFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !search ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.address.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || o.status === statusFilter;

      const matchChannel =
        channelFilter === "All" || o.channel === channelFilter;

      return matchSearch && matchStatus && matchChannel;
    });
  }, [orders, search, statusFilter, channelFilter]);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Cari nama pelanggan, ID, atau alamat..."
        />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "All")}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-sm text-[var(--text-secondary)] focus:border-blue-500 focus:outline-none"
            >
              <option value="All">Semua</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--text-muted)]">Channel:</span>
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-1.5 text-sm text-[var(--text-secondary)] focus:border-blue-500 focus:outline-none"
            >
              <option value="All">Semua</option>
              <option value="Shopee">Shopee</option>
              <option value="Tokopedia">Tokopedia</option>
              <option value="TikTok Shop">TikTok Shop</option>
              <option value="Website">Website</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Order ID</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Pelanggan</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Tanggal</th>
              <th className="px-4 py-3 text-center font-medium text-[var(--text-secondary)]">Item</th>
              <th className="px-4 py-3 text-right font-medium text-[var(--text-secondary)]">Total</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Channel</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="px-4 py-3 font-medium text-[var(--text-secondary)]">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262636]">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-[var(--bg-elevated)]">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-blue-600">
                  {order.id}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--text-primary)]">{order.customerName}</div>
                  <div className="text-xs text-[var(--text-muted)]">{order.customerEmail}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-secondary)]">
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-[var(--text-secondary)]">
                  {order.items}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-[var(--text-primary)]">
                  {formatRupiah(order.total)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
                    CHANNEL_COLORS[order.channel] || "bg-gray-500/10 text-[var(--text-secondary)]"
                  }`}>
                    {order.channel}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-[var(--text-secondary)]">
                  {order.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--text-muted)]">
        Menampilkan {filtered.length} dari {orders.length} pesanan
      </div>
    </div>
  );
}
