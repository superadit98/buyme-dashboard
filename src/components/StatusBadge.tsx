import type { OrderStatus, ShipmentStatus } from "@/lib/types";

type BadgeStatus = OrderStatus | ShipmentStatus;

const BADGE_STYLES: Record<string, string> = {
  // Order statuses
  Pending: "bg-amber-900/30 text-amber-400 border-amber-800/50",
  Packed: "bg-blue-900/30 text-blue-400 border-blue-800/50",
  Shipped: "bg-indigo-900/30 text-indigo-400 border-indigo-800/50",
  Delivered: "bg-green-900/30 text-green-400 border-green-800/50",
  Cancelled: "bg-red-900/30 text-red-400 border-red-800/50",
  // Shipment statuses
  "In Transit": "bg-blue-900/30 text-blue-400 border-blue-800/50",
  "Out for Delivery": "bg-purple-900/30 text-purple-400 border-purple-800/50",
  Delayed: "bg-orange-900/30 text-orange-400 border-orange-800/50",
  Returned: "bg-red-900/30 text-red-400 border-red-800/50",
};

const DOT_COLORS: Record<string, string> = {
  Pending: "bg-amber-400",
  Packed: "bg-blue-400",
  Shipped: "bg-indigo-400",
  Delivered: "bg-green-400",
  Cancelled: "bg-red-400",
  "In Transit": "bg-blue-400",
  "Out for Delivery": "bg-purple-400",
  Delayed: "bg-orange-400",
  Returned: "bg-red-400",
};

interface StatusBadgeProps {
  status: BadgeStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = BADGE_STYLES[status] || "bg-gray-900/30 text-gray-400 border-gray-800/50";
  const dot = DOT_COLORS[status] || "bg-gray-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
