import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { shows } from "@/data/shows";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/shows") },
  title: "Upcoming Shows",
  description:
    "Find Australian Saddle Company at Cheyenne Frontier Days, the Quarter Horse Congress, Equine Affaire, Cowboy Christmas and more.",
};

export default function ShowsPage() {
  return (
    <>
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="label text-[10px] text-tan-600">On the road</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            Upcoming
            <br />
            shows
          </h1>
          <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.78] text-ink-muted">
            We&apos;ll have saddles on the stand, holsters on the wall, and
            Leatherkeep on the counter. Come find out which saddle fits your
            horse — we can take tracings on the spot.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
          <ol className="border-t border-leather-900/12">
            {shows.map((s, i) => (
              <li
                key={s.name + s.dates}
                className="reveal group border-b border-leather-900/10 transition-colors hover:bg-paper-card"
                style={{ transitionDelay: `${Math.min(i, 6) * 60}ms` }}
              >
                <div className="grid gap-4 px-1 py-7 sm:grid-cols-[180px_1fr_200px] sm:items-baseline sm:gap-10">
                  <div>
                    <p className="tnum text-[15px] text-tan-600">{s.dates}</p>
                    <p className="label mt-2 text-[9px] text-ink-faint">
                      {s.booth}
                    </p>
                  </div>

                  <div>
                    <h2 className="font-display text-[clamp(1.35rem,2.8vw,1.9rem)] leading-tight text-leather-900">
                      {s.name}
                    </h2>
                    <p className="mt-2 text-[14px] text-ink-muted">{s.location}</p>
                    <p className="mt-1 text-[13px] text-ink-faint">{s.address}</p>
                  </div>

                  <a
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600 sm:justify-self-end"
                  >
                    {s.websiteLabel}
                    <ArrowRight size={14} weight="bold" />
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-leather-900/10 bg-paper-deep">
        <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-16">
          <div className="reveal grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.2rem)] font-semibold leading-tight text-leather-900">
                Can&apos;t make a show? We&apos;ll come to you.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.75] text-ink-muted">
                The workshop is open at 10700 Old Delaware Rd in Mt. Vernon,
                Ohio. Call ahead and we&apos;ll have a saddle on the stand and
                your horse&apos;s tracing sheet ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+17403933111" className="btn btn-primary">
                Call 740-393-3111
              </a>
              <Link href="/contact" className="btn btn-ghost">
                Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
