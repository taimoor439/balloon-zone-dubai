// Admin area layout: dark sidebar (like the Swis eShop reference) shared
// by every /admin page. Client-side login gate — the demo login lives in
// sessionStorage, so an unauthenticated visit is sent to /admin/login.
// The login page itself uses this layout too, but skips the gate.
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isAuthed, logoutAdmin } from "@/lib/admin";

const NAV = [
  { href: "/admin", label: "📊 Dashboard" },
  { href: "/admin/orders", label: "🛒 Orders" },
  { href: "/admin/products", label: "🎈 Products" },
  { href: "/admin/callbacks", label: "📞 CallBack Requests" },
  { href: "/admin/coupons", label: "🏷️ Coupons" },
  { href: "/admin/settings", label: "⚙️ Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (isLogin) {
      setChecked(true);
      return;
    }
    if (!isAuthed()) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [pathname, isLogin, router]);

  if (isLogin) {
    return <>{children}</>;
  }
  if (!checked) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center text-stone-500">
        Checking admin session…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr] items-start">
        <aside className="rounded-2xl bg-pine-950 text-cream/85 p-4 lg:sticky lg:top-24">
          <p className="font-serif text-xl font-bold text-white px-2">🎈 Balloon Zone Dubai</p>
          <p className="text-xs text-cream/60 px-2 mt-0.5">Admin — demo CMS</p>
          <nav className="mt-5 space-y-1">
            {NAV.map((item) => {
              const active =
                item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active ? "bg-white/15 text-white" : "hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-white/10 mt-5 pt-4 space-y-2 px-2">
            <Link href="/" className="block text-sm hover:text-white">
              🌐 View live site →
            </Link>
            <button
              onClick={() => {
                logoutAdmin();
                router.replace("/admin/login");
              }}
              className="block w-full text-left text-sm font-semibold text-white bg-burgundy rounded-full px-3 py-2 text-center"
            >
              ⎋ Logout
            </button>
            <p className="text-[11px] leading-relaxed text-cream/50">
              Demo admin — all data stays in this browser (localStorage). No real
              security, no backend.
            </p>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
