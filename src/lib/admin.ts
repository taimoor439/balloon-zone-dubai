// Admin CMS storage layer.
//
// IMPORTANT — demo only, no backend: everything the admin sees and edits
// lives in THIS browser's localStorage (orders, callbacks, coupons,
// settings, product overrides). Another browser, another device, or a
// cleared cache sees none of it. There is no real security either — the
// login is a demo gate (admin / admin123) kept in sessionStorage.

import { PRODUCTS, type Product } from "./products";

export const ADMIN_PRODUCTS_KEY = "bz_admin_products";
export const ORDERS_KEY = "bz_orders";
export const CALLBACKS_KEY = "bz_callbacks";
export const COUPONS_KEY = "bz_coupons";
export const SETTINGS_KEY = "bz_settings";
export const AUTH_KEY = "bz_admin_auth";

// ---------------------------------------------------------------- auth
export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}
export function loginAdmin(user: string, pass: string): boolean {
  if (user.trim() === "admin" && pass === "admin123") {
    try {
      sessionStorage.setItem(AUTH_KEY, "1");
    } catch {}
    return true;
  }
  return false;
}
export function logoutAdmin() {
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {}
}

// ------------------------------------------------------- generic store
function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}
function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ------------------------------------------------------------- products
export type ProductOverride = Partial<Omit<Product, "slug">> & {
  slug: string;
  /** false = hidden from the shop (product stays in the catalogue data) */
  visible?: boolean;
};
export type AdminProductData = {
  overrides: Record<string, ProductOverride>;
  added: Product[];
};
export function loadAdminProductData(): AdminProductData {
  return readJSON<AdminProductData>(ADMIN_PRODUCTS_KEY, { overrides: {}, added: [] });
}
export function saveAdminProductData(data: AdminProductData) {
  writeJSON(ADMIN_PRODUCTS_KEY, data);
  try {
    window.dispatchEvent(new Event("bz:products-changed"));
  } catch {}
}
/** Base catalogue + admin overrides + admin-added products. Hidden
 *  (visible === false) products are left out. */
export function mergeProducts(): Product[] {
  const { overrides, added } = loadAdminProductData();
  const list = PRODUCTS.map((p) => {
    const o = overrides[p.slug];
    return o ? { ...p, ...o } : p;
  }).filter((p) => overrides[p.slug]?.visible !== false);
  return [...list, ...added];
}
export function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "product";
}

// --------------------------------------------------------------- orders
export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "In Transit"
  | "Delivered"
  | "Cancelled";
export const ORDER_STATUSES: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Processing",
  "In Transit",
  "Delivered",
  "Cancelled",
];
export type AdminOrder = {
  id: string; // e.g. BZD-DEMO-1234
  date: string; // ISO string
  customer: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  delivery: number;
  total: number;
  status: OrderStatus;
};
export function loadOrders(): AdminOrder[] {
  return readJSON<AdminOrder[]>(ORDERS_KEY, []);
}
export function saveOrder(order: AdminOrder) {
  const list = loadOrders();
  list.unshift(order);
  writeJSON(ORDERS_KEY, list);
}
export function updateOrderStatus(id: string, status: OrderStatus) {
  writeJSON(
    ORDERS_KEY,
    loadOrders().map((o) => (o.id === id ? { ...o, status } : o))
  );
}

// ------------------------------------------------------------ callbacks
export type AdminCallback = {
  id: string;
  name: string;
  phone: string;
  time: string;
  date: string; // ISO string
  status: "New" | "Called";
};
export function loadCallbacks(): AdminCallback[] {
  return readJSON<AdminCallback[]>(CALLBACKS_KEY, []);
}
export function saveCallback(cb: AdminCallback) {
  const list = loadCallbacks();
  list.unshift(cb);
  writeJSON(CALLBACKS_KEY, list);
}
export function updateCallbackStatus(id: string, status: "New" | "Called") {
  writeJSON(
    CALLBACKS_KEY,
    loadCallbacks().map((c) => (c.id === id ? { ...c, status } : c))
  );
}

// -------------------------------------------------------------- coupons
export type AdminCoupon = {
  code: string;
  percent: number;
  active: boolean;
  note?: string;
};
const SEED_COUPONS: AdminCoupon[] = [
  { code: "BZD15", percent: 15, active: true, note: "15% off first order — the site's current offer" },
];
export function loadCoupons(): AdminCoupon[] {
  try {
    const raw = localStorage.getItem(COUPONS_KEY);
    if (!raw) {
      writeJSON(COUPONS_KEY, SEED_COUPONS);
      return SEED_COUPONS;
    }
    return JSON.parse(raw) as AdminCoupon[];
  } catch {
    return SEED_COUPONS;
  }
}
export function saveCoupons(list: AdminCoupon[]) {
  writeJSON(COUPONS_KEY, list);
}

// ------------------------------------------------------------- settings
export type AdminSettings = {
  storeName: string;
  phone: string;
  whatsapp: string;
  email: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
};
export const DEFAULT_SETTINGS: AdminSettings = {
  storeName: "Balloon Zone Dubai",
  phone: "+971 55 682 1424",
  whatsapp: "+971 55 682 1424",
  email: "info@balloonzonedubai.com",
  deliveryFee: 29,
  freeDeliveryThreshold: 500,
};
export function loadSettings(): AdminSettings {
  return { ...DEFAULT_SETTINGS, ...readJSON<Partial<AdminSettings>>(SETTINGS_KEY, {}) };
}
export function saveSettings(s: AdminSettings) {
  writeJSON(SETTINGS_KEY, s);
}

export function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}
