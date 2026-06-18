/**
 * ============================================
 * SAMPLE DATA — Data Contoh untuk BuyMe E-Commerce Fashion & Aksesoris
 * ============================================
 * 
 * Data ini digunakan sebagai FALLBACK jika Google Sheets CSV
 * belum dikonfigurasi. Data realistis untuk UMKM fashion Indonesia.
 * 
 * Setelah kamu publish Google Sheets sebagai CSV dan masukkan link-nya,
 * data di file ini TIDAK AKAN DIGUNAKAN.
 */

import type { Product, Order, Shipment, Sale } from "@/lib/types";

export const SAMPLE_PRODUCTS: Product[] = [
  { id: "P001", name: "Kaos Polos Katun Premium", category: "Pakaian", price: 89000, cost: 42000, stock: 180, minStock: 30, supplier: "UD Konveksi Bandung", sku: "FSH-KTS-001", unit: "pcs" },
  { id: "P002", name: "Dress Floral Summer", category: "Pakaian", price: 175000, cost: 85000, stock: 65, minStock: 15, supplier: "PT Fashion Nusantara", sku: "FSH-DRS-002", unit: "pcs" },
  { id: "P003", name: "Kemeja Linen Premium", category: "Pakaian", price: 210000, cost: 95000, stock: 40, minStock: 10, supplier: "UD Konveksi Bandung", sku: "FSH-KMJ-003", unit: "pcs" },
  { id: "P004", name: "Celana Chino Slim Fit", category: "Pakaian", price: 165000, cost: 78000, stock: 8, minStock: 15, supplier: "UD Batik Modern", sku: "FSH-CLN-004", unit: "pcs" },
  { id: "P005", name: "Tas Tote Canvas Premium", category: "Tas", price: 125000, cost: 55000, stock: 95, minStock: 20, supplier: "CV Tas Import", sku: "FSH-TTE-005", unit: "pcs" },
  { id: "P006", name: "Tas Selempang Kulit", category: "Tas", price: 195000, cost: 88000, stock: 35, minStock: 10, supplier: "CV Tas Import", sku: "FSH-TSL-006", unit: "pcs" },
  { id: "P007", name: "Ransel Urban Backpack", category: "Tas", price: 250000, cost: 115000, stock: 5, minStock: 10, supplier: "CV Tas Import", sku: "FSH-RNS-007", unit: "pcs" },
  { id: "P008", name: "Sneakers Casual Pria", category: "Sepatu", price: 320000, cost: 150000, stock: 50, minStock: 12, supplier: "PT Sepatu Lokal", sku: "FSH-SNK-008", unit: "pcs" },
  { id: "P009", name: "Sandal Kulit Premium", category: "Sepatu", price: 185000, cost: 82000, stock: 70, minStock: 15, supplier: "PT Sepatu Lokal", sku: "FSH-SND-009", unit: "pcs" },
  { id: "P010", name: "Loafer Suede Classic", category: "Sepatu", price: 275000, cost: 130000, stock: 3, minStock: 8, supplier: "PT Sepatu Lokal", sku: "FSH-LOF-010", unit: "pcs" },
  { id: "P011", name: "Jam Tangan Analog Classic", category: "Aksesoris", price: 350000, cost: 165000, stock: 25, minStock: 5, supplier: "CV Aksesoris Jewel", sku: "FSH-JTM-011", unit: "pcs" },
  { id: "P012", name: "Kacamata Sunglasses UV400", category: "Aksesoris", price: 145000, cost: 58000, stock: 60, minStock: 10, supplier: "CV Aksesoris Jewel", sku: "FSH-KCM-012", unit: "pcs" },
  { id: "P013", name: "Dompet Kulit Pria Slim", category: "Aksesoris", price: 125000, cost: 52000, stock: 45, minStock: 10, supplier: "CV Aksesoris Jewel", sku: "FSH-DMT-013", unit: "pcs" },
  { id: "P014", name: "Syal Sutera Etnik", category: "Aksesoris", price: 95000, cost: 40000, stock: 55, minStock: 12, supplier: "PT Textile Pro", sku: "FSH-SYL-014", unit: "pcs" },
  { id: "P015", name: "Kalung Pendant Silver 925", category: "Aksesoris", price: 285000, cost: 135000, stock: 30, minStock: 8, supplier: "CV Aksesoris Jewel", sku: "FSH-KLN-015", unit: "pcs" },
];

export const SAMPLE_ORDERS: Order[] = [
  { id: "ORD-001", customerName: "Budi Santoso", customerEmail: "budi@email.com", date: "2025-06-01", items: 3, total: 264000, status: "Delivered", address: "Jakarta Selatan", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-002", customerName: "Siti Rahayu", customerEmail: "siti@email.com", date: "2025-06-01", items: 1, total: 320000, status: "Delivered", address: "Bandung", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-003", customerName: "Andi Wijaya", customerEmail: "andi@email.com", date: "2025-06-02", items: 2, total: 445000, status: "Delivered", address: "Surabaya", paymentMethod: "BCA Transfer", notes: "", channel: "Shopee" },
  { id: "ORD-004", customerName: "Dewi Lestari", customerEmail: "dewi@email.com", date: "2025-06-02", items: 2, total: 184000, status: "Delivered", address: "Yogyakarta", paymentMethod: "OVO", notes: "", channel: "TikTok Shop" },
  { id: "ORD-005", customerName: "Rizky Pratama", customerEmail: "rizky@email.com", date: "2025-06-03", items: 1, total: 350000, status: "Delivered", address: "Medan", paymentMethod: "DANA", notes: "", channel: "Website" },
  { id: "ORD-006", customerName: "Maya Putri", customerEmail: "maya@email.com", date: "2025-06-03", items: 3, total: 395000, status: "Delivered", address: "Semarang", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-007", customerName: "Fajar Nugroho", customerEmail: "fajar@email.com", date: "2025-06-04", items: 2, total: 214000, status: "Delivered", address: "Malang", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-008", customerName: "Lestari Sari", customerEmail: "lestari@email.com", date: "2025-06-04", items: 4, total: 530000, status: "Delivered", address: "Palembang", paymentMethod: "BCA Transfer", notes: "", channel: "Shopee" },
  { id: "ORD-009", customerName: "Hendra Kurniawan", customerEmail: "hendra@email.com", date: "2025-06-05", items: 1, total: 125000, status: "Cancelled", address: "Makassar", paymentMethod: "BCA Transfer", notes: "Customer request cancel", channel: "Tokopedia" },
  { id: "ORD-010", customerName: "Anisa Zahra", customerEmail: "anisa@email.com", date: "2025-06-05", items: 5, total: 680000, status: "Delivered", address: "Denpasar", paymentMethod: "OVO", notes: "", channel: "TikTok Shop" },
  { id: "ORD-011", customerName: "Dimas Aditya", customerEmail: "dimas@email.com", date: "2025-06-06", items: 2, total: 250000, status: "Delivered", address: "Bogor", paymentMethod: "DANA", notes: "", channel: "Website" },
  { id: "ORD-012", customerName: "Rina Susanti", customerEmail: "rina@email.com", date: "2025-06-06", items: 1, total: 95000, status: "Delivered", address: "Bekasi", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-013", customerName: "Yoga Prabowo", customerEmail: "yoga@email.com", date: "2025-06-07", items: 2, total: 310000, status: "Delivered", address: "Solo", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-014", customerName: "Citra Maharani", customerEmail: "citra@email.com", date: "2025-06-07", items: 3, total: 435000, status: "Packed", address: "Depok", paymentMethod: "BCA Transfer", notes: "", channel: "TikTok Shop" },
  { id: "ORD-015", customerName: "Gilang Ramadhan", customerEmail: "gilang@email.com", date: "2025-06-08", items: 1, total: 275000, status: "Packed", address: "Tangerang", paymentMethod: "OVO", notes: "", channel: "Website" },
  { id: "ORD-016", customerName: "Putri Ayu", customerEmail: "putri@email.com", date: "2025-06-08", items: 2, total: 178000, status: "Shipped", address: "Cimahi", paymentMethod: "DANA", notes: "", channel: "Shopee" },
  { id: "ORD-017", customerName: "Arif Hidayat", customerEmail: "arif@email.com", date: "2025-06-09", items: 2, total: 290000, status: "Shipped", address: "Cirebon", paymentMethod: "GoPay", notes: "", channel: "Tokopedia" },
  { id: "ORD-018", customerName: "Wulan Sari", customerEmail: "wulan@email.com", date: "2025-06-09", items: 3, total: 420000, status: "Packed", address: "Pekalongan", paymentMethod: "BCA Transfer", notes: "", channel: "TikTok Shop" },
  { id: "ORD-019", customerName: "Bayu Firmansyah", customerEmail: "bayu@email.com", date: "2025-06-10", items: 1, total: 145000, status: "Shipped", address: "Purwokerto", paymentMethod: "ShopeePay", notes: "", channel: "Shopee" },
  { id: "ORD-020", customerName: "Eka Putri", customerEmail: "eka@email.com", date: "2025-06-10", items: 4, total: 570000, status: "Packed", address: "Tasikmalaya", paymentMethod: "BCA Transfer", notes: "", channel: "Tokopedia" },
  { id: "ORD-021", customerName: "Kevin Tan", customerEmail: "kevin@email.com", date: "2025-06-11", items: 2, total: 210000, status: "Packed", address: "Pontianak", paymentMethod: "OVO", notes: "", channel: "Website" },
  { id: "ORD-022", customerName: "Nadia Amelia", customerEmail: "nadia@email.com", date: "2025-06-11", items: 1, total: 195000, status: "Packed", address: "Banjarmasin", paymentMethod: "DANA", notes: "", channel: "Shopee" },
  { id: "ORD-023", customerName: "Rizal Maulana", customerEmail: "rizal@email.com", date: "2025-06-12", items: 3, total: 480000, status: "Pending", address: "Manado", paymentMethod: "GoPay", notes: "", channel: "TikTok Shop" },
  { id: "ORD-024", customerName: "Lia Anggraini", customerEmail: "lia@email.com", date: "2025-06-12", items: 2, total: 315000, status: "Pending", address: "Ambon", paymentMethod: "BCA Transfer", notes: "", channel: "Website" },
  { id: "ORD-025", customerName: "Taufik Rahman", customerEmail: "taufik@email.com", date: "2025-06-13", items: 2, total: 260000, status: "Pending", address: "Lampung", paymentMethod: "ShopeePay", notes: "", channel: "Shopee" },
];

export const SAMPLE_SHIPMENTS: Shipment[] = [
  { id: "SHP-001", orderId: "ORD-001", carrier: "JNE", trackingNumber: "JNE9876543210", shipDate: "2025-06-01", estimatedDelivery: "2025-06-03", actualDelivery: "2025-06-03", status: "Delivered", weight: 0.8, cost: 14000, destination: "Jakarta Selatan" },
  { id: "SHP-002", orderId: "ORD-002", carrier: "J&T", trackingNumber: "JT1234567890", shipDate: "2025-06-02", estimatedDelivery: "2025-06-04", actualDelivery: "2025-06-04", status: "Delivered", weight: 0.5, cost: 12000, destination: "Bandung" },
  { id: "SHP-003", orderId: "ORD-003", carrier: "SiCepat", trackingNumber: "SCP5566778899", shipDate: "2025-06-02", estimatedDelivery: "2025-06-05", actualDelivery: "2025-06-04", status: "Delivered", weight: 1.2, cost: 18000, destination: "Surabaya" },
  { id: "SHP-004", orderId: "ORD-004", carrier: "JNE", trackingNumber: "JNE1122334455", shipDate: "2025-06-03", estimatedDelivery: "2025-06-05", actualDelivery: "2025-06-05", status: "Delivered", weight: 0.6, cost: 13000, destination: "Yogyakarta" },
  { id: "SHP-005", orderId: "ORD-005", carrier: "AnterAja", trackingNumber: "AA9988776655", shipDate: "2025-06-03", estimatedDelivery: "2025-06-07", actualDelivery: "2025-06-06", status: "Delivered", weight: 0.4, cost: 20000, destination: "Medan" },
  { id: "SHP-006", orderId: "ORD-006", carrier: "SiCepat", trackingNumber: "SCP4455667788", shipDate: "2025-06-04", estimatedDelivery: "2025-06-06", actualDelivery: "2025-06-06", status: "Delivered", weight: 1.5, cost: 16000, destination: "Semarang" },
  { id: "SHP-007", orderId: "ORD-007", carrier: "J&T", trackingNumber: "JT7788990011", shipDate: "2025-06-04", estimatedDelivery: "2025-06-06", actualDelivery: "2025-06-06", status: "Delivered", weight: 0.7, cost: 14000, destination: "Malang" },
  { id: "SHP-008", orderId: "ORD-008", carrier: "JNE", trackingNumber: "JNE3344556677", shipDate: "2025-06-05", estimatedDelivery: "2025-06-08", actualDelivery: "2025-06-08", status: "Delivered", weight: 2.0, cost: 22000, destination: "Palembang" },
  { id: "SHP-009", orderId: "ORD-011", carrier: "AnterAja", trackingNumber: "AA6677889900", shipDate: "2025-06-07", estimatedDelivery: "2025-06-09", actualDelivery: "2025-06-09", status: "Delivered", weight: 0.9, cost: 15000, destination: "Bogor" },
  { id: "SHP-010", orderId: "ORD-016", carrier: "SiCepat", trackingNumber: "SCP2233445566", shipDate: "2025-06-09", estimatedDelivery: "2025-06-11", actualDelivery: "", status: "In Transit", weight: 0.6, cost: 13000, destination: "Cimahi" },
  { id: "SHP-011", orderId: "ORD-017", carrier: "JNE", trackingNumber: "JNE8899001122", shipDate: "2025-06-10", estimatedDelivery: "2025-06-12", actualDelivery: "", status: "In Transit", weight: 0.8, cost: 15000, destination: "Cirebon" },
  { id: "SHP-012", orderId: "ORD-019", carrier: "J&T", trackingNumber: "JT5566778899", shipDate: "2025-06-10", estimatedDelivery: "2025-06-12", actualDelivery: "", status: "In Transit", weight: 0.3, cost: 11000, destination: "Purwokerto" },
  { id: "SHP-013", orderId: "ORD-021", carrier: "AnterAja", trackingNumber: "AA4455667788", shipDate: "2025-06-12", estimatedDelivery: "2025-06-16", actualDelivery: "", status: "Out for Delivery", weight: 0.7, cost: 25000, destination: "Pontianak" },
  { id: "SHP-014", orderId: "ORD-022", carrier: "JNE", trackingNumber: "JNE6677889900", shipDate: "2025-06-12", estimatedDelivery: "2025-06-15", actualDelivery: "", status: "In Transit", weight: 0.4, cost: 18000, destination: "Banjarmasin" },
];

export const SAMPLE_SALES: Sale[] = [
  { id: "S001", orderId: "ORD-001", date: "2025-06-01", productCategory: "Pakaian", quantity: 2, revenue: 178000, cost: 84000, profit: 94000, channel: "Shopee" },
  { id: "S002", orderId: "ORD-001", date: "2025-06-01", productCategory: "Tas", quantity: 1, revenue: 125000, cost: 55000, profit: 70000, channel: "Shopee" },
  { id: "S003", orderId: "ORD-002", date: "2025-06-01", productCategory: "Sepatu", quantity: 1, revenue: 320000, cost: 150000, profit: 170000, channel: "Tokopedia" },
  { id: "S004", orderId: "ORD-003", date: "2025-06-02", productCategory: "Pakaian", quantity: 1, revenue: 210000, cost: 95000, profit: 115000, channel: "Shopee" },
  { id: "S005", orderId: "ORD-003", date: "2025-06-02", productCategory: "Aksesoris", quantity: 1, revenue: 235000, cost: 105000, profit: 130000, channel: "Shopee" },
  { id: "S006", orderId: "ORD-004", date: "2025-06-02", productCategory: "Pakaian", quantity: 1, revenue: 89000, cost: 42000, profit: 47000, channel: "TikTok Shop" },
  { id: "S007", orderId: "ORD-004", date: "2025-06-02", productCategory: "Aksesoris", quantity: 1, revenue: 95000, cost: 40000, profit: 55000, channel: "TikTok Shop" },
  { id: "S008", orderId: "ORD-005", date: "2025-06-03", productCategory: "Pakaian", quantity: 1, revenue: 350000, cost: 165000, profit: 185000, channel: "Website" },
  { id: "S009", orderId: "ORD-006", date: "2025-06-03", productCategory: "Tas", quantity: 1, revenue: 195000, cost: 88000, profit: 107000, channel: "Shopee" },
  { id: "S010", orderId: "ORD-006", date: "2025-06-03", productCategory: "Aksesoris", quantity: 2, revenue: 200000, cost: 110000, profit: 90000, channel: "Shopee" },
  { id: "S011", orderId: "ORD-007", date: "2025-06-04", productCategory: "Sepatu", quantity: 1, revenue: 185000, cost: 82000, profit: 103000, channel: "Tokopedia" },
  { id: "S012", orderId: "ORD-007", date: "2025-06-04", productCategory: "Pakaian", quantity: 1, revenue: 89000, cost: 42000, profit: 47000, channel: "Tokopedia" },
  { id: "S013", orderId: "ORD-008", date: "2025-06-04", productCategory: "Tas", quantity: 2, revenue: 375000, cost: 170000, profit: 205000, channel: "Shopee" },
  { id: "S014", orderId: "ORD-008", date: "2025-06-04", productCategory: "Aksesoris", quantity: 2, revenue: 155000, cost: 65000, profit: 90000, channel: "Shopee" },
  { id: "S015", orderId: "ORD-010", date: "2025-06-05", productCategory: "Pakaian", quantity: 3, revenue: 465000, cost: 220000, profit: 245000, channel: "TikTok Shop" },
  { id: "S016", orderId: "ORD-010", date: "2025-06-05", productCategory: "Aksesoris", quantity: 2, revenue: 215000, cost: 95000, profit: 120000, channel: "TikTok Shop" },
  { id: "S017", orderId: "ORD-012", date: "2025-06-06", productCategory: "Aksesoris", quantity: 1, revenue: 95000, cost: 40000, profit: 55000, channel: "Website" },
  { id: "S018", orderId: "ORD-013", date: "2025-06-07", productCategory: "Pakaian", quantity: 1, revenue: 165000, cost: 78000, profit: 87000, channel: "Tokopedia" },
  { id: "S019", orderId: "ORD-013", date: "2025-06-07", productCategory: "Tas", quantity: 1, revenue: 145000, cost: 58000, profit: 87000, channel: "Tokopedia" },
  { id: "S020", orderId: "ORD-019", date: "2025-06-10", productCategory: "Aksesoris", quantity: 1, revenue: 145000, cost: 58000, profit: 87000, channel: "Shopee" },
];
