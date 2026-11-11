// Client-side product view: renders the server-prerendered base product,
// then swaps in the merged catalogue version (admin overrides from
// localStorage) on mount, so admin edits show on the detail page too.
"use client";
import { formatAED, type Product } from "@/lib/products";
import { useMergedProducts } from "@/lib/catalog";
import AddToCart from "./AddToCart";
import ProductCard from "@/components/ProductCard";

// Second badge per category: "Fully inflated" is a balloon attribute, so
// flowers, cakes and party supplies get their own quality badge instead.
const QUALITY_BADGE: Record<string, string> = {
  "Flowers": "🌹 Freshly cut & arranged",
  "Cakes & Sweets": "🎂 Baked fresh to order",
  "Party Supplies": "🎉 Ready to party",
};
const qualityBadge = (category: string) => QUALITY_BADGE[category] ?? "🎈 Fully inflated";

// "Why Choose Balloon Zone Dubai?" is written per category for the same
// reason — flowers are arranged, cakes are baked, party supplies are packed,
// only balloon/decoration orders are prepared with balloons and delivered
// fully inflated. No new delivery promises: same-day before 6 PM only.
const WHY_CHOOSE: Record<string, string> = {
  "Flowers": "Balloon Zone Dubai is the trusted name for flowers, balloons and decoration across the city. Every flower order is prepared with premium fresh flowers, hand-arranged by our team and delivered fresh and on time — same-day in Dubai for orders placed before 6 PM. Every order is backed by our delivery guarantee, so your celebration looks perfect from the first photo to the last guest.",
  "Cakes & Sweets": "Balloon Zone Dubai is the trusted name for cakes, balloons and decoration across the city. Every cake is baked fresh to order and delivered on time — same-day in Dubai for orders placed before 6 PM. Every order is backed by our delivery guarantee, so your celebration tastes as good as it looks, from the first slice to the last guest.",
  "Party Supplies": "Balloon Zone Dubai is the trusted name for party supplies, balloons and decoration across the city. Every order is packed with quality party supplies and delivered on time — same-day in Dubai for orders placed before 6 PM. Every order is backed by our delivery guarantee, so your party is ready from the first guest to the last.",
};
const whyChoose = (category: string) =>
  WHY_CHOOSE[category] ?? "Balloon Zone Dubai is the trusted name in balloons and decoration across the city. Every order is prepared with premium-quality balloons, delivered fully inflated and on time — same-day in Dubai for orders placed before 6 PM. Our professional setup team installs larger displays at your home, hotel or venue, and every order is backed by our delivery guarantee, so your celebration looks perfect from the first photo to the last guest.";

// "Delivery & balloon care" is balloon-specific too: latex/foil float times
// mean nothing for flowers or cakes, so the section is renamed and rewritten
// per category. The delivery-information card is the same for all.
const CARE: Record<string, { heading: string; tipTitle: string; tip: string }> = {
  "Flowers": { heading: "Delivery & flower care", tipTitle: "Flower care", tip: "Keep flowers cool and out of direct sunlight. Trim the stems and change the water every day to keep them fresh for longer." },
  "Cakes & Sweets": { heading: "Delivery & cake care", tipTitle: "Cake care", tip: "Keep refrigerated until serving and enjoy within 24–48 hours. Handle with care and keep out of heat and direct sunlight." },
  "Party Supplies": { heading: "Delivery & party tips", tipTitle: "Party tips", tip: "Check all contents on arrival. Keep supplies away from heat and sharp objects, and store flat-packed items in a cool, dry place." },
};
const care = (category: string) =>
  CARE[category] ?? { heading: "Delivery & balloon care", tipTitle: "Balloon care & float times", tip: "Latex helium balloons typically last 8–12 hours; foil helium balloons can float for 3–5 days or longer, depending on size and conditions." };

export default function ProductView({ product }: { product: Product }) {
  const products = useMergedProducts();
  const p = products.find((x) => x.slug === product.slug) ?? product;
  const related = products.filter((x) => x.slug !== p.slug && (x.occasion === p.occasion || x.category === p.category)).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-stone-500" aria-label="Breadcrumb"><a href="/">Home</a> · <a href="/shop">Shop</a> · {p.name}</nav>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        {/* Image panel: fixed 4:3 aspect, image fills it fully. The old
            version stretched a tall dark-green panel to the height of the
            right column while the image was only 420px tall, leaving a
            large empty block below the photo. */}
        <div className="rounded-2xl overflow-hidden bg-pine-100 aspect-[4/3] self-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-sm text-pine-600">{p.category} · {p.occasion}</p>
          <h1 className="font-serif text-4xl text-pine-900 mt-1">{p.name}</h1>
          <p className="mt-2 text-2xl font-bold text-pine-900">{formatAED(p.price)} {p.wasPrice && <s className="text-stone-400 text-lg font-normal">{formatAED(p.wasPrice)}</s>}</p>
          {!p.verified && <p className="mt-1 text-sm text-amber-700">Demo price — confirm at launch.</p>}
          <p className="mt-3 text-stone-700">{p.blurb}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {["✅ In stock", qualityBadge(p.category), "🚚 Delivered in Dubai", "⏰ Same-day before 6 PM"].map((b) => (
              <span key={b} className="rounded-full bg-white border border-pine-100 px-3 py-1 font-medium text-pine-800">{b}</span>
            ))}
          </div>
          <AddToCart product={p} />
        </div>
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-pine-900">Product Description</h2>
        {p.description.map((para, i) => (
          <p key={i} className="mt-3 text-stone-700 leading-relaxed">{para}</p>
        ))}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-5">
            <h3 className="font-serif text-xl text-pine-900">Suitable For</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              {p.suitableFor.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-pine-700 font-bold">✓</span>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border-2 border-pine-800 bg-cream p-5">
            <h3 className="font-serif text-xl text-pine-900">✨ Package Includes</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              {p.includes.map((s) => (
                <li key={s} className="flex gap-2"><span className="text-pine-700 font-bold">✓</span>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="font-serif text-xl text-pine-900">Why Choose Balloon Zone Dubai?</h3>
          <p className="mt-2 text-stone-700 leading-relaxed">{whyChoose(p.category)}</p>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-pine-900">{care(p.category).heading}</h2>
        <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Delivery information</p><p className="text-stone-600 mt-1">Same-day delivery in Dubai for orders before 6 PM. Delivery slots 9 AM–12 PM, 12–3 PM, 3–6 PM and 6–9 PM. Flat Dubai delivery AED 29 in this demo — confirm at launch.</p></div>
          <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">{care(p.category).tipTitle}</p><p className="text-stone-600 mt-1">{care(p.category).tip}</p></div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-serif text-2xl text-pine-900">More to celebrate</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
        </section>
      )}
    </div>
  );
}
