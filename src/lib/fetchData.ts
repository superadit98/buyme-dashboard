/**
 * ============================================
 * DATA FETCHER — CSV Parser
 * ============================================
 *
 * Fetch + parse CSV dari Google Sheets.
 * Kalau URL belum dikonfigurasi, pakai mock data dari /public/mock-*.csv
 */

import Papa from "papaparse";
import type { Product, Order, Shipment, Sale } from "./types";
import { CSV_CONFIG } from "./config";
import {
  SAMPLE_PRODUCTS,
  SAMPLE_ORDERS,
  SAMPLE_SHIPMENTS,
  SAMPLE_SALES,
} from "@/data/sample-data";

async function fetchCsv<T>(url: string): Promise<T[]> {
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const text = await res.text();
    const result = Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: (h) => h.trim(),
    });
    return result.data;
  } catch (e) {
    console.error("[CSV] Fetch error:", e);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  // Coba Google Sheets CSV dulu, fallback ke mock CSV, fallback ke sample data
  let data = await fetchCsv<Product>(CSV_CONFIG.productsCsvUrl);
  if (data.length === 0) data = await fetchCsv<Product>("/mock-products.csv");
  if (data.length === 0) data = SAMPLE_PRODUCTS;
  return data.map((p) => ({
    ...p,
    price: Number(p.price) || 0,
    cost: Number(p.cost) || 0,
    stock: Number(p.stock) || 0,
    minStock: Number(p.minStock) || 0,
  }));
}

export async function getOrders(): Promise<Order[]> {
  let data = await fetchCsv<Order>(CSV_CONFIG.ordersCsvUrl);
  if (data.length === 0) data = await fetchCsv<Order>("/mock-orders.csv");
  if (data.length === 0) data = SAMPLE_ORDERS;
  return data.map((o) => ({
    ...o,
    items: Number(o.items) || 0,
    total: Number(o.total) || 0,
  }));
}

export async function getShipments(): Promise<Shipment[]> {
  let data = await fetchCsv<Shipment>(CSV_CONFIG.shipmentsCsvUrl);
  if (data.length === 0) data = await fetchCsv<Shipment>("/mock-shipments.csv");
  if (data.length === 0) data = SAMPLE_SHIPMENTS;
  return data.map((s) => ({
    ...s,
    weight: Number(s.weight) || 0,
    cost: Number(s.cost) || 0,
  }));
}

export async function getSales(): Promise<Sale[]> {
  let data = await fetchCsv<Sale>(CSV_CONFIG.salesCsvUrl);
  if (data.length === 0) data = await fetchCsv<Sale>("/mock-sales.csv");
  if (data.length === 0) data = SAMPLE_SALES;
  return data.map((s) => ({
    ...s,
    quantity: Number(s.quantity) || 0,
    revenue: Number(s.revenue) || 0,
    cost: Number(s.cost) || 0,
    profit: Number(s.profit) || 0,
  }));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}
