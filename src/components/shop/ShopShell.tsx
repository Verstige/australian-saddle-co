"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Faders, X } from "@phosphor-icons/react";
import type { Product, Collection } from "@/data/catalog";
import { collections } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "name", label: "A–Z" },
];

export function ShopShell({
  collection,
  products,
}: {
  collection: Collection;
  products: Product[];
}) {
  const [sort, setSort] = useState<Sort>("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const priceCeiling = useMemo(
    () => Math.ceil(Math.max(...products.map((p) => p.priceMax), 0) / 50) * 50,
    [products],
  );

  const visible = useMemo(() => {
    let out = [...products];
    if (onlyAvailable) out = out.filter((p) => p.available);
    if (maxPrice !== null) out = out.filter((p) => p.price <= maxPrice);

    switch (sort) {
      case "price-asc":
        out.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        out.sort((a, b) => b.price - a.price);
        break;
      case "name":
        out.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return out;
  }, [products, sort, onlyAvailable, maxPrice]);

  const activeFilters = (onlyAvailable ? 1 : 0) + (maxPrice !== null ? 1 : 0);

  const reset = () => {
    setOnlyAvailable(false);
    setMaxPrice(null);
  };

  const filterPanel = (
    <div className="space-y-7">
      <div>
        <p className="label text-[10px] text-ink-faint">Availability</p>
        <label className="mt-3 flex cursor-pointer items-center gap-3 text-[13.5px] text-ink-muted transition-colors hover:text-leather-900">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="h-4 w-4 shrink-0 accent-[var(--color-tan-600)]"
          />
          In stock only
        </label>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <p className="label text-[10px] text-ink-faint">Max price</p>
          {maxPrice !== null && (
            <button
              type="button"
              onClick={() => setMaxPrice(null)}
              className="label text-[9px] text-tan-600 hover:text-tan-700"
            >
              Clear
            </button>
          )}
        </div>
        <input
          type="range"
          min={0}
          max={priceCeiling}
          step={10}
          value={maxPrice ?? priceCeiling}
          onChange={(e) => {
            const v = Number(e.target.value);
            setMaxPrice(v >= priceCeiling ? null : v);
          }}
          className="mt-4 w-full accent-[var(--color-tan-600)]"
          aria-label="Maximum price"
        />
        <p className="tnum mt-2 text-[12.5px] text-ink-muted">
          {maxPrice === null ? `Up to $${priceCeiling}` : `Up to $${maxPrice}`}
        </p>
      </div>

      <div>
        <p className="label text-[10px] text-ink-faint">Other collections</p>
        <ul className="mt-3 space-y-1.5">
          {collections
            .filter((c) => c.slug !== collection.slug)
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop/${c.slug}`}
                  className="text-[13.5px] text-ink-muted transition-colors hover:text-tan-600"
                >
                  {c.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {activeFilters > 0 && (
        <button
          type="button"
          onClick={reset}
          className="label w-full border border-leather-900/18 py-2.5 text-[9.5px] text-ink-muted transition-colors hover:border-leather-900 hover:text-leather-900"
        >
          Reset filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Page header */}
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <nav aria-label="Breadcrumb" className="label text-[9.5px] text-ink-faint">
            <Link href="/" className="transition-colors hover:text-tan-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">{collection.name}</span>
          </nav>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-[clamp(2.3rem,5.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-leather-900">
                {collection.name}
              </h1>
            </div>
            <div>
              <p className="max-w-[52ch] text-[15.5px] leading-[1.75] text-ink-muted">
                {collection.blurb}
              </p>
              {collection.note && (
                <p className="mt-3 text-[13px] italic text-ink-faint">
                  {collection.note}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="sticky top-[61px] z-30 border-b border-leather-900/10 bg-paper/93 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="label flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-leather-900 lg:hidden"
            >
              <Faders size={15} />
              Filter
              {activeFilters > 0 && (
                <span className="tnum flex h-4 min-w-4 items-center justify-center rounded-full bg-tan-600 px-1 text-[9px] text-paper-card">
                  {activeFilters}
                </span>
              )}
            </button>
            <span className="tnum text-[12px] text-ink-muted">
              {visible.length} {visible.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={`label px-2.5 py-1.5 text-[9.5px] transition-colors ${
                  sort === s.id
                    ? "text-tan-600"
                    : "text-ink-faint hover:text-leather-900"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid + sidebar */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-14">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-[124px]">{filterPanel}</div>
          </aside>

          {/* Products */}
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-leather-900/20 px-6 py-20 text-center">
              <p className="font-display text-[24px] leading-tight text-leather-900">
                Nothing matches those filters
              </p>
              <p className="mt-3 max-w-[36ch] text-[14px] leading-relaxed text-ink-muted">
                Try widening the price range, or clear the availability filter.
              </p>
              <button type="button" onClick={reset} className="btn btn-ghost mt-7">
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((p, i) => (
                <ProductCard key={p.handle} product={p} index={i % 4} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter sheet */}
      <div
        className={`fixed inset-0 z-[66] lg:hidden ${filtersOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!filtersOpen}
      >
        <div
          onClick={() => setFiltersOpen(false)}
          className={`absolute inset-0 bg-leather-900/60 backdrop-blur-sm transition-opacity duration-400 ${
            filtersOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto bg-paper px-5 pb-8 pt-5 transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
            filtersOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <span className="label text-[10px] text-ink-muted">Filter</span>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="p-1 text-leather-900"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
          {filterPanel}
          <button
            type="button"
            onClick={() => setFiltersOpen(false)}
            className="btn btn-primary mt-7 w-full"
          >
            Show {visible.length} {visible.length === 1 ? "item" : "items"}
          </button>
        </div>
      </div>
    </>
  );
}
