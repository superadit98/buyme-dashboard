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
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 rounded-lg p-2 shadow-md border lg:hidden"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <Menu className="h-5 w-5" style={{ color: "var(--text-primary)" }} />
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
          fixed top-0 left-0 z-40 h-full w-64 border-r
          transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        {/* Close button (mobile) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 rounded-lg p-1 lg:hidden"
          style={{ color: "var(--text-muted)" }}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b px-6" style={{ borderColor: "var(--border)" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            BM
          </div>
          <div>
            <h1 className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>BuyMe</h1>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Omnichannel Dashboard</p>
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
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{
                  backgroundColor: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                  color: isActive ? "var(--accent-blue)" : "var(--text-secondary)",
                }}
              >
                <Icon
                  className="h-4 w-4"
                  style={{ color: isActive ? "var(--accent-blue)" : "var(--text-muted)" }}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="absolute bottom-16 left-0 right-0 px-3">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:opacity-80"
            style={{ backgroundColor: "var(--bg-elevated)", color: "var(--text-secondary)" }}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" style={{ color: "var(--accent-amber)" }} />
            ) : (
              <Moon className="h-4 w-4" style={{ color: "var(--accent-blue)" }} />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Data dari Google Sheets CSV
          </p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Auto-update setiap 60 detik
          </p>
        </div>
      </aside>
    </>
  );
}
