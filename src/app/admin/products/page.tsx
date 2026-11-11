// Admin → Products. Searchable table of the merged catalogue with edit,
// add and delete. Edits are stored as overrides in localStorage
// (bz_admin_products) and the shop picks them up immediately via the
// merged catalogue (src/lib/catalog.ts).
"use client";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, formatAED, type Product } from "@/lib/products";
import {
  loadAdminProductData,
  saveAdminProductData,
  slugify,
  type ProductOverride,
} from "@/lib/admin";
import { useMergedProducts } from "@/lib/catalog";

const CATEGORIES = ["Decoration Packages", "Balloon Bouquets", "Balloon Arches", "Flowers", "Cakes & Sweets", "Party Supplies"];

type FormState = {
  name: string;
  price: string;
  wasPrice: string;
  category: string;
  badge: string;
  blurb: string;
  image: string;
  visible: boolean;
};

const emptyForm: FormState = {
  name: "",
  price: "",
  wasPrice: "",
  category: "Balloon Bouquets",
  badge: "",
  blurb: "",
  image: "",
  visible: true,
};

function formFromProduct(p: Product, visible: boolean): FormState {
  return {
    name: p.name,
    price: String(p.price),
    wasPrice: p.wasPrice ? String(p.wasPrice) : "",
    category: p.category,
    badge: p.badge ?? "",
    blurb: p.blurb,
    image: p.image,
    visible,
  };
}

export default function AdminProducts() {
  const products = useMergedProducts();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<{ slug: string; isNew: boolean } | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [savedNote, setSavedNote] = useState("");
  // Visibility map, read after mount only — reading localStorage during
  // render would differ from the server render and break hydration.
  const [overrideMap, setOverrideMap] = useState<Record<string, ProductOverride>>({});
  useEffect(() => {
    setOverrideMap(loadAdminProductData().overrides);
  }, [products]);

  const baseSlugs = useMemo(() => new Set(PRODUCTS.map((p) => p.slug)), []);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return products;
    return products.filter((p) =>
      (p.name + " " + p.category + " " + p.occasion).toLowerCase().includes(needle)
    );
  }, [products, q]);

  const openEdit = (p: Product) => {
    const data = loadAdminProductData();
    setForm(formFromProduct(p, data.overrides[p.slug]?.visible !== false));
    setEditing({ slug: p.slug, isNew: false });
  };
  const openAdd = () => {
    setForm(emptyForm);
    setEditing({ slug: "", isNew: true });
  };

  const save = () => {
    if (!editing) return;
    const price = Math.max(0, Math.round(Number(form.price) || 0));
    const wasPrice = form.wasPrice.trim() ? Math.max(0, Math.round(Number(form.wasPrice) || 0)) : undefined;
    const data = loadAdminProductData();
    if (editing.isNew) {
      let slug = slugify(form.name || "product");
      if (products.some((p) => p.slug === slug)) slug = `${slug}-${Date.now().toString(36)}`;
      const np: Product = {
        slug,
        name: form.name.trim() || "New product",
        price,
        wasPrice,
        category: form.category,
        occasion: "Birthday",
        image: form.image.trim() || "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
        blurb: form.blurb.trim() || "New product — edit the description in the admin.",
        verified: false,
        badge: form.badge.trim() || undefined,
        description: [form.blurb.trim() || "A new Balloon Zone Dubai product."],
        suitableFor: ["Birthdays", "Celebrations", "Surprises"],
        includes: ["As described", "Delivery in Dubai"],
      };
      data.added.push(np);
      saveAdminProductData(data);
      setSavedNote(`Added “${np.name}”. It appears in the shop right away — its own detail page goes live after the next site rebuild/deploy (static site).`);
    } else {
      const override: ProductOverride = {
        slug: editing.slug,
        name: form.name.trim(),
        price,
        wasPrice,
        category: form.category,
        badge: form.badge.trim() || undefined,
        blurb: form.blurb.trim(),
        image: form.image.trim(),
        visible: form.visible,
      };
      data.overrides[editing.slug] = override;
      saveAdminProductData(data);
      setSavedNote(`Saved “${form.name.trim()}”. The shop and product page update immediately.`);
    }
    setEditing(null);
  };

  const remove = (slug: string) => {
    const data = loadAdminProductData();
    if (baseSlugs.has(slug)) {
      // Base product: deleting hides it (its data lives in the code).
      data.overrides[slug] = { ...(data.overrides[slug] ?? {}), slug, visible: false };
    } else {
      data.added = data.added.filter((p) => p.slug !== slug);
      delete data.overrides[slug];
    }
    saveAdminProductData(data);
    setConfirmDelete(null);
    setSavedNote("Product removed from the shop.");
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-pine-900">Products</h1>
          <p className="text-sm text-stone-600 mt-1">
            {products.length} products in the shop · edits save to this browser
            and show in the shop immediately.
          </p>
        </div>
        <button onClick={openAdd} className="rounded-full bg-pine-800 text-white px-5 py-2.5 text-sm font-semibold">
          + Add Product
        </button>
      </div>

      {savedNote && (
        <p className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800" role="status">
          {savedNote}
        </p>
      )}
      <p className="mt-3 text-xs text-stone-500 leading-relaxed">
        Note: new products appear in the shop listing straight away, but their
        own detail page (/product/…) only exists after the next site
        rebuild/deploy — this is a static site, so new pages can&apos;t be
        created from the browser alone.
      </p>

      <div className="mt-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 Search products by name, category or occasion…"
          aria-label="Search products"
          className="w-full max-w-md rounded-full border bg-white px-4 py-2.5 text-sm outline-none focus:border-pine-600"
        />
      </div>

      <div className="mt-4 rounded-2xl border bg-white overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="text-left text-stone-500 border-b bg-cream/60">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Badge</th>
              <th className="px-4 py-3">Visible</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const isNew = !baseSlugs.has(p.slug);
              return (
                <tr key={p.slug} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <span className="font-semibold text-pine-900">{p.name}</span>
                    {isNew && <span className="ml-2 rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-xs font-semibold">New</span>}
                    {!p.verified && <span className="ml-2 rounded-full bg-amber-100 text-amber-800 px-2 py-0.5 text-xs">Demo price</span>}
                    <span className="block text-xs text-stone-500">{p.slug}</span>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatAED(p.price)}
                    {p.wasPrice && <span className="block text-xs text-stone-400 font-normal"><s>{formatAED(p.wasPrice)}</s></span>}
                  </td>
                  <td className="px-4 py-3">{p.badge ?? "—"}</td>
                  <td className="px-4 py-3">
                    {overrideMap[p.slug]?.visible === false ? "🚫 Hidden" : "✅ Yes"}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button onClick={() => openEdit(p)} className="rounded-full border border-pine-800 text-pine-800 px-3 py-1.5 text-xs font-semibold mr-2">Edit</button>
                    <button onClick={() => setConfirmDelete(p.slug)} className="rounded-full border border-red-300 text-red-700 px-3 py-1.5 text-xs font-semibold">Delete</button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-stone-500">
                  No products match “{q}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-label="Confirm delete">
          <div className="rounded-2xl bg-white p-6 max-w-sm w-full">
            <p className="font-serif text-xl text-pine-900">Delete this product?</p>
            <p className="text-sm text-stone-600 mt-2">
              It will be removed from the shop (base products are hidden, not
              erased from the code).
            </p>
            <div className="mt-5 flex gap-2 justify-end">
              <button onClick={() => setConfirmDelete(null)} className="rounded-full border px-4 py-2 text-sm font-semibold">Cancel</button>
              <button onClick={() => remove(confirmDelete)} className="rounded-full bg-burgundy text-white px-4 py-2 text-sm font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-label={editing.isNew ? "Add product" : "Edit product"}>
          <div className="rounded-2xl bg-white p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <p className="font-serif text-2xl text-pine-900">{editing.isNew ? "Add Product" : "Edit Product"}</p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <label className="font-semibold" htmlFor="pf-name">Name</label>
                <input id="pf-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold" htmlFor="pf-price">Price (AED)</label>
                  <input id="pf-price" type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
                </div>
                <div>
                  <label className="font-semibold" htmlFor="pf-was">Was price (AED, optional)</label>
                  <input id="pf-was" type="number" min={0} value={form.wasPrice} onChange={(e) => setForm({ ...form, wasPrice: e.target.value })} className="mt-1 w-full rounded-full border px-4 py-2 outline-none" placeholder="Leave empty if no sale" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold" htmlFor="pf-cat">Category</label>
                  <select id="pf-cat" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 w-full rounded-full border px-4 py-2 bg-white outline-none">
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-semibold" htmlFor="pf-badge">Badge (optional)</label>
                  <input id="pf-badge" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Bestseller, Sale" className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
                </div>
              </div>
              <div>
                <label className="font-semibold" htmlFor="pf-blurb">Short description</label>
                <textarea id="pf-blurb" value={form.blurb} onChange={(e) => setForm({ ...form, blurb: e.target.value })} rows={2} className="mt-1 w-full rounded-2xl border px-4 py-2 outline-none" />
              </div>
              <div>
                <label className="font-semibold" htmlFor="pf-img">Image URL</label>
                <input id="pf-img" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/…" className="mt-1 w-full rounded-full border px-4 py-2 outline-none" />
              </div>
              {!editing.isNew && (
                <label className="flex items-center gap-2 font-semibold cursor-pointer">
                  <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} className="accent-[#7a1e2b] h-4 w-4" />
                  Visible in the shop
                </label>
              )}
            </div>
            <div className="mt-5 flex gap-2 justify-end">
              <button onClick={() => setEditing(null)} className="rounded-full border px-4 py-2 text-sm font-semibold">Cancel</button>
              <button onClick={save} disabled={!form.name.trim() || form.price === ""} className="rounded-full bg-pine-800 text-white px-5 py-2 text-sm font-semibold disabled:opacity-50">
                {editing.isNew ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
