"use client";

import { useState, useMemo } from "react";
import { formatRupiah } from "@/lib/fetchData";
import StatusBadge from "@/components/StatusBadge";
import SearchFilter from "@/components/SearchFilter";

interface EnrichedShipment {
  id: string;
  orderId: string;
  carrier: string;
  trackingNumber: string;
  shipDate: string;
  estimatedDelivery: string;
  actualDelivery: string;
  status: string;
  weight: number;
  cost: number;
  customerName: string;
  orderTotal: number;
  destination: string;
}

interface DeliveryTableProps {
  shipments: EnrichedShipment[];
}

const CARRIERS = ["All", "JNE", "J&T", "SiCepat", "AnterAja"];

export default function DeliveryTable({ shipments }: DeliveryTableProps) {
  const [search, setSearch] = useState("");
  const [carrierFilter, setCarrierFilter] = useState("All");

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchSearch =
        !search ||
        s.orderId.toLowerCase().includes(search.toLowerCase()) ||
        s.trackingNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.customerName.toLowerCase().includes(search.toLowerCase()) ||
        (s.destination && s.destination.toLowerCase().includes(search.toLowerCase()));

      const matchCarrier =
        carrierFilter === "All" || s.carrier === carrierFilter;

      return matchSearch && matchCarrier;
    });
  }, [shipments, search, carrierFilter]);

  function formatDate(d: string) {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="rounded-xl border border-[#262636] bg-[#16161f] shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#262636] p-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchFilter
          value={search}
          onChange={setSearch}
          placeholder="Cari Order ID, tracking, nama, atau kota..."
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Ekspedisi:</span>
          <select
            value={carrierFilter}
            onChange={(e) => setCarrierFilter(e.target.value)}
            className="rounded-lg border border-[#262636] bg-[#111118] px-3 py-1.5 text-sm text-gray-300 focus:border-blue-500 focus:outline-none"
          >
            {CARRIERS.map((c) => (
              <option key={c} value={c}>
                {c === "All" ? "Semua" : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#262636] bg-[#111118]">
              <th className="px-4 py-3 font-medium text-gray-400">Shipment ID</th>
              <th className="px-4 py-3 font-medium text-gray-400">Order ID</th>
              <th className="px-4 py-3 font-medium text-gray-400">Pelanggan</th>
              <th className="px-4 py-3 font-medium text-gray-400">Ekspedisi</th>
              <th className="px-4 py-3 font-medium text-gray-400">No. Resi</th>
              <th className="px-4 py-3 font-medium text-gray-400">Tujuan</th>
              <th className="px-4 py-3 font-medium text-gray-400">Kirim</th>
              <th className="px-4 py-3 font-medium text-gray-400">Estimasi</th>
              <th className="px-4 py-3 text-right font-medium text-gray-400">Ongkir</th>
              <th className="px-4 py-3 font-medium text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262636]">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#1e1e2a]">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">
                  {s.id}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-blue-600">
                  {s.orderId}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-100">
                  {s.customerName}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <span className="inline-flex items-center rounded-md bg-[#1e1e2a] px-2 py-0.5 text-xs font-medium text-gray-300">
                    {s.carrier}
                  </span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-400">
                  {s.trackingNumber}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {s.destination || "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {formatDate(s.shipDate)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-400">
                  {formatDate(s.estimatedDelivery)}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right text-gray-100">
                  {formatRupiah(s.cost)}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={s.status as any} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-[#262636] px-4 py-3 text-sm text-gray-500">
        Menampilkan {filtered.length} dari {shipments.length} pengiriman
      </div>
    </div>
  );
}
