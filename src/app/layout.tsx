import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BuyMe Dashboard — E-Commerce Supply Chain",
  description: "Dashboard monitoring supply chain untuk bisnis e-commerce BuyMe. Data real-time dari Google Sheets.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${inter.variable} dark`}>
      <body className="antialiased">
        <Sidebar />
        <main className="min-h-screen pt-16 lg:ml-64 lg:pt-0">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
