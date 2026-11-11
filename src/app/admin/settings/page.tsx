// Admin → Settings. Stored in this browser only (localStorage bz_settings).
// Follow-up: the header/footer do NOT read these yet — they still use the
// values baked into the code.
"use client";
import { useEffect, useState } from "react";
import { loadSettings, saveSettings, type AdminSettings } from "@/lib/admin";

export default function AdminSettingsPage() {
  const [s, setS] = useState<AdminSettings | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setS(loadSettings());
  }, []);

  if (!s) return <p className="text-stone-500">Loading settings…</p>;

  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) =>
    setS({ ...s, [key]: value });

  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-3xl text-pine-900">Settings</h1>
      <p className="text-sm text-stone-600 mt-1">
        Store details saved in this browser only. Note: the header and footer
        do not read these yet — they still show the values from the code.
        Wiring them up is a follow-up.
      </p>

      {saved && (
        <p className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800" role="status">
          Settings saved in this browser.
        </p>
      )}

      <form
        className="mt-5 rounded-2xl border bg-white p-5 space-y-4 text-sm"
        onSubmit={(e) => {
          e.preventDefault();
          saveSettings(s);
          setSaved(true);
        }}
      >
        <div>
          <label className="font-semibold" htmlFor="st-name">Store name</label>
          <input id="st-name" value={s.storeName} onChange={(e) => set("storeName", e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold" htmlFor="st-phone">Phone</label>
            <input id="st-phone" value={s.phone} onChange={(e) => set("phone", e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="st-wa">WhatsApp number</label>
            <input id="st-wa" value={s.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
          </div>
        </div>
        <div>
          <label className="font-semibold" htmlFor="st-email">Email</label>
          <input id="st-email" type="email" value={s.email} onChange={(e) => set("email", e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold" htmlFor="st-fee">Flat delivery fee (AED)</label>
            <input id="st-fee" type="number" min={0} value={s.deliveryFee} onChange={(e) => set("deliveryFee", Math.max(0, Number(e.target.value) || 0))} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
          </div>
          <div>
            <label className="font-semibold" htmlFor="st-free">Free delivery over (AED)</label>
            <input id="st-free" type="number" min={0} value={s.freeDeliveryThreshold} onChange={(e) => set("freeDeliveryThreshold", Math.max(0, Number(e.target.value) || 0))} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
          </div>
        </div>
        <button type="submit" className="rounded-full bg-pine-800 text-white px-6 py-2.5 font-semibold">
          Save Settings
        </button>
      </form>
    </div>
  );
}
