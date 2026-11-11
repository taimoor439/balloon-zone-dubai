// Merged shop catalogue: the base products from src/lib/products.ts plus
// any admin overrides / added products stored in localStorage
// (bz_admin_products). The shop and product pages render from this hook so
// admin edits show up immediately, without a rebuild.
//
// Server-rendered HTML still uses the base catalogue (localStorage does not
// exist at build time); the merged list swaps in on mount in the browser.
"use client";
import { useEffect, useState } from "react";
import { PRODUCTS, type Product } from "./products";
import { loadAdminProductData } from "./admin";

export function getMergedProducts(): Product[] {
  const { overrides, added } = loadAdminProductData();
  const list = PRODUCTS.map((p) => {
    const o = overrides[p.slug];
    return o ? { ...p, ...o } : p;
  }).filter((p) => overrides[p.slug]?.visible !== false);
  return [...list, ...added];
}

export function useMergedProducts(): Product[] {
  const [list, setList] = useState<Product[]>(PRODUCTS);
  useEffect(() => {
    const refresh = () => setList(getMergedProducts());
    refresh();
    window.addEventListener("bz:products-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("bz:products-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);
  return list;
}
