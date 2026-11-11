"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { MENU_GROUPS } from "@/lib/menu";

const UTILITY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/faq", label: "Delivery" },
  { href: "/contact", label: "Contacts" },
  { href: "/faq", label: "FAQ" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/about", label: "Blog" },
];

export default function Header() {
  const { count, setOpen } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("Dubai");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-pine-100">
      {/* Promo bar */}
      <div className="bg-burgundy text-white text-center text-xs sm:text-sm font-semibold px-4 py-2">
        🎉 Take 15% Off Your First Order — Limited Time Offer.
      </div>

      {/* Utility row */}
      <div className="hidden sm:block border-b border-pine-100 bg-cream/60">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex items-center justify-between gap-3 text-xs text-pine-800">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold">📍 Dubai</span>
            {UTILITY_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-burgundy">{l.label}</Link>
            ))}
          </div>
          <span className="whitespace-nowrap font-medium">🚚 Today delivery before 6 PM</span>
        </div>
      </div>

      {/* Main header row */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <button
          className="lg:hidden rounded-full border border-pine-100 px-3 py-2 text-pine-800 font-semibold"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          ☰
        </button>
        <Link href="/" className="shrink-0">
          <span className="font-serif text-xl sm:text-2xl font-bold text-pine-900">
            🎈 Balloon Zone <span className="text-burgundy">Dubai</span>
          </span>
          <span className="block text-[10px] tracking-[0.25em] uppercase text-pine-600">Balloons · Decor · Gifts</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-auto">
          <label className="flex items-center gap-1 rounded-full border border-pine-100 bg-cream px-3 py-2 text-sm whitespace-nowrap">
            Deliver to
            <select value={city} onChange={(e) => setCity(e.target.value)} className="bg-transparent font-semibold outline-none" aria-label="Deliver to city">
              <option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option>
            </select>
          </label>
          <form className="flex-1 flex" onSubmit={submitSearch}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search decorations & gifts  (Ctrl+K)" className="w-full rounded-l-full border border-pine-100 bg-cream px-4 py-2 text-sm outline-none focus:border-pine-600" aria-label="Search products" />
            <button className="rounded-r-full bg-pine-800 text-white px-4 text-sm font-semibold" type="submit">Search</button>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-green-600 text-white px-3 py-2 text-sm font-semibold" aria-label="Order on WhatsApp">
            💬 +971 55 682 1424
          </a>
          <a href="https://instagram.com/balloonzonedubai" target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1 rounded-full border border-pine-100 px-3 py-2 text-sm font-semibold text-pine-800" aria-label="Balloon Zone Dubai on Instagram">
            📸 @balloonzonedubai
          </a>
          <Link href="/contact" className="hidden xl:inline text-sm font-medium text-pine-800">Contact</Link>
          <button onClick={() => setOpen(true)} className="relative rounded-full bg-pine-800 text-white px-4 py-2 text-sm font-semibold" aria-label="Open cart">
            🛒 Cart · {count}
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="md:hidden px-4 pb-3">
        <form className="flex" onSubmit={submitSearch}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search decorations & gifts…" className="w-full rounded-l-full border border-pine-100 bg-cream px-4 py-2 text-sm outline-none" aria-label="Search products" />
          <button className="rounded-r-full bg-pine-800 text-white px-4 text-sm font-semibold" type="submit">Search</button>
        </form>
      </div>

      {/* Mega-menu nav — desktop */}
      <nav className="hidden lg:block border-t border-pine-100 bg-cream/70" aria-label="Main navigation">
        <div className="mx-auto max-w-7xl px-4 flex items-center gap-1 text-sm font-medium text-pine-800">
          <Link href="/" className="whitespace-nowrap px-2 py-2.5 hover:text-burgundy">🏠 Home</Link>
          {MENU_GROUPS.map((g) =>
            g.items.length === 0 ? (
              <Link key={g.label} href={g.href} className="whitespace-nowrap px-2 py-2.5 font-bold text-burgundy hover:underline">
                {g.emoji} {g.label}
              </Link>
            ) : (
              <div key={g.label} className="relative group">
                <Link href={g.href} className="whitespace-nowrap px-2 py-2.5 flex items-center gap-1 hover:text-burgundy">
                  {g.emoji} {g.label} <span className="text-xs">▾</span>
                </Link>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 focus-within:visible focus-within:opacity-100 absolute left-0 top-full pt-1 transition z-50">
                  <div className="w-72 rounded-2xl border border-pine-100 bg-white shadow-xl p-2">
                    {g.items.map((item) => (
                      <Link key={item.label} href={item.href} className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-cream text-pine-800">
                        <span className="w-6 text-center">{item.emoji}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}
          <Link href="/about" className="whitespace-nowrap px-2 py-2.5 hover:text-burgundy">About</Link>
          <Link href="/faq" className="whitespace-nowrap px-2 py-2.5 hover:text-burgundy">FAQ</Link>
        </div>
      </nav>

      {/* Mobile menu — tap to open groups */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-pine-100 bg-white max-h-[70vh] overflow-y-auto" aria-label="Mobile navigation">
          <div className="px-4 py-2 text-xs text-pine-800 flex flex-wrap gap-x-3 gap-y-1">
            <span className="font-semibold">📍 Dubai</span>
            {UTILITY_LINKS.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="hover:text-burgundy">{l.label}</Link>
            ))}
            <span className="font-medium">🚚 Today delivery before 6 PM</span>
          </div>
          <div className="px-4 pb-2 flex gap-2">
            <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="flex-1 text-center rounded-full bg-green-600 text-white px-3 py-2 text-sm font-semibold">💬 WhatsApp +971 55 682 1424</a>
            <a href="https://instagram.com/balloonzonedubai" target="_blank" rel="noreferrer" className="flex-1 text-center rounded-full border border-pine-100 px-3 py-2 text-sm font-semibold text-pine-800">📸 @balloonzonedubai</a>
          </div>
          <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 font-medium text-pine-800 border-t border-pine-100">🏠 Home</Link>
          {MENU_GROUPS.map((g) => (
            <div key={g.label} className="border-t border-pine-100">
              {g.items.length === 0 ? (
                <Link href={g.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 font-bold text-burgundy">
                  {g.emoji} {g.label}
                </Link>
              ) : (
                <>
                  <button
                    className="w-full flex items-center justify-between px-4 py-2.5 font-medium text-pine-800"
                    onClick={() => setOpenGroup(openGroup === g.label ? null : g.label)}
                    aria-expanded={openGroup === g.label}
                  >
                    <span>{g.emoji} {g.label}</span>
                    <span className="text-xs">{openGroup === g.label ? "▴" : "▾"}</span>
                  </button>
                  {openGroup === g.label && (
                    <div className="bg-cream/70 px-2 pb-2">
                      {g.items.map((item) => (
                        <Link key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-pine-800 hover:bg-white">
                          <span className="w-6 text-center">{item.emoji}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 font-medium text-pine-800 border-t border-pine-100">About</Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 font-medium text-pine-800 border-t border-pine-100">FAQ</Link>
        </nav>
      )}
    </header>
  );
}
