/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hapus basePath untuk Vercel (deploy ke root domain)
  // Kalau mau subpath /supplychain/, uncomment baris berikut:
  // basePath: "/supplychain",
  images: { unoptimized: true },
};
export default nextConfig;
