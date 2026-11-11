"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/shop?occasion=Birthday", label: "Birthday" },
  { href: "/shop?occasion=Baby Shower", label: "Baby Shower" },
  { href: "/shop?occasion=Wedding", label: "Wedding" },
  { href: "/shop?category=Balloon Arches", label: "Arches" },
  { href: "/shop?category=Cakes & Sweets", label: "Cakes" },
  { href: "/shop", label: "All Balloons" },
];

export default function Header() {
  const { count, setOpen } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Dubai");
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-pine-100">
      <div className="bg-pine-900 text-cream text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between gap-3">
          <span>Order before 6 PM for same-day delivery in Dubai</span>
          <span className="hidden sm:inline">WhatsApp +971 55 682 1424</span>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="shrink-0">
          <span className="font-serif text-xl sm:text-2xl font-bold text-pine-900">Balloon Zone <span className="text-burgundy">Dubai</span></span>
          <span className="block text-[10px] tracking-[0.25em] uppercase text-pine-600">Balloons · Decor · Gifts</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-auto">
          <label className="flex items-center gap-1 rounded-full border border-pine-100 bg-cream px-3 py-2 text-sm whitespace-nowrap">
            Deliver to
            <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent font-semibold outline-none" aria-label="Deliver to city">
              <option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option>
            </select>
          </label>
          <form className="flex-1 flex" onSubmit={(e) => { e.preventDefault(); router.push(`/shop?q=${encodeURIComponent(q)}`); }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search decorations & gifts  (Ctrl+K)" className="w-full rounded-l-full border border-pine-100 bg-cream px-4 py-2 text-sm outline-none focus:border-pine-600" aria-label="Search products" />
            <button className="rounded-r-full bg-pine-800 text-white px-4 text-sm font-semibold" type="submit">Search</button>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/contact" className="hidden lg:inline text-sm font-medium text-pine-800">Contact</Link>
          <button onClick={() => setOpen(true)} className="relative rounded-full bg-pine-800 text-white px-4 py-2 text-sm font-semibold" aria-label="Open cart">
            Cart · {count}
          </button>
        </div>
      </div>
      <nav className="border-t border-pine-100 bg-cream/70" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 py-2 flex gap-4 overflow-x-auto text-sm font-medium text-pine-800">
          <Link href="/" className="whitespace-nowrap">Home</Link>
          {NAV.map((n) => <Link key={n.label} href={n.href} className="whitespace-nowrap">{n.label}</Link>)}
          <Link href="/about" className="whitespace-nowrap">About</Link>
          <Link href="/faq" className="whitespace-nowrap">FAQ</Link>
        </div>
      </nav>
    </header>
  );
}
