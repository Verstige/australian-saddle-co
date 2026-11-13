"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { products, collections } from "@/data/catalog";
import { asset } from "@/lib/site";

const collectionName = (slug: string) =>
  collections.find((c) => c.slug === slug)?.name ?? slug;

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActive(0);
      return;
    }
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          collectionName(p.collection).toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 bg-leather-900/70 backdrop-blur-sm fade-in"
      />

      <div className="relative mx-auto mt-[12vh] w-[min(92vw,760px)] fade-in">
        <div className="overflow-hidden bg-paper-card shadow-[0_30px_80px_-20px_rgba(28,19,16,0.55)]">
          <div className="flex items-center gap-3 border-b border-leather-900/12 px-5">
            <MagnifyingGlass size={20} className="shrink-0 text-ink-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter" && results[active]) {
                  window.location.href = `/shop/${results[active].collection}/${results[active].handle}`;
                }
              }}
              placeholder="Search saddles, tack, oilskin…"
              className="w-full bg-transparent py-5 text-[15px] outline-none placeholder:text-ink-faint"
              aria-label="Search products"
            />
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-ink-muted transition-colors hover:text-leather-900"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          <div className="max-h-[54vh] overflow-y-auto">
            {query.trim() === "" ? (
              <div className="px-5 py-6">
                <p className="label text-[10px] text-ink-faint">Browse</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {collections.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}`}
                      onClick={onClose}
                      className="label border border-leather-900/15 px-3 py-2 text-[10px] text-ink-muted transition-colors hover:border-leather-900 hover:text-leather-900"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="font-display text-lg text-leather-900">
                  Nothing for “{query.trim()}”
                </p>
                <p className="mt-2 text-sm text-ink-muted">
                  Try “saddle”, “oilskin”, “girth” or “holster”.
                </p>
              </div>
            ) : (
              <ul>
                {results.map((p, i) => (
                  <li key={p.handle}>
                    <Link
                      href={`/shop/${p.collection}/${p.handle}`}
                      onClick={onClose}
                      className={`flex items-center gap-4 px-5 py-3 transition-colors ${
                        i === active ? "bg-paper-deep/70" : ""
                      }`}
                    >
                      <span className="media h-12 w-12 shrink-0 border border-leather-900/10">
                        {p.images[0] && (
                          <img
                            src={asset(p.images[0])}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-leather-900">
                          {p.title}
                        </span>
                        <span className="label mt-0.5 block text-[9px] text-ink-faint">
                          {collectionName(p.collection)}
                        </span>
                      </span>
                      <span className="tnum shrink-0 text-sm text-ink-muted">
                        ${p.price.toFixed(2)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
