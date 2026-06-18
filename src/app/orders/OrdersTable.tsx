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

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "All">("All");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !search ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.address.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "All" || o.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="rounded-xl border border-[#262636] bg-[#16161f] shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-[#262636] p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Cari nama pelanggan, ID, atau alamat..."
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | "All")}
            className="rounded-lg border border-[#262636] bg-[#111118] px-3 py-1.5 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
          >
            <option value="All">Semua</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#262636] bg-[#111118]">
              <th className="px-4 py-3 font-medium text-gray-400">Order ID</th>
              <th className="px-4 py-3 font-medium text-gray-400">Pelanggan</th>
              <th className="px-4 py-3 font-medium text-gray-400">Tanggal</th>
              <th className="px-4 py-3 text-center font-medium text-gray-400">Item</th>
              <th className="px-4 py-3 text-right font-medium text-gray-400">Total</th>
              <th className="px-4 py-3 font-medium text-gray-400">Pembayaran</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
              <th className="px-4 py-3 font-medium text-gray-400">Alamat</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262636]">
            {filtered.map((order) => (
              <tr key={order.id} className="hover:bg-[#1e1e2a]">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-blue-600">
                  {order.id}
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-100">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.customerEmail}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {new Date(order.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-center text-gray-400">
                  {order.items}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-100">
                  {formatRupiah(order.total)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {order.paymentMethod}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={order.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {order.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-[#262636] px-4 py-3 text-sm text-gray-500">
        Menampilkan {filtered.length} dari {orders.length} pesanan
      </div>
    </div>
  );
}
