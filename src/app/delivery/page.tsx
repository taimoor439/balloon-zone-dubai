import Link from "next/link";

export const metadata = {
  title: "Delivery | Balloon Zone Dubai",
  description: "Same-day balloon delivery in Dubai before 6 PM, delivery slots 9 AM–9 PM, flat AED 29 delivery (demo rate).",
};

export default function Delivery() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm text-pine-600">🚚 Balloon Zone Dubai</p>
      <h1 className="font-serif text-4xl text-pine-900 mt-1">Delivery in Dubai</h1>
      <p className="text-stone-700 mt-3 text-lg">
        Order before 6 PM for same-day delivery in Dubai. Every balloon arrives fully inflated and ready to enjoy — no setup needed.
      </p>

      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          ["⏰ Same-day before 6 PM", "Order by 6 PM and your balloons arrive the same day, fully inflated."],
          ["🕘 Delivery slots 9 AM–9 PM", "Choose a slot that suits your party: 9 AM–12 PM, 12–3 PM, 3–6 PM or 6–9 PM."],
          ["💰 Flat AED 29 delivery", "Flat Dubai delivery rate in this demo — confirm at launch. Free over AED 500 (demo offer)."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-2xl border bg-white p-4">
            <p className="font-serif text-lg text-pine-900">{t}</p>
            <p className="text-sm text-stone-600 mt-1">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="font-serif text-2xl text-pine-900">Where we deliver</h2>
        <ul className="mt-3 space-y-2 text-stone-700">
          <li>📍 <strong>Dubai</strong> — same-day delivery, all areas.</li>
          <li>📍 <strong>Abu Dhabi</strong> — next-day delivery, arranged on WhatsApp.</li>
          <li>📍 <strong>Sharjah</strong> — next-day delivery, arranged on WhatsApp.</li>
        </ul>
        <p className="text-sm text-stone-600 mt-4">
          Decoration packages are delivered and installed at your venue by our team. For large setups, book at least 2 days ahead so we can reserve your slot.
        </p>
      </div>

      <div className="mt-8 rounded-2xl border bg-white p-6">
        <h2 className="font-serif text-2xl text-pine-900">Delivery guarantee</h2>
        <p className="text-stone-700 mt-2 text-sm">
          If a balloon arrives damaged, we replace it or refund it — just contact us on the day of delivery. Prefer to talk it through?{" "}
          <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="text-burgundy font-semibold underline">WhatsApp us on +971 55 682 1424</a>.
        </p>
      </div>

      <p className="mt-8 text-center">
        <Link href="/shop" className="inline-block rounded-full bg-pine-800 text-white px-6 py-3 font-semibold">Shop balloons &amp; decorations →</Link>
      </p>
    </div>
  );
}
