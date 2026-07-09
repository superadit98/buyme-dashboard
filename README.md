# BuyMe — Supply Chain Dashboard (Skincare)

Dashboard omnichannel supply chain untuk bisnis skincare BuyMe. Monitoring inventory, order fulfillment, delivery, dan sales dari berbagai channel penjualan (Shopee, Tokopedia, TikTok Shop, Website).

## Fitur

- **Overview** — KPI Framework: Fulfillment Rate, Stock Accuracy, Low Stock, Order Processing Time, Sales Growth, On-time Delivery
- **Inventory** — 15 produk skincare + status stok + restock alert
- **Order Fulfillment** — Ringkasan order dari 3 marketplace
- **Sales Analytics** — Penjualan per produk & per channel
- **Insight + Rekomendasi** — Analisis masalah bisnis + rekomendasi actionable
- **Dark/Light Theme** — Toggle mode

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts (charting)
- PapaParse (CSV parser)
- Lucide React (icons)

## Data

Data bisa dari:
1. **Google Sheets CSV** — publish sheet sebagai CSV, set URL di `src/lib/config.ts`
2. **Mock CSV** — file di `/public/mock-*.csv`
3. **Sample data** — fallback di `src/data/sample-data.ts`

## Deploy

Push ke `main` → auto-deploy ke Vercel.
