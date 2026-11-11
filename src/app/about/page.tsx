export const metadata = { title: "About Us | Balloon Zone Dubai", description: "Balloon Zone Dubai — premium balloon delivery and decoration in Dubai, Al Quoz 3." };
export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl text-pine-900">About Balloon Zone Dubai</h1>
      <p className="mt-4 text-lg text-stone-700">Balloon Zone Dubai is a premium online balloon store in Dubai. We deliver inflated helium balloons to your doorstep and create balloon decorations for birthdays, weddings, baby showers, engagements and special events across Dubai.</p>
      <p className="mt-3 text-stone-700">From a single personalised bouquet to a full gala setup, every order is designed, inflated and installed with care — so your celebration looks beautiful and stress-free.</p>
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[["Premium Quality", "High-quality balloons with elegant finishes."], ["Trusted Service", "Hundreds of happy customers across Dubai."], ["Fast Delivery", "Same-day delivery before 6 PM, with delivery slots from 9 AM to 9 PM."]].map(([t, d]) => (
          <div key={t} className="rounded-2xl border bg-white p-4"><p className="font-serif text-lg text-pine-900">{t}</p><p className="text-sm text-stone-600 mt-1">{d}</p></div>
        ))}
      </div>
      <p className="mt-8 text-stone-700"><strong>Visit us:</strong> Street 25 A, Al Quoz 3, Dubai, UAE · <strong>Phone / WhatsApp:</strong> +971 55 682 1424 · <strong>Email:</strong> info@balloonzonedubai.com</p>
    </div>
  );
}
