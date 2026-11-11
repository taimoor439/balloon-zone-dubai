"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { MENU_GROUPS } from "@/lib/menu";
import CallbackButton from "@/components/CallbackButton";
import Modal from "@/components/Modal";

const UTILITY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contacts" },
  { href: "/faq", label: "FAQ" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/blog", label: "Blog" },
];

// "View all" label: drop a leading "All " so "All Balloon Types" reads
// "View all Balloon Types →" instead of "View all All Balloon Types →".
// The group itself keeps its full name everywhere else.
const viewAllLabel = (label: string) => label.replace(/^All /, "");

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { count, setOpen } = useCart();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null); // mobile accordions
  const [activeGroup, setActiveGroup] = useState<string | null>(null); // desktop dropdown panel
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoEmail, setPromoEmail] = useState("");
  const [promoClaimed, setPromoClaimed] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navAreaRef = useRef<HTMLDivElement>(null);
  // Hide the promo bar + utility row once the user scrolls down, so the
  // sticky header shrinks to just the main row + nav slider. Both rows
  // reappear at the top of the page. The collapse is a max-height /
  // opacity transition so the page does not jump.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Dropdown closes on Escape, on page scroll, and on a click outside the
  // nav area (mouse-leave of the header area is handled on the wrapper).
  useEffect(() => {
    if (!activeGroup) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveGroup(null); };
    const onScroll = () => setActiveGroup(null);
    const onDown = (e: MouseEvent) => {
      if (navAreaRef.current && !navAreaRef.current.contains(e.target as Node)) setActiveGroup(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [activeGroup]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(q.trim() ? `/shop?q=${encodeURIComponent(q.trim())}` : "/shop");
    setMobileOpen(false);
  };

  const scrollNav = (dir: 1 | -1) => {
    navRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  const closePromo = () => { setPromoOpen(false); setPromoClaimed(false); };
  const active = MENU_GROUPS.find((g) => g.label === activeGroup) ?? null;

  // The admin area has its own sidebar layout — no public header there.
  // (Checked here, after all hooks, so hook order never changes.)
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-pine-100">
      {/* Top rows — collapse away on scroll, reappear at the top. The
          promo popup is a portal (Modal.tsx), so hiding these rows never
          traps it. */}
      <div className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-24 opacity-100"}`}>
      {/* Promo bar — clickable, opens the 15% off popup */}
      <button
        type="button"
        onClick={() => setPromoOpen(true)}
        className="block w-full bg-burgundy text-white text-center text-xs sm:text-sm font-semibold px-4 py-2 hover:bg-[#5f1622] transition"
        aria-label="Take 15% off your first order — tap to claim"
      >
        🎉 Take 15% Off Your First Order — Limited Time Offer. <span className="underline underline-offset-2">Claim now →</span>
      </button>

      {/* Promo popup — rendered through a portal (see Modal.tsx) so the
          sticky header's backdrop-blur can't trap it inside the header. */}
      <Modal open={promoOpen} onClose={closePromo} label="Get 15% off your first order" dialogClassName="text-center">
        {promoClaimed ? (
          <div className="py-4">
            <p className="text-4xl">🎉</p>
            <p className="font-serif text-2xl text-pine-900 mt-2">Your code BZD15 is on its way (demo)</p>
            <p className="text-stone-600 mt-2 text-sm">Use code <strong className="text-pine-900">BZD15</strong> at checkout for 15% off your first order. No email was actually sent — this is a demo.</p>
            <button onClick={closePromo} className="mt-5 rounded-full bg-pine-800 text-white px-6 py-2.5 text-sm font-semibold">Start shopping</button>
          </div>
        ) : (
          <>
            <p className="text-4xl">🎉</p>
            <p className="font-serif text-2xl text-pine-900 mt-2">Get 15% Off Your First Order</p>
            <p className="text-sm text-stone-600 mt-1">Join the party list and we&apos;ll send your 15% off code — plus party ideas, new arrivals and subscriber-only offers.</p>
            <form
              className="mt-4"
              onSubmit={(e) => { e.preventDefault(); if (promoEmail.trim()) setPromoClaimed(true); }}
            >
              <input
                type="email"
                required
                value={promoEmail}
                onChange={(e) => setPromoEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full rounded-full border border-pine-100 bg-cream px-4 py-3 text-sm outline-none focus:border-pine-600"
              />
              <button type="submit" className="mt-3 w-full rounded-full bg-burgundy text-white py-3 font-semibold">Claim 15% Off</button>
              <p className="text-xs text-stone-500 mt-2">Demo only — no email is sent and no code is redeemed.</p>
            </form>
          </>
        )}
      </Modal>

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
      </div>{/* end collapsible top rows */}

      {/* Main header row — shrinks without forcing page overflow:
          search is flex-1 min-w-0, WhatsApp/Instagram collapse to icons
          on narrower screens, paddings are tight. */}
      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          className="lg:hidden shrink-0 rounded-full border border-pine-100 px-3 py-2 text-pine-800 font-semibold"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          ☰
        </button>
        <Link href="/" className="shrink-0">
          <span className="font-serif text-xl sm:text-2xl font-bold text-pine-900 whitespace-nowrap">
            🎈 Balloon Zone <span className="text-burgundy">Dubai</span>
          </span>
          <span className="block text-[10px] tracking-[0.25em] uppercase text-pine-600">Balloons · Decor · Gifts</span>
        </Link>
        <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 max-w-xl mx-auto">
          <form className="flex-1 flex min-w-0" onSubmit={submitSearch}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search decorations & gifts  (Ctrl+K)" className="w-full min-w-0 rounded-l-full border border-pine-100 bg-cream px-4 py-2 text-sm outline-none focus:border-pine-600" aria-label="Search products" />
            <button className="shrink-0 rounded-r-full bg-pine-800 text-white px-4 text-sm font-semibold" type="submit">Search</button>
          </form>
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-1 rounded-full bg-green-600 text-white px-3 py-2 text-sm font-semibold" aria-label="Order on WhatsApp">
            💬 <span className="hidden lg:inline">+971 55 682 1424</span>
          </a>
          <a href="https://instagram.com/balloonzonedubai" target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-1 rounded-full border border-pine-100 px-3 py-2 text-sm font-semibold text-pine-800" aria-label="Balloon Zone Dubai on Instagram">
            📸 <span className="hidden xl:inline">@balloonzonedubai</span>
          </a>
          <CallbackButton className="hidden lg:inline-flex items-center gap-1 rounded-full border border-pine-800 text-pine-800 px-3 py-2 text-sm font-semibold hover:bg-pine-800 hover:text-white transition whitespace-nowrap" />
          <button onClick={() => setOpen(true)} className="relative shrink-0 rounded-full bg-pine-800 text-white px-4 py-2 text-sm font-semibold" aria-label="Open cart">
            🛒 Cart · {count}
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      <div className="md:hidden px-4 pb-3">
        <form className="flex" onSubmit={submitSearch}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search decorations & gifts…" className="w-full min-w-0 rounded-l-full border border-pine-100 bg-cream px-4 py-2 text-sm outline-none" aria-label="Search products" />
          <button className="shrink-0 rounded-r-full bg-pine-800 text-white px-4 text-sm font-semibold" type="submit">Search</button>
        </form>
      </div>

      {/* Mega-menu nav — desktop: horizontally scrollable slider.
          The dropdown is a full-width panel BELOW this row (a sibling
          of the scrolling container), so it is never clipped by
          overflow-x. */}
      <div ref={navAreaRef} className="hidden lg:block border-t border-pine-100 bg-cream/70 relative" onMouseLeave={() => setActiveGroup(null)}>
        <div className="relative mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => scrollNav(-1)}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white border border-pine-100 shadow px-2 py-1 text-pine-800"
            aria-label="Scroll menu left"
          >
            ‹
          </button>
          <div ref={navRef} className="no-scrollbar flex flex-nowrap items-center gap-1 overflow-x-auto px-9 text-sm font-medium text-pine-800" role="navigation" aria-label="Main navigation">
            {MENU_GROUPS.map((g) =>
              g.items.length === 0 ? (
                <Link key={g.label} href={g.href} className="shrink-0 whitespace-nowrap px-2 py-2.5 font-bold text-burgundy hover:underline">
                  {g.emoji} {g.label}
                </Link>
              ) : (
                <button
                  key={g.label}
                  type="button"
                  onMouseEnter={() => setActiveGroup(g.label)}
                  onFocus={() => setActiveGroup(g.label)}
                  // Open idempotently — do NOT toggle. Hover and focus
                  // already open the panel before the click fires, so a
                  // toggling click closed it again on the first click (and
                  // only the second click, with no fresh hover/focus, opened
                  // it). Closing stays on mouse-leave, scroll, Escape,
                  // click-outside and the × button.
                  onClick={() => setActiveGroup(g.label)}
                  aria-expanded={activeGroup === g.label}
                  className={`shrink-0 whitespace-nowrap px-2 py-2.5 flex items-center gap-1 hover:text-burgundy ${activeGroup === g.label ? "text-burgundy" : ""}`}
                >
                  {g.emoji} {g.label} <span className="text-xs">{activeGroup === g.label ? "▴" : "▾"}</span>
                </button>
              )
            )}
          </div>
          <button
            type="button"
            onClick={() => scrollNav(1)}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white border border-pine-100 shadow px-2 py-1 text-pine-800"
            aria-label="Scroll menu right"
          >
            ›
          </button>
        </div>
        {active && (
          <div className="absolute left-1/2 top-full z-50 w-[min(92vw,880px)] -translate-x-1/2 rounded-2xl border border-pine-100 bg-white shadow-2xl overflow-hidden">
            {/* Dark-green header strip */}
            <div className="flex items-center justify-between gap-3 bg-pine-800 px-5 py-3">
              <p className="font-serif text-lg text-white">{active.emoji} {active.label}</p>
              <div className="flex items-center gap-3">
                <Link href={active.href} onClick={() => setActiveGroup(null)} className="text-sm font-semibold text-cream hover:underline whitespace-nowrap">
                  View all {viewAllLabel(active.label)} →
                </Link>
                <button onClick={() => setActiveGroup(null)} className="text-2xl leading-none text-cream/80 hover:text-white" aria-label="Close menu">×</button>
              </div>
            </div>
            {/* Items — tight 3-column grid, no empty space */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1 p-3">
              {active.items.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setActiveGroup(null)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-cream text-pine-800">
                  <span className="w-6 text-center">{item.emoji}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            {/* Promo strip — opens the 15% off popup */}
            <button
              type="button"
              onClick={() => { setActiveGroup(null); setPromoOpen(true); }}
              className="block w-full border-t border-pine-100 bg-burgundy/5 px-5 py-3 text-center text-sm font-semibold text-burgundy hover:bg-burgundy/10 transition"
            >
              🎉 Take 15% Off Your First Order — Claim now →
            </button>
          </div>
        )}
      </div>

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
          <div className="px-4 pb-2">
            <CallbackButton className="block w-full text-center rounded-full border border-pine-800 text-pine-800 px-3 py-2 text-sm font-semibold" />
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
                      <Link href={g.href} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-semibold text-burgundy hover:bg-white">
                        View all {viewAllLabel(g.label)} →
                      </Link>
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
