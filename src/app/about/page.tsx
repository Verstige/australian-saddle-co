import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Our Workshop",
  description:
    "Australian Saddle Company has been building custom Australian saddles and tack in Mt. Vernon, Ohio since 1987.",
};

export default function AboutPage() {
  const saddleCount = products.filter((p) => p.collection === "saddles").length;

  return (
    <>
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="label text-[10px] text-tan-600">Mt. Vernon, Ohio · Est. 1987</p>
          <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            We make custom
            <br />
            Australian saddles
          </h1>
          <p className="mt-7 max-w-[56ch] text-[16.5px] leading-[1.78] text-ink-muted">
            We make custom Australian saddles and tack. We also make leather
            holsters and supplies for mounted shooters and gun owners, among
            other products.
          </p>
        </div>
      </section>

      {/* Story — asymmetric editorial */}
      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <div className="reveal">
            <p className="label text-[10px] text-tan-600">The bench</p>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.02em] text-leather-900">
              One tree,
              <br />
              one horse
            </h2>
            <div className="mt-7 space-y-5">
              <p className="max-w-[54ch] text-[15.5px] leading-[1.8] text-ink-muted">
                Every saddle we build starts as a trace of a single horse&apos;s
                back. From that tracing we shape an aluminum and wood tree,
                rig the web-suspended seat, and hang Merino sheepskin panels
                underneath — the same panels a mounted shooter would need to
                stay comfortable across a long day in the saddle.
              </p>
              <p className="max-w-[54ch] text-[15.5px] leading-[1.8] text-ink-muted">
                The result is a saddle that sits where it should and stays
                there. That principle hasn&apos;t changed since we opened in
                1987, and it&apos;s why the Mustermaster has become our most
                popular build.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-px overflow-hidden border border-leather-900/12 bg-leather-900/12">
              {[
                { k: "1987", v: "Workshop opened" },
                { k: String(saddleCount), v: "Saddle models" },
                { k: "Mt. Vernon", v: "Ohio, USA" },
              ].map((s) => (
                <div key={s.v} className="bg-paper px-4 py-5">
                  <dt className="tnum text-[22px] leading-none text-leather-900">
                    {s.k}
                  </dt>
                  <dd className="label mt-2 text-[9px] leading-relaxed text-ink-muted">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* What we build — list */}
          <div className="reveal">
            <p className="label text-[10px] text-tan-600">What we build</p>
            <ul className="mt-5 border-t border-leather-900/12">
              {[
                ["Saddles", "Custom Australian stock saddles on an aluminum and wood tree"],
                ["Tack", "Bridles, breastplates, halters, stirrups and leathers"],
                ["Oilskin", "Coats, vests, ponchos and leg warmers for the ride out"],
                ["Holsters", "Kidskin-lined leather holsters and scabbards"],
                ["Girths", "Australian and western rigging, overgirths and billets"],
                ["Leatherkeep", "Our own all-natural leather conditioner"],
              ].map(([t, d]) => (
                <li
                  key={t}
                  className="flex flex-col gap-1 border-b border-leather-900/10 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <span className="label w-28 shrink-0 text-[9.5px] text-tan-600">
                    {t}
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-ink-muted">
                    {d}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/shop/all" className="btn btn-primary mt-9">
              See all 77 products
              <ArrowRight size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quote band */}
      <section className="dark-panel">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
          <blockquote className="reveal max-w-[26ch]">
            <p className="font-display text-[clamp(1.7rem,3.8vw,2.8rem)] font-medium leading-[1.14] tracking-[-0.015em] text-paper">
              “The saddle has to suit the horse before it suits the rider.”
            </p>
            <footer className="label mt-7 text-[10px] text-tan-400">
              The workshop standard · Since 1987
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
