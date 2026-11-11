import Link from "next/link";
import { PRODUCTS, OCCASIONS, countByOccasion, formatAED } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export const metadata = {
  title: "Balloon Zone Dubai | Same Day Balloon Delivery, Decorations & Gifts",
  description: "Premium balloon delivery and decoration in Dubai. Same-day before 6 PM, fully inflated, with a delivery guarantee.",
};

const REVIEWS = [
  { name: "Ayesha K.", text: "The balloon decoration was stunning and made my child's birthday unforgettable. Delivered on time and perfectly arranged.", stars: 5 },
  { name: "Ahmed R.", text: "Impressed with the quality — the balloons lasted much longer than expected and looked beautiful throughout the event.", stars: 5 },
  { name: "Bilal H.", text: "The team helped me choose the perfect theme. Quick, professional and highly recommended.", stars: 5 },
  { name: "Christina", text: "Delivery was super quick and the setup team did an excellent job. Everything was ready before the event started.", stars: 4 },
];

export default function Home() {
  const bestsellers = PRODUCTS.slice(0, 8);
  const under500 = PRODUCTS.filter((p) => p.price < 500);
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-pine-900 text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=80" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold">Make every moment extra special</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight max-w-2xl mt-3">Balloon Delivery &amp; Balloon Decorations in Dubai</h1>
          <p className="mt-4 max-w-xl text-cream/85 text-lg">Luxury balloon decorations, bouquets, cakes and flowers — beautifully designed for birthdays, weddings, baby showers and special events across Dubai.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded-full bg-white text-pine-900 px-6 py-3 font-semibold">Shop Balloons</Link>
            <Link href="/shop?category=Decoration Packages" className="rounded-full border border-white/70 px-6 py-3 font-semibold">Book Decoration</Link>
          </div>
          <p className="mt-4 text-sm text-cream/75">Same-day delivery before 6 PM · Fully inflated on arrival · Delivery guarantee</p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="mx-auto max-w-7xl px-4 -mt-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white rounded-2xl shadow p-4 text-center">
          {[["Fully Inflated", "Arrives ready to enjoy — no setup needed."], ["Same-Day Delivery", "Order before 6 PM for same-day delivery in Dubai."], ["Premium Quality", "High-quality balloons with elegant finishes."], ["Delivery Guarantee", "Replacement or refund if damaged on arrival."]].map(([t, d]) => (
            <div key={t}><p className="font-serif font-semibold text-pine-900">{t}</p><p className="text-sm text-stone-600">{d}</p></div>
          ))}
        </div>
      </section>

      {/* Occasions */}
      <section className="mx-auto max-w-7xl px-4 mt-12">
        <h2 className="font-serif text-3xl text-pine-900">Shop by Occasion</h2>
        <p className="text-stone-600 mt-1">Clean categories — no duplicates, every tile shows how many products it holds.</p>
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {OCCASIONS.map((o) => {
            // Tile photo = the real photo of a product from this occasion
            // (products.ts). Never build a photo URL from the occasion
            // name — the old code doubled the "photo-" prefix and 404'd.
            const tile = PRODUCTS.find((p) => p.occasion === o.name);
            const emoji: Record<string, string> = { Birthday: "🎂", "Baby Shower": "🍼", Wedding: "💍", Proposal: "💍", Newborn: "👶", Graduation: "🎓", "New Year": "🎆", "National Day": "🇦🇪", "Valentine's Day": "❤️", "Mother's Day": "💐", "Women's Day": "🌸", "Thank You": "🙏" };
            return (
              <Link key={o.name} href={`/shop?occasion=${encodeURIComponent(o.name)}`} className="relative rounded-2xl overflow-hidden h-40 block group">
                {tile ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tile.image} alt={o.name} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
                    <span className="absolute inset-0 bg-gradient-to-t from-pine-950/80 to-transparent" />
                  </>
                ) : (
                  <span className="absolute inset-0 bg-gradient-to-br from-pine-800 to-burgundy flex items-center justify-center text-6xl" aria-hidden="true">{emoji[o.name] || "🎈"}</span>
                )}
                <span className="absolute bottom-3 left-3 text-white"><span className="font-serif text-lg block">{o.name}</span><span className="text-xs">{countByOccasion(o.name)} products</span></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bestsellers carousel (horizontal scroll) */}
      <section className="mx-auto max-w-7xl px-4 mt-12">
        <div className="flex items-end justify-between"><h2 className="font-serif text-3xl text-pine-900">Celebration Favourites</h2><Link href="/shop" className="text-pine-800 font-semibold underline">View all</Link></div>
        <div className="mt-5 flex gap-4 overflow-x-auto pb-2 snap-x">
          {bestsellers.map((p) => <div key={p.slug} className="min-w-[280px] snap-start"><ProductCard p={p} /></div>)}
        </div>
      </section>

      {/* Under 500 */}
      <section className="mx-auto max-w-7xl px-4 mt-12">
        <h2 className="font-serif text-3xl text-pine-900">Shop under AED 500</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {under500.slice(0, 4).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>

      {/* 3-step plan */}
      <section className="mx-auto max-w-7xl px-4 mt-12">
        <div className="rounded-2xl bg-pine-800 text-cream p-6 sm:p-8 grid sm:grid-cols-3 gap-6">
          {[["1. Choose your setup & budget", "Pick a package or build your own bouquet."], ["2. Share venue & date", "Tell us where and when — we confirm in minutes on WhatsApp."], ["3. We deliver & install", "Inflated, installed and ready before your guests arrive."]].map(([t, d]) => (
            <div key={t}><p className="font-serif text-xl">{t}</p><p className="text-cream/80 text-sm mt-1">{d}</p></div>
          ))}
        </div>
      </section>

      {/* Reviews — each shown once */}
      <section id="reviews" className="mx-auto max-w-7xl px-4 mt-12">
        <h2 className="font-serif text-3xl text-pine-900">What customers say</h2>
        <p className="text-sm text-stone-500 mt-1">Sample reviews shown once in this demo — real reviews will carry dates and verified-buyer labels at launch.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="rounded-2xl border bg-white p-4">
              <p className="text-gold">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</p>
              <p className="text-sm mt-2">{r.text}</p>
              <footer className="text-sm font-semibold text-pine-900 mt-3">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 mt-12 text-center">
        <p className="font-serif text-2xl text-pine-900">From AED 15 party supplies to AED 3,200 showpiece decorations.</p>
        <Link href="/shop" className="inline-block mt-4 rounded-full bg-pine-800 text-white px-6 py-3 font-semibold">Browse the full shop — {PRODUCTS.length} products</Link>
        <p className="text-xs text-stone-500 mt-2">Prices shown are verified live prices unless marked “Demo price”. Delivery from {formatAED(29)} (demo rate).</p>
      </section>
    </div>
  );
}
