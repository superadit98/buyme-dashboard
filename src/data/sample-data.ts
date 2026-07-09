/**
 * ============================================
 * SAMPLE DATA — Data Contoh untuk BuyMe Supply Chain Dashboard (Skincare)
 * ============================================
 * 
 * Data ini digunakan sebagai FALLBACK jika Google Sheets CSV
 * belum dikonfigurasi. Data realistis untuk bisnis skincare UMKM.
 * 
 * Setelah kamu publish Google Sheets sebagai CSV dan masukkan link-nya,
 * data di file ini TIDAK AKAN DIGUNAKAN.
 */

import type { Product, Order, Shipment, Sale } from "@/lib/types";

export const SAMPLE_PRODUCTS: Product[] = [
  { id: "P001", name: "Serum Vitamin C 15ml", category: "Skincare", price: 85000, cost: 40000, stock: 3, minStock: 10, supplier: "PT Kosmetik Nusantara", sku: "SKN-SVC-001", unit: "pcs" },
  { id: "P002", name: "Retinol Serum 0.5% 15ml", category: "Skincare", price: 95000, cost: 45000, stock: 2, minStock: 8, supplier: "PT Kosmetik Nusantara", sku: "SKN-RET-002", unit: "pcs" },
  { id: "P003", name: "Niacinamide Serum 10% 15ml", category: "Skincare", price: 75000, cost: 35000, stock: 5, minStock: 10, supplier: "PT Kosmetik Nusantara", sku: "SKN-NIA-003", unit: "pcs" },
  { id: "P004", name: "Sunscreen Gel SPF50 PA++++ 30ml", category: "Skincare", price: 65000, cost: 30000, stock: 4, minStock: 10, supplier: "CV Sunshield Indo", sku: "SKN-SSN-004", unit: "pcs" },
  { id: "P005", name: "Moisturizer Hyaluronic Acid 30ml", category: "Skincare", price: 70000, cost: 32000, stock: 12, minStock: 8, supplier: "PT Kosmetik Nusantara", sku: "SKN-MST-005", unit: "pcs" },
  { id: "P006", name: "Snail Mucin Essence 30ml", category: "Skincare", price: 90000, cost: 42000, stock: 1, minStock: 6, supplier: "CV Beauty Labs", sku: "SKN-SNM-006", unit: "pcs" },
  { id: "P007", name: "Brightening Serum 15ml", category: "Skincare", price: 88000, cost: 40000, stock: 4, minStock: 8, supplier: "PT Kosmetik Nusantara", sku: "SKN-BRT-007", unit: "pcs" },
  { id: "P008", name: "Toner AHA BHA PHA 100ml", category: "Skincare", price: 55000, cost: 25000, stock: 18, minStock: 10, supplier: "CV Kosmetik Asia", sku: "SKN-TNR-008", unit: "pcs" },
  { id: "P009", name: "Centella Asiatica Cream 30ml", category: "Skincare", price: 78000, cost: 36000, stock: 15, minStock: 8, supplier: "CV Kosmetik Asia", sku: "SKN-CNT-009", unit: "pcs" },
  { id: "P010", name: "Vitamin C Brightening Cream 30ml", category: "Skincare", price: 82000, cost: 38000, stock: 9, minStock: 8, supplier: "PT Kosmetik Nusantara", sku: "SKN-VCC-010", unit: "pcs" },
  { id: "P011", name: "Clay Mask Charcoal 50g", category: "Skincare", price: 45000, cost: 20000, stock: 25, minStock: 10, supplier: "CV Kosmetik Asia", sku: "SKN-CLM-011", unit: "pcs" },
  { id: "P012", name: "Lip Serum Vitamin E 10ml", category: "Skincare", price: 35000, cost: 15000, stock: 30, minStock: 12, supplier: "PT Kosmetik Nusantara", sku: "SKN-LPS-012", unit: "pcs" },
  { id: "P013", name: "Eye Cream Caffeine 15ml", category: "Skincare", price: 68000, cost: 30000, stock: 20, minStock: 8, supplier: "CV Beauty Depot", sku: "SKN-EYC-013", unit: "pcs" },
  { id: "P014", name: "Sunscreen Stick SPF50 20g", category: "Skincare", price: 55000, cost: 25000, stock: 7, minStock: 8, supplier: "CV Sunshield Indo", sku: "SKN-SSS-014", unit: "pcs" },
  { id: "P015", name: "Peptide Serum 15ml", category: "Skincare", price: 92000, cost: 43000, stock: 11, minStock: 6, supplier: "CV Beauty Depot", sku: "SKN-PEP-015", unit: "pcs" },
];

export const SAMPLE_ORDERS: Order[] = [
  { id: "ORD-001", customerName: "Budi Santoso", customerEmail: "budi@email.com", date: "2025-12-01", items: 2, total: 170000, status: "Delivered", address: "Jakarta Selatan", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-002", customerName: "Siti Rahayu", customerEmail: "siti@email.com", date: "2025-12-01", items: 1, total: 85000, status: "Delivered", address: "Bandung", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-003", customerName: "Andi Wijaya", customerEmail: "andi@email.com", date: "2025-12-02", items: 3, total: 240000, status: "Delivered", address: "Surabaya", paymentMethod: "BCA Transfer", notes: "", channel: "Shopee" },
  { id: "ORD-004", customerName: "Dewi Lestari", customerEmail: "dewi@email.com", date: "2025-12-02", items: 1, total: 75000, status: "Delivered", address: "Yogyakarta", paymentMethod: "OVO", notes: "", channel: "TikTok Shop" },
  { id: "ORD-005", customerName: "Rizky Pratama", customerEmail: "rizky@email.com", date: "2025-12-03", items: 2, total: 175000, status: "Delivered", address: "Medan", paymentMethod: "DANA", notes: "", channel: "Website" },
  { id: "ORD-006", customerName: "Maya Putri", customerEmail: "maya@email.com", date: "2025-12-03", items: 1, total: 95000, status: "Delivered", address: "Semarang", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-007", customerName: "Fajar Nugroho", customerEmail: "fajar@email.com", date: "2025-12-04", items: 3, total: 255000, status: "Delivered", address: "Malang", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-008", customerName: "Lestari Sari", customerEmail: "lestari@email.com", date: "2025-12-04", items: 2, total: 170000, status: "Delivered", address: "Palembang", paymentMethod: "BCA Transfer", notes: "", channel: "Shopee" },
  { id: "ORD-009", customerName: "Hendra Kurniawan", customerEmail: "hendra@email.com", date: "2025-12-05", items: 1, total: 65000, status: "Cancelled", address: "Makassar", paymentMethod: "BCA Transfer", notes: "Stok habis — customer cancel", channel: "Tokopedia" },
  { id: "ORD-010", customerName: "Anisa Zahra", customerEmail: "anisa@email.com", date: "2025-12-05", items: 4, total: 340000, status: "Delivered", address: "Denpasar", paymentMethod: "OVO", notes: "", channel: "TikTok Shop" },
  { id: "ORD-011", customerName: "Dimas Aditya", customerEmail: "dimas@email.com", date: "2025-12-06", items: 1, total: 90000, status: "Delivered", address: "Bogor", paymentMethod: "DANA", notes: "", channel: "Website" },
  { id: "ORD-012", customerName: "Rina Susanti", customerEmail: "rina@email.com", date: "2025-12-06", items: 2, total: 130000, status: "Delivered", address: "Bekasi", paymentMethod: "GoPay", notes: "", channel: "Shopee" },
  { id: "ORD-013", customerName: "Yoga Prabowo", customerEmail: "yoga@email.com", date: "2025-12-07", items: 1, total: 82000, status: "Delivered", address: "Solo", paymentMethod: "ShopeePay", notes: "", channel: "Tokopedia" },
  { id: "ORD-014", customerName: "Citra Maharani", customerEmail: "citra@email.com", date: "2025-12-07", items: 3, total: 255000, status: "Packed", address: "Depok", paymentMethod: "BCA Transfer", notes: "", channel: "TikTok Shop" },
  { id: "ORD-015", customerName: "Gilang Ramadhan", customerEmail: "gilang@email.com", date: "2025-12-08", items: 1, total: 95000, status: "Packed", address: "Tangerang", paymentMethod: "OVO", notes: "", channel: "Website" },
  { id: "ORD-016", customerName: "Putri Ayu", customerEmail: "putri@email.com", date: "2025-12-08", items: 2, total: 180000, status: "Shipped", address: "Cimahi", paymentMethod: "DANA", notes: "", channel: "Shopee" },
  { id: "ORD-017", customerName: "Arif Hidayat", customerEmail: "arif@email.com", date: "2025-12-09", items: 1, total: 75000, status: "Shipped", address: "Cirebon", paymentMethod: "GoPay", notes: "", channel: "Tokopedia" },
  { id: "ORD-018", customerName: "Wulan Sari", customerEmail: "wulan@email.com", date: "2025-12-10", items: 2, total: 176000, status: "Pending", address: "Pekalongan", paymentMethod: "BCA Transfer", notes: "", channel: "TikTok Shop" },
  { id: "ORD-019", customerName: "Bayu Firmansyah", customerEmail: "bayu@email.com", date: "2025-12-10", items: 1, total: 55000, status: "Shipped", address: "Purwokerto", paymentMethod: "ShopeePay", notes: "", channel: "Shopee" },
  { id: "ORD-020", customerName: "Eka Putri", customerEmail: "eka@email.com", date: "2025-12-11", items: 3, total: 270000, status: "Pending", address: "Tasikmalaya", paymentMethod: "BCA Transfer", notes: "", channel: "Tokopedia" },
  { id: "ORD-021", customerName: "Kevin Tan", customerEmail: "kevin@email.com", date: "2025-12-11", items: 1, total: 68000, status: "Pending", address: "Pontianak", paymentMethod: "OVO", notes: "", channel: "Website" },
  { id: "ORD-022", customerName: "Nadia Amelia", customerEmail: "nadia@email.com", date: "2025-12-12", items: 2, total: 140000, status: "Pending", address: "Banjarmasin", paymentMethod: "DANA", notes: "", channel: "Shopee" },
  { id: "ORD-023", customerName: "Rizal Maulana", customerEmail: "rizal@email.com", date: "2025-12-12", items: 1, total: 90000, status: "Cancelled", address: "Manado", paymentMethod: "GoPay", notes: "Stok habis — cancel otomatis", channel: "TikTok Shop" },
  { id: "ORD-024", customerName: "Lia Anggraini", customerEmail: "lia@email.com", date: "2025-12-13", items: 2, total: 165000, status: "Pending", address: "Ambon", paymentMethod: "BCA Transfer", notes: "", channel: "Website" },
  { id: "ORD-025", customerName: "Taufik Rahman", customerEmail: "taufik@email.com", date: "2025-12-13", items: 1, total: 78000, status: "Pending", address: "Bandar Lampung", paymentMethod: "ShopeePay", notes: "", channel: "Shopee" },
];

export const SAMPLE_SHIPMENTS: Shipment[] = [
  { id: "SHP-001", orderId: "ORD-001", carrier: "JNE", trackingNumber: "JNE9876543210", shipDate: "2025-12-01", estimatedDelivery: "2025-12-03", actualDelivery: "2025-12-03", status: "Delivered", weight: 0.3, cost: 14000, destination: "Jakarta Selatan" },
  { id: "SHP-002", orderId: "ORD-002", carrier: "J&T", trackingNumber: "JT1234567890", shipDate: "2025-12-01", estimatedDelivery: "2025-12-03", actualDelivery: "2025-12-03", status: "Delivered", weight: 0.2, cost: 12000, destination: "Bandung" },
  { id: "SHP-003", orderId: "ORD-003", carrier: "SiCepat", trackingNumber: "SCP5566778899", shipDate: "2025-12-02", estimatedDelivery: "2025-12-04", actualDelivery: "2025-12-03", status: "Delivered", weight: 0.5, cost: 18000, destination: "Surabaya" },
  { id: "SHP-004", orderId: "ORD-004", carrier: "JNE", trackingNumber: "JNE1122334455", shipDate: "2025-12-02", estimatedDelivery: "2025-12-04", actualDelivery: "2025-12-05", status: "Delivered", weight: 0.2, cost: 13000, destination: "Yogyakarta" },
  { id: "SHP-005", orderId: "ORD-005", carrier: "AnterAja", trackingNumber: "AA9988776655", shipDate: "2025-12-03", estimatedDelivery: "2025-12-06", actualDelivery: "2025-12-05", status: "Delivered", weight: 0.4, cost: 20000, destination: "Medan" },
  { id: "SHP-006", orderId: "ORD-006", carrier: "SiCepat", trackingNumber: "SCP4455667788", shipDate: "2025-12-03", estimatedDelivery: "2025-12-05", actualDelivery: "2025-12-05", status: "Delivered", weight: 0.2, cost: 16000, destination: "Semarang" },
  { id: "SHP-007", orderId: "ORD-007", carrier: "J&T", trackingNumber: "JT7788990011", shipDate: "2025-12-04", estimatedDelivery: "2025-12-06", actualDelivery: "2025-12-06", status: "Delivered", weight: 0.5, cost: 14000, destination: "Malang" },
  { id: "SHP-008", orderId: "ORD-008", carrier: "JNE", trackingNumber: "JNE3344556677", shipDate: "2025-12-04", estimatedDelivery: "2025-12-07", actualDelivery: "2025-12-08", status: "Delivered", weight: 0.3, cost: 22000, destination: "Palembang" },
  { id: "SHP-009", orderId: "ORD-011", carrier: "AnterAja", trackingNumber: "AA6677889900", shipDate: "2025-12-06", estimatedDelivery: "2025-12-08", actualDelivery: "2025-12-08", status: "Delivered", weight: 0.2, cost: 15000, destination: "Bogor" },
  { id: "SHP-010", orderId: "ORD-016", carrier: "SiCepat", trackingNumber: "SCP2233445566", shipDate: "2025-12-08", estimatedDelivery: "2025-12-10", actualDelivery: "", status: "In Transit", weight: 0.3, cost: 13000, destination: "Cimahi" },
  { id: "SHP-011", orderId: "ORD-017", carrier: "JNE", trackingNumber: "JNE8899001122", shipDate: "2025-12-09", estimatedDelivery: "2025-12-11", actualDelivery: "", status: "In Transit", weight: 0.2, cost: 15000, destination: "Cirebon" },
  { id: "SHP-012", orderId: "ORD-019", carrier: "J&T", trackingNumber: "JT5566778899", shipDate: "2025-12-10", estimatedDelivery: "2025-12-12", actualDelivery: "", status: "In Transit", weight: 0.1, cost: 11000, destination: "Purwokerto" },
  { id: "SHP-013", orderId: "ORD-021", carrier: "AnterAja", trackingNumber: "AA4455667788", shipDate: "2025-12-12", estimatedDelivery: "2025-12-15", actualDelivery: "", status: "Out for Delivery", weight: 0.2, cost: 25000, destination: "Pontianak" },
  { id: "SHP-014", orderId: "ORD-022", carrier: "JNE", trackingNumber: "JNE6677889900", shipDate: "2025-12-12", estimatedDelivery: "2025-12-14", actualDelivery: "", status: "In Transit", weight: 0.3, cost: 18000, destination: "Banjarmasin" },
];

export const SAMPLE_SALES: Sale[] = [
  { id: "S001", orderId: "ORD-001", date: "2025-12-01", productCategory: "Skincare", quantity: 2, revenue: 170000, cost: 80000, profit: 90000, channel: "Shopee" },
  { id: "S002", orderId: "ORD-002", date: "2025-12-01", productCategory: "Skincare", quantity: 1, revenue: 85000, cost: 40000, profit: 45000, channel: "Tokopedia" },
  { id: "S003", orderId: "ORD-003", date: "2025-12-02", productCategory: "Skincare", quantity: 3, revenue: 240000, cost: 110000, profit: 130000, channel: "Shopee" },
  { id: "S004", orderId: "ORD-004", date: "2025-12-02", productCategory: "Skincare", quantity: 1, revenue: 75000, cost: 35000, profit: 40000, channel: "TikTok Shop" },
  { id: "S005", orderId: "ORD-005", date: "2025-12-03", productCategory: "Skincare", quantity: 2, revenue: 175000, cost: 82000, profit: 93000, channel: "Website" },
  { id: "S006", orderId: "ORD-006", date: "2025-12-03", productCategory: "Skincare", quantity: 1, revenue: 95000, cost: 45000, profit: 50000, channel: "Shopee" },
  { id: "S007", orderId: "ORD-007", date: "2025-12-04", productCategory: "Skincare", quantity: 3, revenue: 255000, cost: 118000, profit: 137000, channel: "Tokopedia" },
  { id: "S008", orderId: "ORD-008", date: "2025-12-04", productCategory: "Skincare", quantity: 2, revenue: 170000, cost: 80000, profit: 90000, channel: "Shopee" },
  { id: "S009", orderId: "ORD-010", date: "2025-12-05", productCategory: "Skincare", quantity: 4, revenue: 340000, cost: 155000, profit: 185000, channel: "TikTok Shop" },
  { id: "S010", orderId: "ORD-011", date: "2025-12-06", productCategory: "Skincare", quantity: 1, revenue: 90000, cost: 42000, profit: 48000, channel: "Website" },
  { id: "S011", orderId: "ORD-012", date: "2025-12-06", productCategory: "Skincare", quantity: 2, revenue: 130000, cost: 60000, profit: 70000, channel: "Shopee" },
  { id: "S012", orderId: "ORD-013", date: "2025-12-07", productCategory: "Skincare", quantity: 1, revenue: 82000, cost: 38000, profit: 44000, channel: "Tokopedia" },
  { id: "S013", orderId: "ORD-019", date: "2025-12-10", productCategory: "Skincare", quantity: 1, revenue: 55000, cost: 25000, profit: 30000, channel: "Shopee" },
];