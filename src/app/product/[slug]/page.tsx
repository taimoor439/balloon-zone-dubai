import { notFound } from "next/navigation";
import { PRODUCTS, formatAED } from "@/lib/products";
import Configurator from "./Configurator";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  return { title: p ? `${p.name} | Balloon Zone Dubai` : "Product | Balloon Zone Dubai", description: p?.blurb };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const related = PRODUCTS.filter((x) => x.slug !== p.slug && (x.occasion === p.occasion || x.category === p.category)).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="text-sm text-stone-500" aria-label="Breadcrumb"><a href="/">Home</a> · <a href="/shop">Shop</a> · {p.name}</nav>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl overflow-hidden bg-pine-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} className="w-full h-[420px] object-cover" />
        </div>
        <div>
          <p className="text-sm text-pine-600">{p.category} · {p.occasion}</p>
          <h1 className="font-serif text-4xl text-pine-900 mt-1">{p.name}</h1>
          <p className="mt-2 text-2xl font-bold text-pine-900">{formatAED(p.price)} {p.wasPrice && <s className="text-stone-400 text-lg font-normal">{formatAED(p.wasPrice)}</s>}</p>
          {!p.verified && <p className="mt-1 text-sm text-amber-700">Demo price — confirm at launch.</p>}
          <p className="mt-3 text-stone-700">{p.blurb}</p>
          <p className="mt-2 text-sm text-stone-600">In stock · Fully inflated · Delivered in Dubai · Same-day before 6 PM</p>
          <Configurator product={p} />
        </div>
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-2xl text-pine-900">Delivery &amp; balloon care</h2>
        <div className="mt-3 grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Delivery information</p><p className="text-stone-600 mt-1">Same-day delivery in Dubai for orders before 6 PM. Delivery slots 9 AM–12 PM, 12–3 PM, 3–6 PM and 6–9 PM. Flat Dubai delivery AED 29 in this demo — confirm at launch.</p></div>
          <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Balloon care &amp; float times</p><p className="text-stone-600 mt-1">Latex helium balloons typically last 8–12 hours; foil helium balloons can float for 3–5 days or longer, depending on size and conditions.</p></div>
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
