"use client";
import { useEffect, useRef, useState } from "react";

// Animated trust strip — same 4 texts, word for word. Each item has an
// inline SVG icon with its own looping animation (balloon floats, truck
// slides, star twinkles, shield pulses) and the items fade in one by one
// when the strip scrolls into view (it sits just under the hero, so on
// most screens this fires on load).
const ICON_PROPS = {
  className: "w-7 h-7 text-pine-800",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const ITEMS = [
  {
    title: "Fully Inflated",
    desc: "Arrives ready to enjoy — no setup needed.",
    anim: "trust-float",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <ellipse cx="12" cy="8" rx="6" ry="7" />
        <path d="M11 15h2l-1 2z" />
        <path d="M12 17c0 2-2 2-1 4s1 2 0 3" />
      </svg>
    ),
  },
  {
    title: "Same-Day Delivery",
    desc: "Order before 6 PM for same-day delivery in Dubai.",
    anim: "trust-drive",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M1.5 7h11v9h-11z" />
        <path d="M12.5 10h4.5l3 3v3h-7.5z" />
        <circle cx="6" cy="18" r="1.8" />
        <circle cx="16.5" cy="18" r="1.8" />
      </svg>
    ),
  },
  {
    title: "Premium Quality",
    desc: "High-quality balloons with elegant finishes.",
    anim: "trust-twinkle",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M12 2.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 8.8l6.1-.7z" />
      </svg>
    ),
  },
  {
    title: "Delivery Guarantee",
    desc: "Replacement or refund if damaged on arrival.",
    anim: "trust-pulse",
    icon: (
      <svg {...ICON_PROPS} aria-hidden="true">
        <path d="M12 2.5l7.5 2.8v6c0 4.8-3.2 8.6-7.5 10.2C7.7 19.9 4.5 16.1 4.5 11.3v-6z" />
        <path d="M8.5 11.8l2.4 2.4 4.6-5" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`mx-auto max-w-7xl px-4 -mt-6 relative ${visible ? "trust-visible" : ""}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white rounded-2xl shadow p-4 text-center">
        {ITEMS.map((item, i) => (
          <div key={item.title} className="trust-item rounded-xl px-2 py-2" style={{ transitionDelay: `${i * 120}ms` }}>
            <span className={`inline-flex ${item.anim}`}>{item.icon}</span>
            <p className="font-serif font-semibold text-pine-900 mt-1">{item.title}</p>
            <p className="text-sm text-stone-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
