import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-pine-950 text-cream/85 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-serif text-2xl font-bold text-white">Balloon Zone Dubai</p>
          <p className="mt-2 text-sm">Same-day balloon delivery and decoration in Dubai — birthdays, weddings, baby showers and every celebration.</p>
          <p className="mt-3 text-sm">Street 25 A, Al Quoz 3, Dubai, UAE<br />+971 55 682 1424<br />info@balloonzonedubai.com</p>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">Shop</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/shop?occasion=Birthday">Birthday Balloons</Link></li>
            <li><Link href="/shop?occasion=Baby Shower">Baby Shower</Link></li>
            <li><Link href="/shop?occasion=Wedding">Wedding &amp; Bride To Be</Link></li>
            <li><Link href="/shop?category=Balloon Arches">Balloon Arches</Link></li>
            <li><Link href="/shop?category=Cakes & Sweets">Cakes &amp; Sweets</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">Help</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/checkout">Guest Checkout — no sign-in required</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg text-white">Policies</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>Delivery: same-day before 6 PM in Dubai, delivery slots 9 AM–9 PM.</li>
            <li>Delivery guarantee: replacement or refund if damaged on arrival.</li>
            <li>Returns &amp; exchanges: perishable, made-to-order items — contact us on the day of delivery.</li>
            <li>Privacy: we only use your details to fulfil your order.</li>
          </ul>
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
