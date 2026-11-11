import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";

export const metadata: Metadata = {
  title: "Balloon Zone Dubai | Same Day Balloon Delivery, Decorations & Gifts",
  description: "Premium balloon delivery and decoration in Dubai. Same-day before 6 PM, fully inflated, with a delivery guarantee. Birthdays, weddings, baby showers and more.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-cream min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <a href="https://wa.me/971556821424" target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-40 rounded-full bg-green-600 text-white px-4 py-3 text-sm font-semibold shadow-lg" aria-label="Order on WhatsApp">WhatsApp us</a>
        </CartProvider>
      </body>
    </html>
  );
}
