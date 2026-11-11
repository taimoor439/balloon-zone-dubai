// Admin → Coupons. BZD15 (15% off first order) is seeded as the site's
// current offer. Coupons are management-only in this round: checkout does
// NOT apply them yet.
"use client";
import { useEffect, useState } from "react";
import { loadCoupons, saveCoupons, type AdminCoupon } from "@/lib/admin";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("10");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setCoupons(loadCoupons());
  }, []);

  const persist = (list: AdminCoupon[]) => {
    setCoupons(list);
    saveCoupons(list);
  };

  const addCoupon = () => {
    const c = code.trim().toUpperCase();
    const p = Math.round(Number(percent) || 0);
    if (!c) {
      setError("Enter a coupon code.");
      return;
    }
    if (coupons.some((x) => x.code === c)) {
      setError(`Coupon ${c} already exists.`);
      return;
    }
    if (p < 1 || p > 100) {
      setError("Discount must be between 1% and 100%.");
      return;
    }
    persist([...coupons, { code: c, percent: p, active: true, note: note.trim() || undefined }]);
    setCode("");
    setPercent("10");
    setNote("");
    setError("");
    setSaved(`Coupon ${c} (${p}% off) added.`);
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-pine-900">Coupons</h1>
      <p className="text-sm text-stone-600 mt-1">
        Manage discount codes. <strong>BZD15</strong> is the site&apos;s current
        offer (15% off first order). Coupons are management-only in this round
        — checkout does not apply them yet.
      </p>

      {saved && (
        <p className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800" role="status">
          {saved}
        </p>
      )}

      <div className="mt-4 rounded-2xl border bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead>
            <tr className="text-left text-stone-500 border-b bg-cream/60">
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.code} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono font-bold">{c.code}</td>
                <td className="px-4 py-3 font-semibold">{c.percent}% off</td>
                <td className="px-4 py-3 text-stone-600">{c.note ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.active ? "bg-green-100 text-green-800" : "bg-stone-200 text-stone-600"}`}>
                    {c.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() =>
                      persist(coupons.map((x) => (x.code === c.code ? { ...x, active: !x.active } : x)))
                    }
                    className="rounded-full border border-pine-800 text-pine-800 px-3 py-1.5 text-xs font-semibold"
                  >
                    {c.active ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="mt-6 rounded-2xl border bg-white p-5 max-w-xl">
        <h2 className="font-serif text-xl text-pine-900">Add New Coupon</h2>
        {error && (
          <p className="mt-3 text-sm text-burgundy bg-red-50 border border-red-200 rounded-xl px-3 py-2" role="alert">
            {error}
          </p>
        )}
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_120px]">
          <div>
            <label className="text-sm font-semibold" htmlFor="cp-code">Code</label>
            <input id="cp-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="e.g. PARTY10" className="mt-1 w-full rounded-full border px-4 py-2 text-sm outline-none uppercase" />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="cp-pct">Discount %</label>
            <input id="cp-pct" type="number" min={1} max={100} value={percent} onChange={(e) => setPercent(e.target.value)} className="mt-1 w-full rounded-full border px-4 py-2 text-sm outline-none" />
          </div>
        </div>
        <div className="mt-3">
          <label className="text-sm font-semibold" htmlFor="cp-note">Note (optional)</label>
          <input id="cp-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Ramadan offer" className="mt-1 w-full rounded-full border px-4 py-2 text-sm outline-none" />
        </div>
        <button onClick={addCoupon} className="mt-4 rounded-full bg-pine-800 text-white px-5 py-2.5 text-sm font-semibold">
          Add Coupon
        </button>
      </section>
    </div>
  );
}
