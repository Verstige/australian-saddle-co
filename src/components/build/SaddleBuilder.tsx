"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, Handbag, ArrowRight, Warning } from "@phosphor-icons/react";
import { products, type Product } from "@/data/catalog";
import { saddleSpecs } from "@/data/saddles";
import { useCart } from "@/components/cart/CartProvider";
import { asset } from "@/lib/site";

type VariantRecord = {
  title: string;
  price: number;
  available: boolean;
  id: number;
  option1?: string;
  option2?: string;
  option3?: string;
};

const SADDLE_HANDLES = saddleSpecs.map((s) => s.handle);

/** Option names in the order we want them presented. */
const OPTION_ORDER = ["Size", "Color", "Style", "Material", "Side", "Studs"];

function optionNameFor(product: Product, index: number): string {
  return (
    OPTION_ORDER[index] ??
    product.options.filter((o) => o !== "Title")[index] ??
    `Option ${index + 1}`
  );
}

export function SaddleBuilder() {
  const { add } = useCart();
  const [handle, setHandle] = useState<string>(SADDLE_HANDLES[0]);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.handle === handle);
  const spec = saddleSpecs.find((s) => s.handle === handle);

  const variants = (product?.variants ?? []) as unknown as VariantRecord[];

  // Real option names, excluding the placeholder "Title".
  const optionNames = useMemo(() => {
    if (!product) return [];
    return product.options.filter(
      (o) => o && o !== "Title" && (product.optionValues[o]?.length ?? 0) > 1,
    );
  }, [product]);

  // Pick a valid default combination whenever the model changes.
  const activeSelection = useMemo(() => {
    if (!product) return {};
    const init: Record<string, string> = {};
    optionNames.forEach((name, index) => {
      const values = product.optionValues[name] ?? [];
      const pick = values.find((val) =>
        variants.some(
          (v) => v.available && variantOption(v, index) === val,
        ),
      );
      init[name] = pick ?? values[0] ?? "";
    });
    return init;
  }, [product, optionNames, variants]);

  // The user's picks, falling back to the valid default.
  const current = { ...activeSelection, ...selected };

  const variant = useMemo(() => {
    if (!optionNames.length) return variants[0];
    return variants.find((v) =>
      optionNames.every(
        (name, index) => variantOption(v, index) === current[name],
      ),
    );
  }, [variants, optionNames, current]);

  const price = variant?.price ?? product?.price ?? 0;
  const inStock = variant ? variant.available : (product?.available ?? false);

  function selectOption(name: string, value: string) {
    setSelected((s) => ({ ...s, [name]: value }));
  }

  function changeModel(next: string) {
    setHandle(next);
    setSelected({});
  }

  function addToKeep() {
    if (!product || !variant || !inStock) return;
    add({
      handle: product.handle,
      title: product.title,
      variantTitle: variant.title,
      price: variant.price,
      qty,
      image: product.images[0] ?? "",
      variantId: variant.id,
    });
  }

  if (!product) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
      {/* ---------------- Model rail ---------------- */}
      <div>
        <p className="label text-[10px] text-tan-600">The eight we build</p>
        <h2 className="font-display mt-3 text-[26px] leading-tight text-leather-900">
          Choose your model
        </h2>

        <ul className="mt-6 border-t border-leather-900/12">
          {saddleSpecs.map((s) => {
            const p = products.find((x) => x.handle === s.handle);
            const active = s.handle === handle;
            return (
              <li key={s.handle} className="border-b border-leather-900/10">
                <button
                  type="button"
                  onClick={() => changeModel(s.handle)}
                  className={`group flex w-full items-center gap-4 py-3.5 text-left transition-colors ${
                    active ? "" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`h-5 w-5 shrink-0 rounded-full border transition-all ${
                      active
                        ? "border-tan-600 bg-tan-600"
                        : "border-leather-900/25"
                    }`}
                  >
                    {active && (
                      <span className="flex h-full w-full items-center justify-center">
                        <Check size={11} weight="bold" className="text-leather-900" />
                      </span>
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="font-display block text-[17px] leading-tight text-leather-900">
                      {s.name}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                      {s.tagline}
                    </span>
                  </span>

                  <span className="tnum shrink-0 text-[13px] text-ink-muted">
                    ${p ? p.price.toFixed(0) : "—"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Spec readout for the chosen model */}
        {spec && (
          <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-leather-900/12 pt-6 sm:grid-cols-3">
            {[
              ["Weight", `${spec.weightLbs} lbs`],
              ["Seat depth", spec.seatDepth],
              ["Knee pads", spec.kneePads],
              ["Panel", spec.panel],
              ["Tree", spec.tree],
              ["Best for", spec.bestFor],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label text-[9px] text-ink-faint">{k}</dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-leather-900">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {spec && (
          <p className="mt-6 border-l-2 border-tan-500 bg-paper-deep/50 px-4 py-3 text-[13.5px] leading-relaxed text-ink-muted">
            {spec.note}
          </p>
        )}
      </div>

      {/* ---------------- Configuration + summary ---------------- */}
      <div className="lg:sticky lg:top-[96px] lg:self-start">
        <div className="border border-leather-900/12 bg-paper-card">
          {/* Preview */}
          <div className="relative">
            <div className="media aspect-4/3">
              {product.images[0] ? (
                <img
                  src={asset(product.images[0])}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="label text-[9px] text-ink-faint">Photo</span>
                </div>
              )}
            </div>
            <span className="label absolute left-4 top-4 bg-leather-900/88 px-2.5 py-1.5 text-[9px] text-paper-deep">
              {product.title}
            </span>
          </div>

          <div className="p-6 sm:p-8">
            {/* Price */}
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <p className="label text-[9.5px] text-ink-faint">Your build</p>
                <p className="font-display mt-1.5 text-[22px] leading-tight text-leather-900">
                  {product.title}
                </p>
              </div>
              <span className="tnum shrink-0 text-[30px] leading-none text-leather-900">
                ${price.toFixed(0)}
              </span>
            </div>

            {/* Option pickers */}
            {optionNames.map((name, index) => {
              const values = product.optionValues[name] ?? [];
              return (
                <div key={name} className="mt-7">
                  <div className="flex items-baseline justify-between">
                    <p className="label text-[10px] text-ink-muted">{name}</p>
                    <p className="tnum text-[12px] text-ink-faint">
                      {current[name]}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {values.map((val) => {
                      const orderable = variants.some(
                        (v) => v.available && variantOption(v, index) === val,
                      );
                      const active = current[name] === val;
                      return (
                        <button
                          key={val}
                          type="button"
                          disabled={!orderable}
                          onClick={() => selectOption(name, val)}
                          className={`relative border px-3.5 py-2 text-[13px] transition-all duration-300 ${
                            active
                              ? "border-leather-900 bg-leather-900 text-paper"
                              : orderable
                                ? "border-leather-900/20 text-ink-muted hover:border-leather-900 hover:text-leather-900"
                                : "cursor-not-allowed border-leather-900/8 text-ink-faint/60 line-through"
                          }`}
                        >
                          {val}
                          {active && (
                            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-tan-500 text-leather-900">
                              <Check size={9} weight="bold" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Quantity + add */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center justify-between border border-leather-900/20 sm:w-32">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-ink-muted transition-colors hover:text-leather-900"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="tnum text-[14px]">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="px-3.5 py-3 text-ink-muted transition-colors hover:text-leather-900"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={addToKeep}
                disabled={!inStock}
                className="btn btn-accent flex-1 disabled:cursor-not-allowed disabled:bg-leather-900/12 disabled:text-ink-faint"
              >
                <Handbag size={16} weight="bold" />
                {inStock ? "Add to keep" : "Unavailable"}
              </button>
            </div>

            {!inStock && (
              <p className="mt-4 flex items-start gap-2 border-l-2 border-tan-500 bg-paper-deep/60 px-4 py-3 text-[13px] leading-relaxed text-ink-muted">
                <Warning size={15} weight="fill" className="mt-0.5 shrink-0 text-tan-600" />
                <span>
                  That combination isn&apos;t stocked, but it&apos;s buildable.
                  Call the workshop at{" "}
                  <a
                    href="tel:+17403933111"
                    className="tnum text-tan-600 hover:text-tan-700"
                  >
                    740-393-3111
                  </a>{" "}
                  and we&apos;ll put it on the bench.
                </span>
              </p>
            )}

            <p className="mt-5 border-t border-leather-900/10 pt-4 text-[12px] leading-relaxed text-ink-faint">
              Custom-built to your tracings. Final price is confirmed when your
              fitting is verified —{" "}
              <Link href="/fitting" className="text-tan-600 underline underline-offset-2">
                see how fitting works
              </Link>
              .
            </p>
          </div>
        </div>

        <Link
          href={`/shop/${product.collection}/${product.handle}`}
          className="label group mt-4 inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
        >
          See full specifications
          <ArrowRight
            size={13}
            weight="bold"
            className="transition-transform duration-400 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}

function variantOption(v: VariantRecord, index: number): string {
  return index === 0 ? (v.option1 ?? "") : index === 1 ? (v.option2 ?? "") : (v.option3 ?? "");
}
