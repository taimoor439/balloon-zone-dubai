"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatAED } from "@/lib/products";

const DELIVERY = 29; // Flat Dubai delivery, modelled on The Sky Balloons (AED 29). Demo rate — confirm at launch.

export default function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, subtotal, count } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <h2 className="font-serif text-xl text-pine-900">Your Cart ({count})</h2>
          <button onClick={() => setOpen(false)} className="text-2xl" aria-label="Close cart">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {lines.length === 0 && <p className="text-stone-600">Your cart is empty. Add a balloon bouquet or decoration package to get started.</p>}
          {lines.map((l) => (
            <div key={`${l.slug}-${l.colour}-${l.age}-${l.extrasLabel}`} className="flex gap-3 border rounded-xl p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} alt={l.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-pine-900 text-sm">{l.name}</p>
                <p className="text-xs text-stone-500">{[l.colour, l.age ? `Age ${l.age}` : "", l.extrasLabel].filter(Boolean).join(" · ")}</p>
                <p className="text-sm font-semibold mt-1">{formatAED((l.price + (l.extrasPrice || 0)) * l.qty)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => setQty(l.slug, l.colour, l.age, l.qty - 1)} className="border rounded-full w-7 h-7" aria-label="Decrease quantity">−</button>
                  <span>{l.qty}</span>
                  <button onClick={() => setQty(l.slug, l.colour, l.age, l.qty + 1)} className="border rounded-full w-7 h-7" aria-label="Increase quantity">+</button>
                  <button onClick={() => remove(l.slug, l.colour, l.age)} className="ml-auto text-xs text-burgundy underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="border-t px-5 py-4 space-y-2 text-sm">
            <p className="flex justify-between"><span>Subtotal</span><span className="font-semibold">{formatAED(subtotal)}</span></p>
            <p className="flex justify-between"><span>Delivery (Dubai, flat — demo rate)</span><span>{formatAED(DELIVERY)}</span></p>
            <p className="flex justify-between font-bold text-base"><span>Total</span><span>{formatAED(subtotal + DELIVERY)}</span></p>
            <p className="text-xs text-stone-500">Free-delivery progress: add {formatAED(Math.max(0, 500 - subtotal))} more for free delivery over AED 500 (demo offer).</p>
            <Link href="/checkout" onClick={() => setOpen(false)} className="block text-center rounded-full bg-pine-800 text-white py-3 font-semibold">Guest Checkout — no sign-in</Link>
            <button onClick={() => setOpen(false)} className="w-full text-center text-sm underline">Continue shopping</button>
          </div>
        )}
      </aside>
    </div>
  );
}
