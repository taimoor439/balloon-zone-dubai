"use client";
import { useState } from "react";
import { formatAED, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

/**
 * Quantity stepper + Add to Cart for the product page.
 * Base price × quantity only — no colour, age or extras options.
 */
export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center border rounded-full bg-white">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2" aria-label="Decrease quantity">−</button>
          <span className="w-8 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="px-3 py-2" aria-label="Increase quantity">+</button>
        </div>
        <p className="font-bold text-lg">{formatAED(product.price * qty)}</p>
      </div>
      <button onClick={() => { add(product, qty); setAdded(true); }} className="w-full rounded-full bg-pine-800 text-white py-3 font-semibold">Add to Cart — {formatAED(product.price * qty)}</button>
      {added && <p className="text-sm text-green-700" role="status">Added to cart — open the cart (top right) to review or check out as a guest.</p>}
      <p className="text-xs text-stone-500">Delivered inflated · Ready to celebrate · Secure checkout (demo — no payment taken)</p>
    </div>
  );
}
