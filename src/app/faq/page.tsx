export const metadata = { title: "Frequently Asked Questions | Balloon Zone Dubai", description: "Quick answers about delivery, custom balloons, and event styling in Dubai." };
const FAQS = [
  ["Do you offer customised balloons in Dubai?", "Yes — choose helium, foil, number and letter balloons, personalised with names or special messages, for birthdays, weddings, anniversaries, baby showers, proposals and corporate events."],
  ["How long do helium balloons last?", "Latex helium balloons typically last 8–12 hours, while foil helium balloons can float for 3–5 days or longer, depending on size and conditions."],
  ["Do you deliver the same day?", "Yes — order before 6 PM for same-day delivery in Dubai. Delivery slots are 9 AM–12 PM, 12–3 PM, 3–6 PM and 6–9 PM."],
  ["Can I personalise a foil balloon with a message or photo?", "Yes — enter your preferred message or add your photo when placing your order."],
  ["Do I need an account to order?", "No — this site offers guest checkout. No sign-in is required."],
  ["What if my balloons arrive damaged?", "Our delivery guarantee covers replacement or refund if an item is damaged on arrival."],
];
export default function FAQ() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl text-pine-900">Frequently Asked Questions</h1>
      <p className="text-stone-600 mt-2">Quick answers about delivery, custom balloons, and event styling in Dubai.</p>
      <div className="mt-6 space-y-3">
        {FAQS.map(([q, a]) => (
          <details key={q} className="rounded-2xl border bg-white p-4">
            <summary className="font-semibold text-pine-900 cursor-pointer">{q}</summary>
            <p className="text-stone-600 mt-2 text-sm">{a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
