export const metadata = { title: "Contact Us | Balloon Zone Dubai", description: "Contact Balloon Zone Dubai — Street 25 A, Al Quoz 3, Dubai. Phone +971 55 682 1424, email info@balloonzonedubai.com." };
export default function Contact() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif text-4xl text-pine-900">Contact Us</h1>
      <p className="text-stone-600 mt-2">A friendly support team is ready to assist you at every step of your order.</p>
      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Address</p><p className="text-sm text-stone-600 mt-1">Street 25 A, Al Quoz 3, Dubai, UAE</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Phone / WhatsApp</p><p className="text-sm text-stone-600 mt-1">+971 55 682 1424</p><p className="text-sm text-stone-600">WhatsApp: wa.me/971556821424</p></div>
        <div className="rounded-2xl border bg-white p-4"><p className="font-semibold">Email</p><p className="text-sm text-stone-600 mt-1">info@balloonzonedubai.com</p></div>
      </div>
      <p className="mt-6 text-sm text-stone-500">This contact page is a demo — the form below does not send anything. Use WhatsApp or email to reach the shop.</p>
    </div>
  );
}
