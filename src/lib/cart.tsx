"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Product } from "./products";

export type CartLine = {
  slug: string; name: string; price: number; image: string;
  colour?: string; age?: string; extrasLabel?: string; extrasPrice?: number;
  qty: number;
};
type CartCtx = {
  lines: CartLine[]; count: number; subtotal: number;
  add: (p: Product, opts?: { colour?: string; age?: string; extrasLabel?: string; extrasPrice?: number; qty?: number }) => void;
  remove: (slug: string, colour?: string, age?: string) => void;
  setQty: (slug: string, colour: string | undefined, age: string | undefined, qty: number) => void;
  clear: () => void; open: boolean; setOpen: (v: boolean) => void;
};
const Ctx = createContext<CartCtx | null>(null);
const KEY = "bzd-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setLines(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines]);
  const value = useMemo<CartCtx>(() => ({
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + (l.price + (l.extrasPrice || 0)) * l.qty, 0),
    add: (p, opts) => {
      const line: CartLine = { slug: p.slug, name: p.name, price: p.price, image: p.image, colour: opts?.colour, age: opts?.age, extrasLabel: opts?.extrasLabel, extrasPrice: opts?.extrasPrice || 0, qty: opts?.qty || 1 };
      setLines((prev) => {
        const i = prev.findIndex((l) => l.slug === line.slug && l.colour === line.colour && l.age === line.age && l.extrasLabel === line.extrasLabel);
        if (i >= 0) { const next = [...prev]; next[i] = { ...next[i], qty: next[i].qty + line.qty }; return next; }
        return [...prev, line];
      });
      setOpen(true);
    },
    remove: (slug, colour, age) => setLines((prev) => prev.filter((l) => !(l.slug === slug && l.colour === colour && l.age === age))),
    setQty: (slug, colour, age, qty) => setLines((prev) => qty <= 0 ? prev.filter((l) => !(l.slug === slug && l.colour === colour && l.age === age)) : prev.map((l) => (l.slug === slug && l.colour === colour && l.age === age ? { ...l, qty } : l))),
    clear: () => setLines([]),
    open, setOpen,
  }), [lines, open]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
