"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Homepage hero carousel — 3 slides (Balloons, Cakes, Flowers). Photos
// are Unsplash URLs already used in src/lib/products.ts (no new images).
// Shop links use the exact filter the shop reads: ?category= (see
// ShopClient — params.get("category")) with the exact category strings
// from products.ts ("Cakes & Sweets", "Flowers", "Decoration Packages").
// Pure client state, no new dependencies — safe for the static export.
const SLIDES = [
  {
    eyebrow: "Make every moment extra special",
    title: "Balloon Delivery & Balloon Decorations in Dubai",
    sub: "Luxury balloon decorations, bouquets, cakes and flowers — beautifully designed for birthdays, weddings, baby showers and special events across Dubai.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1800&q=80",
    alt: "Balloon decoration in Dubai",
    primary: { label: "Shop Balloons", href: "/shop" },
    secondary: { label: "Book Decoration", href: "/shop?category=Decoration%20Packages" },
    footnote: "Same-day delivery before 6 PM · Fully inflated on arrival · Delivery guarantee",
  },
  {
    eyebrow: "Sweet moments, beautifully crafted",
    title: "Cakes & Sweets for Every Celebration",
    sub: "Rich cocoa cakes, soft cream cakes and pastry boxes — baked fresh to order and delivered with your balloons across Dubai.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1800&q=80",
    alt: "Birthday cake in Dubai",
    primary: { label: "Shop Cakes & Sweets", href: "/shop?category=Cakes%20%26%20Sweets" },
    secondary: { label: "Shop Balloons", href: "/shop" },
    footnote: "Baked fresh to order · Same-day delivery before 6 PM · Delivery guarantee",
  },
  {
    eyebrow: "Beautiful flowers, delivered with love",
    title: "Fresh Flowers for Every Occasion",
    sub: "Fresh roses, tulips and lilies — hand-arranged in keepsake boxes and bouquets, delivered fresh across Dubai.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1800&q=80",
    alt: "Fresh tulip bouquet",
    primary: { label: "Shop Flowers", href: "/shop?category=Flowers" },
    secondary: { label: "Shop Balloons", href: "/shop" },
    footnote: "Freshly cut & arranged · Same-day delivery before 6 PM · Delivery guarantee",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // Mirror of `paused` for the auto-advance interval (see below).
  const pausedRef = useRef(false);

  // Keep the ref in sync with the hover state. The interval itself is
  // created exactly ONCE (empty deps) and never re-created: it ticks every
  // 5s and advances only when the ref says the pointer is not over the
  // hero. The previous version re-created the interval on every pause
  // change, so each mouse-enter/leave reset the 5-second clock and
  // auto-advance looked stalled/slow whenever the pointer moved over the
  // hero. Hovering now only skips ticks — it can never reset the clock.
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const t = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  // Explicit, idempotent direction helpers (functional updates, wrap
  // around): next always steps forward 1 → 2 → 3 → 1, prev always steps
  // back 1 → 3 → 2 → 1. Never toggle here — the old combined go(dir)
  // was correct maths, but naming the directions makes the behaviour
  // auditable at the call site.
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <section
      className="relative bg-pine-900 text-cream overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The active slide remounts on change (key) and fades/slides in —
          this keeps the section height natural for every slide's copy. */}
      <div key={index} className="hero-slide-in relative">
        <div className="absolute inset-0 opacity-25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slide.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-pine-950/70 via-pine-950/25 to-transparent" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24">
          <p className="text-xs tracking-[0.3em] uppercase text-gold font-semibold">{slide.eyebrow}</p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight max-w-2xl mt-3">{slide.title}</h1>
          <p className="mt-4 max-w-xl text-cream/85 text-lg">{slide.sub}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={slide.primary.href} className="rounded-full bg-white text-pine-900 px-6 py-3 font-semibold">{slide.primary.label}</Link>
            <Link href={slide.secondary.href} className="rounded-full border border-white/70 px-6 py-3 font-semibold">{slide.secondary.label}</Link>
          </div>
          <p className="mt-4 text-sm text-cream/75">{slide.footnote}</p>
        </div>
      </div>

      {/* ‹ › arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 hover:bg-white/30 text-white w-10 h-10 flex items-center justify-center text-xl backdrop-blur-sm transition"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/15 hover:bg-white/30 text-white w-10 h-10 flex items-center justify-center text-xl backdrop-blur-sm transition"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}: ${s.title}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}
