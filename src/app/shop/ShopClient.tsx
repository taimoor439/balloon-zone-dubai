"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, formatAED } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
const OCCASIONS = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.occasion)))];

function readParams(params: URLSearchParams) {
  const cat = params.get("category") ?? "All";
  const occ = params.get("occasion") ?? "All";
  return {
    q: params.get("q") ?? "",
    cat: CATEGORIES.includes(cat) ? cat : "All",
    occ: OCCASIONS.includes(occ) ? occ : "All",
    sale: params.get("sale") === "1",
  };
}

export default function ShopClient() {
  const params = useSearchParams();
  const [initial] = useState(() => readParams(params));
  const [q, setQ] = useState(initial.q);
  const [cat, setCat] = useState(initial.cat);
  const [occ, setOcc] = useState(initial.occ);
  const [saleOnly, setSaleOnly] = useState(initial.sale);
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sort, setSort] = useState("featured");

  // Menu links land here with ?q= / ?occasion= / ?category= / ?sale= — pick them
  // up client-side. (Reading searchParams in the server page broke the
  // static export, so this component is the only place that reads the URL.)
  useEffect(() => {
    const next = readParams(params);
    setQ(next.q);
    setCat(next.cat);
    setOcc(next.occ);
    setSaleOnly(next.sale);
  }, [params]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) =>
      (cat === "All" || p.category === cat) &&
      (occ === "All" || p.occasion === occ) &&
      (!saleOnly || p.wasPrice !== undefined) &&
      p.price <= maxPrice &&
      (q === "" || (p.name + " " + p.blurb + " " + p.category + " " + p.occasion).toLowerCase().includes(q.toLowerCase()))
    );
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, cat, occ, saleOnly, maxPrice, sort]);

  const activeFilters: { label: string; clear: () => void }[] = [
    ...(q ? [{ label: `🔍 “${q}”`, clear: () => setQ("") }] : []),
    ...(occ !== "All" ? [{ label: `🎉 ${occ}`, clear: () => setOcc("All") }] : []),
    ...(cat !== "All" ? [{ label: `🛍️ ${cat}`, clear: () => setCat("All") }] : []),
    ...(saleOnly ? [{ label: "🏷️ Sale only", clear: () => setSaleOnly(false) }] : []),
    ...(maxPrice < 3500 ? [{ label: `💰 Under ${formatAED(maxPrice)}`, clear: () => setMaxPrice(3500) }] : []),
  ];
  const clearAll = () => { setQ(""); setCat("All"); setOcc("All"); setSaleOnly(false); setMaxPrice(3500); setSort("featured"); };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-4xl text-pine-900">Shop Balloons &amp; Decorations</h1>
      <p className="text-stone-600 mt-2">{filtered.length} of {PRODUCTS.length} products · Prices in AED · Same-day before 6 PM</p>

      {activeFilters.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl border border-pine-100 bg-white p-3 text-sm">
          <span className="font-semibold text-pine-900">Showing:</span>
          {activeFilters.map((f) => (
            <button key={f.label} onClick={f.clear} className="rounded-full bg-cream border border-pine-100 px-3 py-1 font-medium text-pine-800 hover:bg-pine-50" aria-label={`Clear filter ${f.label}`}>
              {f.label} ×
            </button>
          ))}
          <button onClick={clearAll} className="ml-auto text-sm font-semibold text-burgundy underline">Clear all</button>
        </div>
      )}

      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border bg-white p-4 h-fit space-y-4">
          <div>
            <label className="font-semibold text-sm" htmlFor="shop-search">🔍 Search</label>
            <input id="shop-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="mt-1 w-full rounded-full border px-4 py-2 text-sm outline-none" />
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="cat">🛍️ Category</label>
            <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="occ">🎉 Occasion</label>
            <select id="occ" value={occ} onChange={(e) => setOcc(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">{OCCASIONS.map((c) => <option key={c}>{c}</option>)}</select>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} className="accent-[#7a1e2b] h-4 w-4" />
            🏷️ Sale items only
          </label>
          <div>
            <label className="font-semibold text-sm" htmlFor="price">💰 Max price: {formatAED(maxPrice)}</label>
            <input id="price" type="range" min={15} max={3500} step={5} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-[#7a1e2b]" />
          </div>
          <div>
            <label className="font-semibold text-sm" htmlFor="sort">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className="mt-1 w-full rounded-full border px-3 py-2 text-sm bg-white">
              <option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name A–Z</option>
            </select>
          </div>
          <button onClick={clearAll} className="text-sm underline">Clear all filters</button>
        </aside>
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-white p-6 text-center">
              <p className="font-serif text-2xl text-pine-900">😕 No products match those filters</p>
              <p className="text-stone-600 mt-2 text-sm">Try clearing the search, raising the max price, or browsing a different occasion.</p>
              <button onClick={clearAll} className="mt-4 rounded-full bg-pine-800 text-white px-5 py-2 text-sm font-semibold">Clear all filters</button>
              <p className="mt-3 text-sm"><a href="/shop" className="text-pine-800 underline">Browse the full shop →</a></p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((p) => <ProductCard key={p.slug} p={p} />)}</div>
          )}
        </div>
      </div>
    </div>
  );
}
