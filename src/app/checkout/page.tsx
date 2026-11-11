"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatAED } from "@/lib/products";

const DELIVERY = 29;

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("3:00 PM – 6:00 PM");
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState("");

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="font-serif text-4xl text-pine-900">Thank you, {name || "friend"}!</p>
        <p className="mt-3 text-lg">Your demo order <strong>{done}</strong> is confirmed (demo only — no payment was taken and no real order was placed).</p>
        <p className="mt-2 text-stone-600">Delivery: {date || "soon"} · {slot} · {address || "Dubai"}. We will confirm on WhatsApp at {phone || "+971 55 682 1424"}.</p>
        <Link href="/shop" className="inline-block mt-6 rounded-full bg-pine-800 text-white px-6 py-3 font-semibold">Continue shopping</Link>
      </div>
    );
  }
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-serif text-4xl text-pine-900">Checkout</h1>
        <p className="mt-3 text-stone-600">Your cart is empty.</p>
        <Link href="/shop" className="inline-block mt-6 rounded-full bg-pine-800 text-white px-6 py-3 font-semibold">Browse the shop</Link>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="font-serif text-4xl text-pine-900">Guest Checkout</h1>
      <p className="text-stone-600 mt-2">No sign-in required. Demo only — no payment is taken and no real order is placed.</p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <form className="rounded-2xl border bg-white p-6 space-y-4" onSubmit={(e) => { e.preventDefault(); if (!name || !phone || !address || !date) { setError("Please fill in name, phone, delivery address and date."); return; } setDone(`BZD-DEMO-${Math.floor(1000 + Math.random() * 9000)}`); clear(); }}>
          {error && <p className="text-burgundy text-sm" role="alert">{error}</p>}
          <div><label className="text-sm font-semibold" htmlFor="name">Full name</label><input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2" placeholder="Your name" /></div>
          <div><label className="text-sm font-semibold" htmlFor="phone">Phone / WhatsApp</label><input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2" placeholder="+971 …" /></div>
          <div><label className="text-sm font-semibold" htmlFor="address">Delivery address</label><input id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2" placeholder="Street, area, Dubai" /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="text-sm font-semibold" htmlFor="date">Delivery date</label><input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2" /></div>
            <div><label className="text-sm font-semibold" htmlFor="slot">Delivery slot</label><select id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 bg-white"><option>9:00 AM – 12:00 PM</option><option>12:00 PM – 3:00 PM</option><option>3:00 PM – 6:00 PM</option><option>6:00 PM – 9:00 PM</option></select></div>
          </div>
          <button type="submit" className="w-full rounded-full bg-pine-800 text-white py-3 font-semibold">Place Demo Order — {formatAED(subtotal + DELIVERY)}</button>
          <p className="text-xs text-stone-500">By placing this demo order you agree to the delivery guarantee: replacement or refund if damaged on arrival.</p>
        </form>
        <aside className="rounded-2xl border bg-white p-6 h-fit">
          <h2 className="font-serif text-xl text-pine-900">Order summary</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {lines.map((l) => <li key={`${l.slug}-${l.colour}`} className="flex justify-between gap-2"><span>{l.qty} × {l.name}</span><span className="font-semibold">{formatAED((l.price + (l.extrasPrice || 0)) * l.qty)}</span></li>)}
          </ul>
          <p className="flex justify-between text-sm mt-4"><span>Subtotal</span><span>{formatAED(subtotal)}</span></p>
          <p className="flex justify-between text-sm"><span>Delivery (Dubai, flat — demo rate)</span><span>{formatAED(DELIVERY)}</span></p>
          <p className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>{formatAED(subtotal + DELIVERY)}</span></p>
        </aside>
      </div>
    </div>
  );
}
