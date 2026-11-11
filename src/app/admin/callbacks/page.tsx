// Admin → CallBack Requests. Requests saved by the "Request a Callback"
// form (localStorage bz_callbacks) — mark them as called once handled.
"use client";
import { useEffect, useState } from "react";
import {
  loadCallbacks,
  updateCallbackStatus,
  formatDateTime,
  type AdminCallback,
} from "@/lib/admin";

export default function AdminCallbacks() {
  const [list, setList] = useState<AdminCallback[]>([]);

  useEffect(() => {
    setList(loadCallbacks());
  }, []);

  const markCalled = (id: string) => {
    updateCallbackStatus(id, "Called");
    setList(loadCallbacks());
  };

  return (
    <div>
      <h1 className="font-serif text-3xl text-pine-900">CallBack Requests</h1>
      <p className="text-sm text-stone-600 mt-1">
        {list.filter((c) => c.status === "New").length} new · {list.length} in
        total — saved in this browser when a visitor submits “Request a
        Callback”. The demo form never places a real call.
      </p>

      {list.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-8 text-center">
          <p className="font-serif text-2xl text-pine-900">No callback requests yet</p>
          <p className="text-sm text-stone-600 mt-2">
            They appear here as soon as someone uses the “Request a Callback”
            button on the site.
          </p>
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-stone-500 border-b bg-cream/60">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Preferred time</th>
                <th className="px-4 py-3">Requested</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b last:border-0">
                  <td className="px-4 py-3 font-semibold">{c.name}</td>
                  <td className="px-4 py-3">{c.phone}</td>
                  <td className="px-4 py-3">{c.time}</td>
                  <td className="px-4 py-3">{formatDateTime(c.date)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${c.status === "New" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {c.status === "New" ? (
                      <button onClick={() => markCalled(c.id)} className="rounded-full bg-pine-800 text-white px-3 py-1.5 text-xs font-semibold">
                        ✓ Mark as called
                      </button>
                    ) : (
                      <span className="text-xs text-stone-500">Done</span>
                    )}
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
