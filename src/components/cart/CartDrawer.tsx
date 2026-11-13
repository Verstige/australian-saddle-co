"use client";

import Link from "next/link";
import { X, Trash, Minus, Plus, ArrowRight } from "@phosphor-icons/react";
import { useCart } from "@/components/cart/CartProvider";
import { asset } from "@/lib/site";

export function CartDrawer() {
  const { lines, isOpen, close, remove, setQty, subtotal, count } = useCart();

  return (
    <>
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[65] bg-leather-900/60 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-[68] flex w-[92vw] max-w-[430px] flex-col bg-paper shadow-[0_0_70px_rgba(28,19,16,0.45)] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-leather-900/12 px-5 py-4">
          <span className="label text-[10px] text-ink-muted">
            Your Keep · {count} {count === 1 ? "item" : "items"}
          </span>
          <button
            type="button"
            onClick={close}
            className="p-1 text-leather-900 transition-opacity hover:opacity-60"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="stitch-y h-16 w-px" />
            <p className="font-display mt-6 text-[26px] leading-tight text-leather-900">
              Your keep is empty
            </p>
            <p className="mt-3 max-w-[30ch] text-[14px] leading-relaxed text-ink-muted">
              Hand-built saddles, tack, and oilskin — all made to order in Mt.
              Vernon, Ohio.
            </p>
            <Link
              href="/shop/all"
              onClick={close}
              className="btn btn-primary mt-7"
            >
              Browse the catalog
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5">
              {lines.map((line) => (
                <li
                  key={line.key}
                  className="flex gap-4 border-b border-leather-900/10 py-5"
                >
                  <span className="media h-[72px] w-[72px] shrink-0 border border-leather-900/10">
                    {line.image && (
                      <img
                        src={asset(line.image)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/shop/${line.handle}`}
                      onClick={close}
                      className="font-display block text-[15px] leading-snug text-leather-900 hover:text-tan-600"
                    >
                      {line.title}
                    </Link>
                    {line.variantTitle &&
                      line.variantTitle !== "Default Title" && (
                        <p className="mt-1 text-[12px] text-ink-muted">
                          {line.variantTitle}
                        </p>
                      )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-leather-900/18">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          className="p-1.5 text-ink-muted transition-colors hover:text-leather-900"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} weight="bold" />
                        </button>
                        <span className="tnum w-7 text-center text-[13px]">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          className="p-1.5 text-ink-muted transition-colors hover:text-leather-900"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} weight="bold" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="tnum text-[14px] text-leather-900">
                          ${(line.price * line.qty).toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => remove(line.key)}
                          className="text-ink-faint transition-colors hover:text-tan-600"
                          aria-label={`Remove ${line.title}`}
                        >
                          <Trash size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-leather-900/12 bg-paper-card px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="label text-[10px] text-ink-muted">Subtotal</span>
                <span className="tnum text-[22px] text-leather-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-faint">
                Shipping and tax calculated at checkout. Custom-built saddles
                ship after fitting is confirmed.
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="btn btn-accent mt-4 w-full"
              >
                Checkout
                <ArrowRight size={15} weight="bold" />
              </Link>
              <button
                type="button"
                onClick={close}
                className="label mt-3 w-full py-2 text-[10px] text-ink-muted transition-colors hover:text-leather-900"
              >
                Keep shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
