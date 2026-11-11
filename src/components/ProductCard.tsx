"use client";
import Link from "next/link";
import { formatAED, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="rounded-2xl border border-pine-100 bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition">
      <Link href={`/product/${p.slug}`} className="block bg-pine-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={p.name} className="h-52 w-full object-cover" loading="lazy" />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex gap-2 text-xs">
          {p.badge && <span className="rounded-full bg-burgundy text-white px-2 py-0.5">{p.badge}</span>}
          <span className="text-pine-600">{p.category}</span>
        </div>
        <Link href={`/product/${p.slug}`} className="font-serif text-lg leading-snug text-pine-900">{p.name}</Link>
        <p className="text-sm text-stone-600 flex-1">{p.blurb}</p>
        <p className="font-semibold text-pine-900">
          {formatAED(p.price)}{" "}
          {p.wasPrice && <s className="text-stone-400 font-normal">{formatAED(p.wasPrice)}</s>}
        </p>
        {!p.verified && <p className="text-xs text-amber-700">Demo price — confirm at launch.</p>}
        <div className="flex gap-2">
          <button onClick={() => add(p)} className="flex-1 rounded-full bg-pine-800 text-white py-2 text-sm font-semibold">Add to Cart</button>
          <Link href={`/product/${p.slug}`} className="rounded-full border border-pine-800 text-pine-800 px-3 py-2 text-sm font-semibold">Details</Link>
        </div>
      </div>
    </article>
  );
}
