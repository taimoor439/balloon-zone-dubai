import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop Balloons & Decorations | Balloon Zone Dubai",
  description: "Shop balloon bouquets, arches, decoration packages, cakes and party supplies in Dubai. Prices in AED, same-day delivery before 6 PM.",
};

export default function Shop({ searchParams }: { searchParams?: { q?: string; category?: string; occasion?: string } }) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8">Loading shop…</div>}>
      <ShopClient initialQ={searchParams?.q || ""} initialCat={searchParams?.category || "All"} initialOcc={searchParams?.occasion || "All"} />
    </Suspense>
  );
}
