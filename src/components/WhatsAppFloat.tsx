// Floating WhatsApp button (public site only — hidden on /admin, which
// has its own sidebar layout).
"use client";
import { usePathname } from "next/navigation";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-green-600 text-white px-4 py-3 text-sm font-semibold shadow-lg" aria-label="Order on WhatsApp">WhatsApp us</a>
  );
}
