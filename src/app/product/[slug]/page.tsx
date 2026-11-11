import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  return { title: p ? `${p.name} | Balloon Zone Dubai` : "Product | Balloon Zone Dubai", description: p?.blurb };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = PRODUCTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  // The view itself is a client component: it swaps in the merged
  // catalogue (admin overrides from localStorage) on mount, so admin
  // edits show on the detail page too.
  return <ProductView product={p} />;
}
