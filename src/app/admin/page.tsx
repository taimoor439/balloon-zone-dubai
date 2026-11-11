// Admin dashboard — stat cards computed from real stored data only.
// No fake numbers: with no orders yet every order stat is 0.
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { formatAED } from "@/lib/products";
import {
  loadOrders,
  loadCallbacks,
  loadCoupons,
  formatDateTime,
  type AdminOrder,
  type AdminCallback,
  type AdminCoupon,
} from "@/lib/admin";
import { useMergedProducts } from "@/lib/catalog";

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-pine-800 text-white p-5">
      <p className="text-sm text-cream/80">{label}</p>
      <p className="font-serif text-3xl mt-1">{value}</p>
      {sub && <p className="text-xs text-cream/70 mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const products = useMergedProducts();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [callbacks, setCallbacks] = useState<AdminCallback[]>([]);
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);

  useEffect(() => {
    setOrders(loadOrders());
    setCallbacks(loadCallbacks());
    setCoupons(loadCoupons());
  }, []);

  const totalSales = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);
  const pendingCallbacks = callbacks.filter((c) => c.status === "New").length;
  const activeCoupons = coupons.filter((c) => c.active).length;

  return (
    <div>
      <h1 className="font-serif text-3xl text-pine-900">Dashboard</h1>
      <p className="text-sm text-stone-600 mt-1">
        Overview &amp; stats — computed from this browser&apos;s stored data
        (localStorage). Nothing here is faked.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Stat label="🛒 Total Orders" value={String(orders.length)} sub="Demo orders placed from the shop" />
        <Stat label="💰 Total Sales" value={formatAED(totalSales)} sub="Cancelled orders excluded" />
        <Stat label="🎈 Total Products" value={String(products.length)} sub="Catalogue + admin-added products" />
        <Stat label="📞 Pending Callbacks" value={String(pendingCallbacks)} sub={`${callbacks.length} callback requests in total`} />
        <Stat label="🏷️ Active Coupons" value={String(activeCoupons)} sub={`${coupons.length} coupons in total`} />
        <Stat label="📦 Delivered Orders" value={String(orders.filter((o) => o.status === "Delivered").length)} sub={`${orders.filter((o) => o.status === "Pending").length} still pending`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-pine-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-burgundy underline">View all →</Link>
          </div>
          {orders.length === 0 ? (
            <p className="mt-3 text-sm text-stone-600">
              No orders yet — place a demo order from the shop to see it here.
            </p>
          ) : (
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="text-left text-stone-500 border-b">
                  <th className="py-2 pr-2">Order</th>
                  <th className="py-2 pr-2">Customer</th>
                  <th className="py-2 pr-2">Total</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="py-2 pr-2 font-semibold">{o.id}</td>
                    <td className="py-2 pr-2">{o.customer}</td>
                    <td className="py-2 pr-2">{formatAED(o.total)}</td>
                    <td className="py-2">{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl text-pine-900">Recent Callback Requests</h2>
            <Link href="/admin/callbacks" className="text-sm font-semibold text-burgundy underline">View all →</Link>
          </div>
          {callbacks.length === 0 ? (
            <p className="mt-3 text-sm text-stone-600">
              No callback requests yet — they appear here when a visitor uses
              “Request a Callback”.
            </p>
          ) : (
            <ul className="mt-3 space-y-3 text-sm">
              {callbacks.slice(0, 5).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 border-b last:border-0 pb-3 last:pb-0">
                  <span>
                    <span className="font-semibold">{c.name}</span> · {c.phone}
                    <span className="block text-xs text-stone-500">
                      {c.time} · {formatDateTime(c.date)}
                    </span>
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "New" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
