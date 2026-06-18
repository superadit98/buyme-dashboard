/**
 * Root page — render Overview langsung, tanpa redirect.
 * Biar gak error hydration mismatch di Vercel.
 */
import OverviewPage from "./overview/page";

export default function RootPage() {
  return <OverviewPage />;
}
