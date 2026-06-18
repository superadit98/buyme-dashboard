/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel: gak pake basePath (domain langsung)
  // content.lensox.com: pake /supplychain (via nginx reverse proxy)
  basePath: process.env.VERCEL ? undefined : "/supplychain",
  images: { unoptimized: true },
};
export default nextConfig;
