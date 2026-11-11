"use client";
import { useMemo, useState } from "react";
import { PRODUCTS, formatAED } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
const OCCASIONS = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.occasion)))];

export default function ShopClient({ initialQ = "", initialCat = "All", initialOcc = "All" }: { initialQ?: string; initialCat?: string; initialOcc?: string }) {
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState(initialCat);
  const [occ, setOcc] = useState(initialOcc);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (occ === "All" || p.occasion === occ) &&
      p.price <= maxPrice &&
      (q === "" || (p.name + p.blurb + p.category).toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, cat, occ, maxPrice, sort]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-4xl text-pine-900">Shop Balloons &amp; Decorations</h1>
      <p className="text-stone-600 mt-2">{filtered.length} of {PRODUCTS.length} products · Prices in AED · Same-day before 6 PM</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border bg-white p-4 h-fit space-y-4">
          <div>
            <label className="font-semibold text-sm" htmlFor="shop-search">Search</label>
            <input id="shop-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="mt-1 w-full rounded-full border px-4 py-2 text-sm outline-none" />
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="cat">Category</label>
            <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="occ">Occasion</label>
            <select id="occ" value={occ} onChange={(e) => setOcc(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">{OCCASIONS.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="price">Max price: {formatAED(maxPrice)}</label>
            <input id="price" type="range" min={15} max={3500} step={5} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#7a1e2b]" />
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">
              <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name A–Z</option>
            </select>
          </div>
          <button onClick={() => { setQ(""); setCat("All"); setOcc("All"); setMaxPrice(3500); setSort("featured"); }} className="text-sm underline">Clear all filters</button>
        </aside>
        <div>
          {filtered.length === 0 ? <p className="rounded-2xl border bg-white p-6">No products match those filters. Try clearing the search or raising the max price.</p> : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}

