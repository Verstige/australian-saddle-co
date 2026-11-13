import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { products, collections, featuredHandles } from "@/data/catalog";
import { shows } from "@/data/shows";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductRail } from "@/components/product/ProductRail";
import { asset } from "@/lib/site";

const byHandle = (h: string) => products.find((p) => p.handle === h)!;

export default function HomePage() {
  const hero = byHandle("saddle-american-poley");
  const featured = featuredHandles
    .map(byHandle)
    .filter(Boolean);

  return (
    <>
      {/* ============================================================
          HERO — asymmetric split: type left, product right
          ============================================================ */}
      <section className="relative overflow-hidden border-b border-leather-900/10">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20 lg:pt-16">
          {/* Copy column */}
          <div className="stagger">
            <p className="label flex items-center gap-3 text-[10px] text-tan-600">
              <span className="h-px w-8 bg-tan-600" />
              Custom Made · Since 1987
            </p>

            <h1 className="font-display mt-7 text-[clamp(2.6rem,7.2vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.025em] text-leather-900">
              Saddles built
              <br />
              for the long
              <br />
              <span className="relative inline-block">
                ride
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="10"
                  viewBox="0 0 200 10"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M2 7C42 3 96 2 198 5"
                    stroke="var(--color-tan-500)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="mt-8 max-w-[46ch] text-[16px] leading-[1.75] text-ink-muted">
              Australian stock saddles, hand-built on our proprietary aluminum
              and wood tree in Mt. Vernon, Ohio. Shaped to your horse&apos;s
              tracings, not the other way around.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/shop/saddles" className="btn btn-primary">
                Shop the saddles
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link href="/fitting" className="btn btn-ghost">
                How fitting works
              </Link>
            </div>

            {/* Proof strip */}
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-px overflow-hidden border border-leather-900/12 bg-leather-900/12">
              {[
                { k: "77", v: "Products built" },
                { k: "8", v: "Saddle models" },
                { k: "1987", v: "In Mt. Vernon" },
              ].map((s) => (
                <div key={s.v} className="bg-paper px-4 py-4">
                  <dt className="tnum text-[26px] leading-none text-leather-900">
                    {s.k}
                  </dt>
                  <dd className="label mt-2 text-[9px] leading-relaxed text-ink-muted">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Product column */}
          <div className="relative">
            <div className="relative overflow-hidden border border-leather-900/12 bg-paper-card">
              <div className="media aspect-5/6 sm:aspect-4/5">
                {hero.images[0] && (
                  <img
                    src={asset(hero.images[0])}
                    alt={hero.title}
                    className="h-full w-full object-cover"
                    fetchPriority="high"
                  />
                )}
              </div>

              {/* Floating spec card */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-leather-900/12 bg-paper-card/95 px-5 py-4 backdrop-blur-sm sm:right-auto sm:w-[290px] sm:border-l sm:border-t-0">
                <p className="label text-[9px] text-tan-600">Featured build</p>
                <p className="font-display mt-1.5 text-[19px] leading-tight text-leather-900">
                  {hero.title}
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="tnum text-[15px] text-leather-900">
                    From ${hero.price.toFixed(0)}
                  </span>
                  <Link
                    href={`/shop/${hero.collection}/${hero.handle}`}
                    className="label inline-flex items-center gap-1.5 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
                  >
                    Details
                    <ArrowUpRight size={13} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Stamped badge */}
            <div
              className="absolute -right-2 -top-5 hidden h-[104px] w-[104px] rotate-12 items-center justify-center rounded-full border border-tan-500/45 bg-paper-card text-center sm:flex"
              aria-hidden
            >
              <span className="label text-[8.5px] leading-[1.5] text-tan-600">
                Hand
                <br />
                Built
                <br />
                USA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          TICKER — running strip
          ============================================================ */}
      <div className="overflow-hidden border-b border-leather-900/10 bg-leather-900 py-3">
        <div className="ticker">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex shrink-0">
                {[
                  "Aluminum & Wood Tree",
                  "Web-Suspended Seat",
                  "Merino Sheepskin Panels",
                  "Kidskin-Lined Holsters",
                  "Oilskin & Canvas",
                  "Fitted To Your Tracings",
                  "Made In Ohio",
                ].map((t) => (
                  <span
                    key={`${dup}-${t}`}
                    className="label flex shrink-0 items-center gap-5 px-5 text-[9.5px] text-paper-deep/70"
                  >
                    {t}
                    <span className="h-1 w-1 rotate-45 bg-tan-500" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================
          FEATURED SADDLES — horizontal rail
          ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-[10px] text-tan-600">The catalog</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-leather-900">
                Every saddle we
                <br className="hidden sm:block" /> build
              </h2>
            </div>
            <Link
              href="/shop/saddles"
              className="label group inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
            >
              All saddles
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <ProductRail products={featured} />
        </div>
      </section>

      {/* ============================================================
          CRAFT — split editorial
          ============================================================ */}
      <section className="dark-panel relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:py-24">
          <div className="reveal">
            <p className="label text-[10px] text-tan-400">The build</p>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-paper">
              A tree that
              <br />
              fits your horse
            </h2>
            <p className="mt-7 max-w-[48ch] text-[15.5px] leading-[1.8] text-paper-deep/65">
              Most saddles are bought off a rack. Ours start with a tracing of
              your horse&apos;s back, taken while they stand square with their
              head up. That tracing shapes the tree — wood and aluminum, cut and
              fitted by hand — so the saddle sits where it should on the only
              horse that will ever wear it.
            </p>

            <Link href="/fitting" className="btn btn-invert mt-9">
              See the fitting process
              <ArrowRight size={15} weight="bold" />
            </Link>
          </div>

          {/* Spec table — the real numbers */}
          <div className="reveal">
            <dl className="border-t border-paper/15">
              {[
                {
                  k: "Tree",
                  v: "Aluminum and wood, adjustable, built to order",
                },
                { k: "Seat", v: "Web-suspended, 5″ depth standard" },
                { k: "Knee pads", v: "3.5″ Mustermaster up to 4.5″ US Poley" },
                { k: "Panels", v: "1.25″ genuine Merino sheepskin" },
                { k: "Weight", v: "26–30 lbs without fittings" },
                { k: "Girthing", v: "In-skirt D-rigging, converts to western" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="flex flex-col gap-1 border-b border-paper/12 py-4 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <dt className="label w-32 shrink-0 text-[9.5px] text-tan-400">
                    {row.k}
                  </dt>
                  <dd className="text-[14.5px] leading-relaxed text-paper-deep/85">
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============================================================
          CATEGORIES — asymmetric grid
          ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="reveal">
            <p className="label text-[10px] text-tan-600">Everything else</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-leather-900">
              The rest of the kit
            </h2>
          </div>

          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {collections
              .filter((c) => c.slug !== "saddles")
              .map((c, i) => {
                const items = products.filter((p) => p.collection === c.slug);
                const lead = items.find((p) => p.images[0]) ?? items[0];
                const sizes = ["lg:col-span-2", "", ""];
                return (
                  <Link
                    key={c.slug}
                    href={`/shop/${c.slug}`}
                    className={`group reveal ${sizes[i % 3]}`}
                    style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                  >
                    <div className="media aspect-4/3 border border-leather-900/10">
                      {lead?.images[0] && (
                        <img
                          src={asset(lead.images[0])}
                          alt={c.name}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-[22px] leading-tight text-leather-900 transition-colors group-hover:text-tan-600">
                          {c.name}
                        </h3>
                        <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-muted">
                          {c.blurb}
                        </p>
                      </div>
                      <span className="tnum shrink-0 pt-1 text-[12px] text-ink-faint">
                        {items.length}
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ============================================================
          LEATHERKEEP — feature block
          ============================================================ */}
      <section className="border-y border-leather-900/10 bg-paper-deep">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="reveal">
            <p className="label text-[10px] text-tan-600">House formula</p>
            <h2 className="font-display mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-leather-900">
              Aussie Leatherkeep
            </h2>
            <p className="mt-6 max-w-[50ch] text-[15.5px] leading-[1.8] text-ink-muted">
              Developed over a decade ago, Aussie Leatherkeep is widely
              regarded as the best leather conditioner on the market. Made with
              all-natural ingredients — tallow and lanolin to soften, pine
              extract and tea tree oil to prevent mold, and beeswax for
              waterproofing — it nourishes and protects your leather gear like
              no other.
            </p>
            <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {[
                "Tallow & lanolin to soften",
                "Pine extract against mold",
                "Tea tree oil",
                "Beeswax waterproofing",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-[13.5px] text-ink-muted"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-tan-500" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/shop/leatherkeep"
              className="btn btn-primary mt-9"
            >
              Shop Leatherkeep
              <ArrowRight size={15} weight="bold" />
            </Link>
          </div>

          <div className="reveal grid grid-cols-2 gap-4">
            {["leatherkeep-tub", "leatherkeep-tin"].map((h, i) => {
              const p = byHandle(h);
              if (!p?.images[0]) return null;
              return (
                <Link
                  key={h}
                  href={`/shop/${p.collection}/${p.handle}`}
                  className="group media aspect-square border border-leather-900/12 bg-paper-card"
                >
                  <img
                    src={asset(p.images[0])}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 left-0 right-0 border-t border-leather-900/10 bg-paper-card/95 px-3 py-2.5 backdrop-blur-sm">
                    <span className="block text-[13px] text-leather-900">
                      {p.title}
                    </span>
                    <span className="tnum mt-0.5 block text-[12px] text-ink-muted">
                      ${p.price.toFixed(2)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          SHOWS — upcoming
          ============================================================ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="label text-[10px] text-tan-600">Find us in the field</p>
              <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-leather-900">
                Upcoming shows
              </h2>
            </div>
            <Link
              href="/shows"
              className="label group inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
            >
              Full schedule
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-400 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="mt-10 border-t border-leather-900/12">
            {shows.slice(0, 5).map((s, i) => (
              <div
                key={s.name + s.dates}
                className="reveal group grid grid-cols-1 gap-2 border-b border-leather-900/10 py-5 transition-colors hover:bg-paper-card sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <span className="tnum text-[12px] text-tan-600 sm:w-52">
                  {s.dates}
                </span>
                <span>
                  <span className="font-display block text-[19px] leading-tight text-leather-900">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-[13px] text-ink-muted">
                    {s.location} · {s.booth}
                  </span>
                </span>
                <a
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label inline-flex items-center gap-1.5 text-[9.5px] text-ink-faint transition-colors hover:text-tan-600 sm:justify-self-end"
                >
                  {s.websiteLabel}
                  <ArrowUpRight size={12} weight="bold" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
