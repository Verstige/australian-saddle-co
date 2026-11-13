"use client";

import { useMemo, useState } from "react";
import { Check, Handbag, Minus, Plus } from "@phosphor-icons/react";
import type { Product } from "@/data/catalog";
import { useCart } from "@/components/cart/CartProvider";

/** Shopify variant objects carry option1/option2/option3 as flat fields. */
type VariantRecord = {
  title: string;
  price: number;
  available: boolean;
  id?: number;
  option1?: string;
  option2?: string;
  option3?: string;
};

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();

  // Only surface options that actually have more than one choice.
  const optionNames = product.options.filter(
    (o) => o && o !== "Title" && (product.optionValues[o]?.length ?? 0) > 1,
  );

  const variants = product.variants as unknown as VariantRecord[];

  const optionOf = (v: VariantRecord, index: number) =>
    index === 0 ? v.option1 : index === 1 ? v.option2 : v.option3;

  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    optionNames.forEach((name, index) => {
      const values = product.optionValues[name] ?? [];
      // Prefer a value that is actually orderable.
      const orderable = values.find((val) =>
        variants.some(
          (v) => v.available && optionOf(v, index) === val,
        ),
      );
      init[name] = orderable ?? values[0] ?? "";
    });
    return init;
  });

  const [qty, setQty] = useState(1);

  const variant = useMemo(() => {
    if (!optionNames.length) return variants[0];
    return variants.find((v) =>
      optionNames.every(
        (name, index) => optionOf(v, index) === selected[name],
      ),
    );
  }, [variants, optionNames, selected]);

  const price = variant?.price ?? product.price;
  const inStock = variant ? variant.available : product.available;

  function addToKeep() {
    if (!variant || !inStock) return;
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

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <span className="tnum text-[34px] leading-none text-leather-900">
          ${price.toFixed(2)}
        </span>
        {product.priceMax > product.price && (
          <span className="tnum text-[14px] text-ink-faint line-through">
            ${product.priceMax.toFixed(0)}
          </span>
        )}
      </div>

      {optionNames.map((name) => {
        const values = product.optionValues[name] ?? [];
        const index = optionNames.indexOf(name);
        return (
          <div key={name} className="mt-7">
            <div className="flex items-baseline justify-between">
              <p className="label text-[10px] text-ink-muted">{name}</p>
              <p className="tnum text-[12px] text-ink-faint">{selected[name]}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {values.map((val) => {
                const orderable = variants.some(
                  (v) => v.available && optionOf(v, index) === val,
                );
                const active = selected[name] === val;
                return (
                  <button
                    key={val}
                    type="button"
                    disabled={!orderable}
                    onClick={() => setSelected((s) => ({ ...s, [name]: val }))}
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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex items-center justify-between border border-leather-900/20 sm:w-36">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3.5 py-3 text-ink-muted transition-colors hover:text-leather-900"
            aria-label="Decrease quantity"
          >
            <Minus size={14} weight="bold" />
          </button>
          <span className="tnum text-[14px]">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="px-3.5 py-3 text-ink-muted transition-colors hover:text-leather-900"
            aria-label="Increase quantity"
          >
            <Plus size={14} weight="bold" />
          </button>
        </div>

        <button
          type="button"
          onClick={addToKeep}
          disabled={!inStock}
          className="btn btn-accent flex-1 disabled:cursor-not-allowed disabled:bg-leather-900/12 disabled:text-ink-faint"
        >
          <Handbag size={16} weight="bold" />
          {inStock ? "Add to keep" : "Sold out"}
        </button>
      </div>

      {!inStock && (
        <p className="mt-4 border-l-2 border-tan-500 bg-paper-deep/60 px-4 py-3 text-[13px] leading-relaxed text-ink-muted">
          This combination is built to order. Call the workshop at{" "}
          <a
            href="tel:+17403933111"
            className="tnum text-tan-600 hover:text-tan-700"
          >
            740-393-3111
          </a>{" "}
          and we&apos;ll put it on the bench.
        </p>
      )}
    </div>
  );
}
