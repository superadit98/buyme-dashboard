/**
 * ============================================
 * BuyMe Dashboard — TypeScript Types
 * ============================================
 * 
 * Interface untuk data BuyMe Dashboard.
 * Data diambil dari Google Sheets yang dipublish sebagai CSV.
 * 
 * Cara publish Google Sheet sebagai CSV:
 * 1. Buka Google Sheet kamu
 * 2. Klik File > Share > Publish to web
 * 3. Pilih sheet/tab yang mau dipublish
 * 4. Pilih format: CSV
 * 5. Klik Publish
 * 6. Copy link yang muncul
 * 
 * Contoh link CSV:
 * https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?output=csv
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;        // Harga jual (Rp)
  cost: number;         // Harga beli/modal (Rp)
  stock: number;        // Stok saat ini
  minStock: number;     // Stok minimum (threshold low stock)
  supplier: string;     // Nama supplier/pemasok
  sku: string;          // SKU produk
  unit: string;         // Satuan (pcs, kg, box, dll)
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;         // Format: YYYY-MM-DD
  items: number;        // Jumlah item
  total: number;        // Total harga (Rp)
  status: OrderStatus;
  address: string;
  paymentMethod: string;
  notes: string;
}

export type OrderStatus =
  | "Pending"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Shipment {
  id: string;
  orderId: string;
  carrier: string;       // Nama ekspedisi (JNE, J&T, SiCepat, dll)
  trackingNumber: string;
  shipDate: string;      // Format: YYYY-MM-DD
  estimatedDelivery: string;
  actualDelivery: string;
  status: ShipmentStatus;
  weight: number;        // Berat dalam kg
  cost: number;          // Ongkir (Rp)
}

export type ShipmentStatus =
  | "Pending"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "Returned";

export interface Sale {
  id: string;
  orderId: string;
  date: string;
  productCategory: string;
  quantity: number;
  revenue: number;       // Pendapatan kotor (Rp)
  cost: number;          // Modal (Rp)
  profit: number;        // Profit = revenue - cost (Rp)
  channel: string;       // Marketplace / Website / WhatsApp
}

export interface DashboardConfig {
  /** Link CSV untuk produk dari Google Sheets */
  productsCsvUrl: string;
  /** Link CSV untuk pesanan dari Google Sheets */
  ordersCsvUrl: string;
  /** Link CSV untuk pengiriman dari Google Sheets */
  shipmentsCsvUrl: string;
  /** Link CSV untuk penjualan dari Google Sheets */
  salesCsvUrl: string;
}
