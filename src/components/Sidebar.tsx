"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Truck,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/overview", label: "Dashboard Overview", icon: LayoutDashboard },
  { href: "/omnichannel", label: "Omnichannel", icon: Store },
  { href: "/inventory", label: "Inventory", icon: Package },
  { href: "/orders", label: "Order Fulfillment", icon: ShoppingCart },
  { href: "/delivery", label: "Delivery", icon: Truck },
  { href: "/sales", label: "Sales Analytics", icon: TrendingUp },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg bg-[#111118] p-2 shadow-md border border-[#262636] lg:hidden"
      >
        <Menu className="h-5 w-5 text-gray-100" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-[#111118] border-r border-[#262636]
          transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 rounded-lg p-1 hover:bg-[#1e1e2a] text-gray-400 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-[#262636] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            BM
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-100">BuyMe</h1>
            <p className="text-xs text-gray-500">Omnichannel Dashboard</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-blue-900/20 text-blue-400"
                      : "text-gray-400 hover:bg-[#1e1e2a] hover:text-gray-100"
                  }
                `}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[#262636] p-4">
          <p className="text-xs text-gray-500">
            Data dari Google Sheets CSV
          </p>
          <p className="text-xs text-gray-500">
            Auto-update setiap 60 detik
          </p>
        </div>
      </aside>
    </>
  );
}
