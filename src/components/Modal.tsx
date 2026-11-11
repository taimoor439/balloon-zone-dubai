"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Centred popup modal rendered through a portal to document.body.
 *
 * Why a portal: the promo/callback modals used to render inside the
 * sticky header, whose `backdrop-blur` makes it a containing block for
 * `position: fixed` descendants — so `fixed inset-0` was sized to the
 * header strip instead of the viewport. The dialog then overflowed
 * above the screen (🎉 icon and × button clipped off) and the backdrop
 * only covered the header, so backdrop clicks could not dismiss it.
 * Rendering into document.body puts the overlay against the viewport.
 *
 * Close behaviour: × button, backdrop click, and Escape all call
 * onClose. Background scroll is locked while open.
 */
export default function Modal({
  open,
  onClose,
  label,
  dialogClassName = "",
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  dialogClassName?: string;
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div
        className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl p-6 ${dialogClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 z-10 text-2xl leading-none text-stone-500 hover:text-pine-900"
          aria-label="Close"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
