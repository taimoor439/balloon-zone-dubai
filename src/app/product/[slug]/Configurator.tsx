"use client";
import { useState } from "react";
import { AGES, COLOURS, EXTRAS, formatAED, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function Configurator({ product }: { product: Product }) {
  const { add } = useCart();
  const [colour, setColour] = useState(COLOURS[0].name);
  const [age, setAge] = useState<string | undefined>(undefined);
  const [extra, setExtra] = useState(EXTRAS[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const unit = product.price + extra.price;
  return (
    <div className="mt-6 space-y-5">
      <div>
        <p className="font-semibold text-sm">Choose your colour palette</p>
        <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Colour palette">
          {COLOURS.map((c) => (
            <button key={c.name} onClick={() => setColour(c.name)} title={c.name} aria-label={c.name} aria-pressed={colour === c.name} className={`h-9 w-9 rounded-full border-2 ${colour === c.name ? "border-pine-900 ring-2 ring-pine-600" : "border-white shadow"}`} style={{ background: c.hex }} />
          ))}
        </div>
        <p className="text-sm text-stone-600 mt-1">Selected: {colour} · Same as photo is the default.</p>
      </div>
      <div>
        <p className="font-semibold text-sm">Select the number / age <span className="text-stone-400 font-normal">(optional)</span></p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AGES.map((a) => (
            <button key={a} onClick={() => setAge(age === a ? undefined : a)} aria-pressed={age === a} className={`rounded-full border px-3 py-1.5 text-sm ${age === a ? "bg-pine-800 text-white border-pine-800" : "bg-white border-stone-300"}`}>{a}</button>
          ))}
        </div>
      </div>
      <div>
        <p className="font-semibold text-sm">Make it extra special — Party Extras</p>
        <p className="text-xs text-stone-500">Demo add-on pricing — confirm at launch.</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {EXTRAS.map((e) => (
            <button key={e.id} onClick={() => setExtra(e)} aria-pressed={extra.id === e.id} className={`rounded-xl border px-3 py-2 text-sm text-left ${extra.id === e.id ? "border-pine-800 bg-pine-50" : "bg-white"}`}>{e.label} <span className="font-semibold">+{formatAED(e.price)}</span></button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-full">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2" aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="px-3 py-2" aria-label="Increase quantity">+</button>
        </div>
        <p className="font-bold text-lg">{formatAED(unit * qty)}</p>
      </div>
      <button onClick={() => { add(product, { colour, age, extrasLabel: extra.label, extrasPrice: extra.price, qty }); setAdded(true); }} className="w-full rounded-full bg-pine-800 text-white py-3 font-semibold">Add to Cart — {formatAED(unit * qty)}</button>
      {added && <p className="text-sm text-green-700" role="status">Added to cart — open the cart (top right) to review or check out as a guest.</p>}
      <p className="text-xs text-stone-500">Delivered inflated · Ready to celebrate · Secure checkout (demo — no payment taken)</p>
    </div>
  );
}
