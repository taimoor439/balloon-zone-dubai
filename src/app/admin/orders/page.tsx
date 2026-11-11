// Admin → Orders. Demo orders saved by the guest checkout
// (localStorage bz_orders) — status can be moved along the pipeline.
"use client";
import { useEffect, useMemo, useState } from "react";
import { formatAED } from "@/lib/products";
import {
  loadOrders,
  updateOrderStatus,
  formatDateTime,
  ORDER_STATUSES,
  type AdminOrder,
  type OrderStatus,
} from "@/lib/admin";

const STATUS_STYLE: Record<OrderStatus, string> = {
  Pending: "bg-amber-100 text-amber-800",
  Confirmed: "bg-sky-100 text-sky-800",
  Processing: "bg-violet-100 text-violet-800",
  "In Transit": "bg-blue-100 text-blue-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [filter, setFilter] = useState<OrderStatus | "All">("All");

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const shown = useMemo(
    () => (filter === "All" ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter]
  );

  const changeStatus = (id: string, status: OrderStatus) => {
    updateOrderStatus(id, status);
    setOrders(loadOrders());
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-pine-900">Orders</h1>
      <p className="text-sm text-stone-600 mt-1">
        {orders.length} demo order{orders.length === 1 ? "" : "s"} — saved in
        this browser when a guest places a demo order at checkout. No payment
        is ever taken.
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <label htmlFor="order-filter" className="font-semibold">Filter by status:</label>
        <select
          id="order-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as OrderStatus | "All")}
          className="rounded-full border bg-white px-3 py-2 outline-none"
        >
          <option value="All">All statuses</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {shown.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
          <p className="font-serif text-2xl text-pine-900">No orders yet</p>
          <p className="text-sm text-stone-600 mt-2">
            Place a demo order from the shop (guest checkout) and it will appear
            here with status “Pending”.
          </p>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[760px]">
            <thead>
              <tr className="text-left text-stone-500 border-b bg-cream/60">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Change status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <tr key={o.id} className="border-b last:border-0 align-top">
                  <td className="px-4 py-3">
                    <span className="font-semibold">{o.id}</span>
                    <span className="block text-xs text-stone-500">{formatDateTime(o.date)}</span>
                  </td>
                  <td className="px-4 py-3">
                    {o.customer}
                    <span className="block text-xs text-stone-500">{o.phone}</span>
                    <span className="block text-xs text-stone-500">{o.address}</span>
                  </td>
                  <td className="px-4 py-3">
                    {o.items.map((i) => (
                      <span key={i.name} className="block">
                        {i.qty} × {i.name}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatAED(o.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => changeStatus(o.id, e.target.value as OrderStatus)}
                      aria-label={`Change status of ${o.id}`}
                      className="rounded-full border bg-white px-2 py-1.5 text-xs outline-none"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
