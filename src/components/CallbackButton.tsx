"use client";
import { useState } from "react";

/**
 * "Request a Callback" button + popup modal.
 * Demo only — no backend, no call is actually placed; the form just
 * shows a thanks state. Used in the header (replacing the Contact
 * link) and in the footer's contact column.
 */
export default function CallbackButton({ className, label = "📞 Request a Callback" }: { className?: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("As soon as possible");
  const [done, setDone] = useState(false);

  const close = () => { setOpen(false); setDone(false); };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? "inline-flex items-center gap-1 rounded-full border border-pine-800 text-pine-800 px-3 py-2 text-sm font-semibold hover:bg-pine-800 hover:text-white transition whitespace-nowrap"}
      >
        {label}
      </button>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Request a callback">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl p-6">
            <button onClick={close} className="absolute top-3 right-4 text-2xl text-stone-500" aria-label="Close">×</button>
            {done ? (
              <div className="text-center py-4">
                <p className="text-4xl">📞</p>
                <p className="font-serif text-2xl text-pine-900 mt-2">Thanks{ name ? `, ${name}` : ""}!</p>
                <p className="text-stone-600 mt-2 text-sm">We&apos;ll call you back soon (demo) — no call has been placed.</p>
                <button onClick={close} className="mt-5 rounded-full bg-pine-800 text-white px-6 py-2.5 text-sm font-semibold">Done</button>
              </div>
            ) : (
              <>
                <p className="font-serif text-2xl text-pine-900">📞 Request a Callback</p>
                <p className="text-sm text-stone-600 mt-1">Tell us when to call — we&apos;ll ring you back about your celebration.</p>
                <form
                  className="mt-4 space-y-3"
                  onSubmit={(e) => { e.preventDefault(); if (name.trim() && phone.trim()) setDone(true); }}
                >
                  <div>
                    <label htmlFor="cb-name" className="text-sm font-semibold">Your name</label>
                    <input id="cb-name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ayesha Khan" className="mt-1 w-full rounded-full border border-pine-100 bg-cream px-4 py-2.5 text-sm outline-none focus:border-pine-600" />
                  </div>
                  <div>
                    <label htmlFor="cb-phone" className="text-sm font-semibold">Phone number</label>
                    <input id="cb-phone" required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971 5X XXX XXXX" className="mt-1 w-full rounded-full border border-pine-100 bg-cream px-4 py-2.5 text-sm outline-none focus:border-pine-600" />
                  </div>
                  <div>
                    <label htmlFor="cb-time" className="text-sm font-semibold">Preferred time</label>
                    <select id="cb-time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 w-full rounded-full border border-pine-100 bg-cream px-4 py-2.5 text-sm outline-none bg-white">
                      <option>As soon as possible</option>
                      <option>Today, 12–3 PM</option>
                      <option>Today, 3–6 PM</option>
                      <option>Today, 6–9 PM</option>
                      <option>Tomorrow morning</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full rounded-full bg-pine-800 text-white py-3 font-semibold">Request Callback</button>
                  <p className="text-xs text-stone-500 text-center">Demo only — no call is placed and no details are sent anywhere.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
