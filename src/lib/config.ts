/**
 * ============================================
 * KONFIGURASI DATA SOURCE
 * ============================================
 *
 * === CARA GUNAKAN GOOGLE SHEETS ===
 *
 * 1. Buat Google Sheet dengan kolom sesuai template (lihat below)
 * 2. File > Share > Publish to web > Pilih tab > Format: CSV > Publish
 * 3. Copy link yang muncul
 * 4. Buka file .env.local di root project, isi link CSV:
 *
 *    NEXT_PUBLIC_PRODUCTS_CSV=https://docs.google.com/spreadsheets/d/e/YOUR_ID/pub?output=csv&gid=0
 *    NEXT_PUBLIC_ORDERS_CSV=https://docs.google.com/spreadsheets/d/e/YOUR_ID/pub?output=csv&gid=0
 *    NEXT_PUBLIC_SHIPMENTS_CSV=https://docs.google.com/spreadsheets/d/e/YOUR_ID/pub?output=csv&gid=0
 *    NEXT_PUBLIC_SALES_CSV=https://docs.google.com/spreadsheets/d/e/YOUR_ID/pub?output=csv&gid=0
 *
 * 5. Rebuild: npm run build && pm2 restart supplychain
 *
 * === KALAU BELUM ISI .env.local ===
 * Dashboard otomatis pakai mock data dari /public/mock-*.csv
 * (bisa diedit langsung di Google Sheets, upload sebagai CSV baru)
 */

import type { DashboardConfig } from "./types";

export const CSV_CONFIG: DashboardConfig = {
  productsCsvUrl: process.env.NEXT_PUBLIC_PRODUCTS_CSV || "",
  ordersCsvUrl: process.env.NEXT_PUBLIC_ORDERS_CSV || "",
  shipmentsCsvUrl: process.env.NEXT_PUBLIC_SHIPMENTS_CSV || "",
  salesCsvUrl: process.env.NEXT_PUBLIC_SALES_CSV || "",
};
