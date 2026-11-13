"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { ArrowRight, Warning, ArrowSquareOut } from "@phosphor-icons/react";
import { asset } from "@/lib/site";
import { buildCheckoutUrl } from "@/lib/checkout";

export default function CheckoutPage() {
  const { lines, subtotal, count, setQty, remove } = useCart();
  const [error, setError] = useState<string | null>(null);

  const checkoutUrl = buildCheckoutUrl(lines);

  if (lines.length === 0) {
    return (
      <section className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-[44ch] text-center">
          <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight text-leather-900">
            Your keep is empty
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            Nothing to check out yet. Every saddle is built to order — find the
            one that fits your horse.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/build" className="btn btn-accent">
              Build a saddle
              <ArrowRight size={15} weight="bold" />
            </Link>
            <Link href="/shop/saddles" className="btn btn-ghost">
              Browse saddles
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
      <p className="label text-[10px] text-tan-600">Final step</p>
      <h1 className="font-display mt-4 text-[clamp(2.2rem,5.4vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-leather-900">
        Your order
      </h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <ol className="border-t border-leather-900/12">
            {lines.map((l) => (
              <li
                key={l.key}
                className="flex gap-4 border-b border-leather-900/10 py-5"
              >
                <span className="media h-[84px] w-[84px] shrink-0 border border-leather-900/10">
                  {l.image && (
                    <img src={asset(l.image)} alt="" className="h-full w-full object-cover" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[16px] leading-snug text-leather-900">
                    {l.title}
                  </p>
                  {l.variantTitle && l.variantTitle !== "Default Title" && (
                    <p className="mt-1 text-[12.5px] text-ink-muted">{l.variantTitle}</p>
                  )}
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border border-leather-900/18">
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        className="px-3 py-1.5 text-[13px] text-ink-muted hover:text-leather-900"
                      >
                        −
                      </button>
                      <span className="tnum w-7 text-center text-[13px]">{l.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        className="px-3 py-1.5 text-[13px] text-ink-muted hover:text-leather-900"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(l.key)}
                      className="text-[12px] text-ink-faint underline underline-offset-4 hover:text-tan-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="tnum shrink-0 text-[15px] text-leather-900">
                  ${(l.price * l.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <aside className="lg:sticky lg:top-[96px] lg:self-start">
          <div className="border border-leather-900/12 bg-paper-card p-7">
            <div className="flex items-baseline justify-between">
              <span className="label text-[10px] text-ink-muted">
                Subtotal · {count} {count === 1 ? "item" : "items"}
              </span>
              <span className="tnum text-[28px] text-leather-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <dl className="mt-6 space-y-2.5 border-t border-leather-900/10 pt-5 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Shipping</dt>
                <dd className="tnum text-ink-muted">Calculated next</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Tax</dt>
                <dd className="tnum text-ink-muted">Calculated next</dd>
              </div>
            </dl>

            {checkoutUrl ? (
              <>
                <a
                  href={checkoutUrl}
                  className="btn btn-accent mt-7 w-full"
                  onClick={() => setError(null)}
                >
                  Checkout securely
                  <ArrowSquareOut size={15} weight="bold" />
                </a>
                <p className="mt-4 text-[12px] leading-relaxed text-ink-faint">
                  Takes you to our live store to enter payment and shipping.
                  Your selection carries over exactly as shown.
                </p>
              </>
            ) : (
              <div className="mt-7 border-l-2 border-tan-500 bg-paper-deep/60 px-4 py-3">
                <p className="flex items-start gap-2 text-[13px] leading-relaxed text-ink-muted">
                  <Warning
                    size={15}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-tan-600"
                  />
                  <span>
                    This item needs a quote before it can be ordered online. Call
                    the workshop at{" "}
                    <a
                      href="tel:+17403933111"
                      className="tnum text-tan-600 hover:text-tan-700"
                    >
                      740-393-3111
                    </a>{" "}
                    and we&apos;ll set it up.
                  </span>
                </p>
              </div>
            )}

            {error && <p className="mt-3 text-[12px] text-tan-700">{error}</p>}

            <p className="mt-4 border-t border-leather-900/10 pt-4 text-[12px] leading-relaxed text-ink-faint">
              Custom-built saddles ship after your fitting is confirmed — we
              &apos;ll call to go over it.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
