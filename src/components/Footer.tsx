"use client";
import Link from "next/link";
import { useState } from "react";
import { MENU_GROUPS } from "@/lib/menu";
import CallbackButton from "@/components/CallbackButton";

const HELP_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/checkout", label: "Guest Checkout — no sign-in required" },
  { href: "/delivery", label: "Delivery" },
  { href: "/#reviews", label: "Reviews" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="bg-pine-950 text-cream/85 mt-16">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <p className="font-serif text-2xl text-white">🎈 Get 15% off your first order</p>
            <p className="text-sm mt-1">Party ideas, new arrivals and offers — straight to your inbox. No spam.</p>
          </div>
          {subscribed ? (
            <p className="rounded-full bg-white/10 text-white px-5 py-3 text-sm font-semibold">🎉 Thanks for subscribing (demo) — see you at the party!</p>
          ) : (
            <form
              className="flex w-full sm:w-auto"
              onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="w-full sm:w-72 rounded-l-full bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-cream/50 outline-none"
              />
              <button className="rounded-r-full bg-burgundy text-white px-5 text-sm font-semibold whitespace-nowrap" type="submit">Subscribe</button>
            </form>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-bold text-white">🎈 Balloon Zone <span className="text-gold">Dubai</span></p>
          <p className="mt-2 text-sm">Same-day balloon delivery and decoration in Dubai — birthdays, weddings, baby showers and every celebration. Make every moment magical. ✨</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <a href="https://instagram.com/balloonzonedubai" target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20">📸 Instagram</a>
            <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="rounded-full bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500">💬 WhatsApp</a>
          </div>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">🛍️ Shop</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {MENU_GROUPS.map((g) => (
              <li key={g.label}>
                <Link href={g.href} className="hover:text-white">{g.emoji} {g.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">❓ Help</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {HELP_LINKS.map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
            ))}
          </ul>
          <h3 className="font-serif text-lg text-white mt-6">💳 We accept</h3>
          <p className="mt-2 text-sm">Visa · Mastercard · Apple Pay</p>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">📍 Contact</h3>
          <address className="mt-3 text-sm not-italic space-y-2">
            <p>Street 25 A, Al Quoz 3,<br />Dubai, UAE</p>
            <p><a href="tel:+971556821424" className="hover:text-white">📞 +971 55 682 1424</a></p>
            <p><a href="mailto:info@balloonzonedubai.com" className="hover:text-white">✉️ info@balloonzonedubai.com</a></p>
            <p>🕘 Open daily 9 AM–9 PM<br />🚚 Same-day delivery before 6 PM</p>
          </address>
          <div className="mt-4">
            <CallbackButton className="inline-flex items-center gap-1 rounded-full bg-white text-pine-900 px-4 py-2 text-sm font-semibold hover:bg-cream transition whitespace-nowrap" />
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          <p>🚚 <strong className="text-white">Delivery:</strong> same-day before 6 PM in Dubai, delivery slots 9 AM–9 PM.</p>
          <p>✅ <strong className="text-white">Delivery guarantee:</strong> replacement or refund if damaged on arrival.</p>
          <p>↩️ <strong className="text-white">Returns &amp; exchanges:</strong> perishable, made-to-order items — contact us on the day of delivery.</p>
          <p>🔒 <strong className="text-white">Privacy:</strong> we only use your details to fulfil your order.</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap gap-3 justify-between text-xs">
          <span>© 2026 Balloon Zone Dubai. All rights reserved. TRN 105137928792003.</span>
          <span>Demo checkout — no payment is taken. Visa · Mastercard · Apple Pay</span>
        </div>
      </div>
    </footer>
  );
}
