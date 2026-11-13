"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, ArrowRight } from "@phosphor-icons/react";
import { collections } from "@/data/catalog";

const LINKS = [
  { href: "/build", label: "Build Your Saddle" },
  { href: "/compare", label: "Compare Saddles" },
  { href: "/shop/all", label: "Full Catalog" },
  { href: "/fitting", label: "Fitting a Saddle" },
  { href: "/shows", label: "Upcoming Shows" },
  { href: "/about", label: "Our Workshop" },
  { href: "/contact", label: "Contact" },
];

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      {/* Scrim */}
      <div
        onClick={onClose}
        aria-hidden
        className={`fixed inset-0 z-50 bg-leather-900/60 backdrop-blur-sm transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!open}
        className={`fixed inset-y-0 left-0 z-[60] flex w-[86vw] max-w-[380px] flex-col bg-paper shadow-[0_0_60px_rgba(28,19,16,0.4)] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-leather-900/12 px-5 py-4">
          <span className="label text-[10px] text-ink-muted">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-leather-900 transition-opacity hover:opacity-60"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6">
          <p className="label text-[10px] text-ink-faint">Shop</p>
          <ul className="mt-4 space-y-1">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  onClick={onClose}
                  className="font-display flex items-baseline justify-between border-b border-leather-900/8 py-3 text-[19px] text-leather-900 transition-colors hover:text-tan-600"
                >
                  {c.name}
                  <span className="tnum text-[11px] text-ink-faint">
                    {c.note ? "" : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="label mt-9 text-[10px] text-ink-faint">Company</p>
          <ul className="mt-4 space-y-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onClose}
                  className="flex items-center justify-between py-2.5 text-[15px] text-ink-muted transition-colors hover:text-leather-900"
                >
                  {l.label}
                  <ArrowRight size={15} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-leather-900/12 px-5 py-5">
          <p className="text-[13px] leading-relaxed text-ink-muted">
            10700 Old Delaware Rd
            <br />
            Mt. Vernon, Ohio 43050
          </p>
          <a
            href="tel:+17403933111"
            className="tnum mt-3 inline-block text-[13px] text-tan-600 hover:text-tan-700"
          >
            740-393-3111
          </a>
        </div>
      </aside>
    </>
  );
}
