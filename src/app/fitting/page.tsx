import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/fitting") },
  title: "Fitting a Saddle",
  description:
    "How to measure your horse for an Australian saddle. Send us tracings and a side photo with the head up, and we'll shape the tree to fit.",
};

const STEPS = [
  {
    n: "01",
    t: "Stand square",
    d: "Your horse stands on level ground, all four feet square, weight even on both sides. A crooked horse gives a crooked tracing.",
  },
  {
    n: "02",
    t: "Trace the back",
    d: "Lay a heavy paper or cardboard over the horse's back from the withers to the point of the shoulder and trace the topline by hand. Don't mark the paper — draw it.",
  },
  {
    n: "03",
    t: "Head up, one photo",
    d: "Take a good side picture with the horse's head up. We compare it against your tracings to read the shoulder angle and the topline.",
  },
  {
    n: "04",
    t: "Send it in",
    d: "Email us the tracing and the photo. We read them, talk through the numbers, and put your saddle on the bench.",
  },
];

export default function FittingPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="label text-[10px] text-tan-600">Getting it right</p>
          <h1 className="font-display mt-5 max-w-[16ch] text-[clamp(2.4rem,6.4vw,4.6rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            How to measure
            <br />
            your horse
          </h1>
          <p className="mt-7 max-w-[54ch] text-[16.5px] leading-[1.78] text-ink-muted">
            A saddle is shaped to a back, not to a size chart. Colin walks
            through the tracing method we use on every build — the same one we
            ask for before we cut a tree.
          </p>
        </div>
      </section>

      {/* Video */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <div className="reveal grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          <div className="relative overflow-hidden border border-leather-900/12 bg-leather-900">
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/u0ydK4ltraY?rel=0&showinfo=0&vq=720"
                title="Correct Saddle Measurements — Aussie Colin Dangard explains"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          <div className="reveal lg:pt-4">
            <p className="label text-[10px] text-tan-600">Watch</p>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-leather-900">
              Correct Saddle
              <br />
              Measurements
            </h2>
            <p className="mt-5 text-[15px] leading-[1.78] text-ink-muted">
              Listen to Colin explain a way to help us see your horse without
              being there. When sending in your tracings, don&apos;t forget to
              include a good side picture of your horse with his or her head up
              so we can compare with your tracings.
            </p>
            <p className="label mt-8 text-[10px] text-ink-faint">
              From AussieSaddles on YouTube
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-leather-900/10 bg-paper-deep">
        <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
          <p className="label text-[10px] text-tan-600">The method</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-leather-900">
            Four steps, one tracing
          </h2>

          <ol className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className="reveal border-t-2 border-leather-900 pt-5"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="tnum text-[11px] text-tan-600">{s.n}</span>
                <h3 className="font-display mt-3 text-[21px] leading-tight text-leather-900">
                  {s.t}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.75] text-ink-muted">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-20">
        <div className="reveal grid gap-8 border border-leather-900/12 bg-paper-card p-8 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] font-semibold leading-tight text-leather-900">
              Send us your tracing
            </h2>
            <p className="mt-4 max-w-[50ch] text-[15px] leading-[1.75] text-ink-muted">
              We&apos;ll read it, talk through the numbers, and put your saddle
              on the bench. No obligation, and we&apos;ll tell you honestly if
              what we build isn&apos;t what your horse needs.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:Australiansaddleco@Gmail.com?subject=Saddle%20fitting%20tracing"
              className="btn btn-primary"
            >
              Email the workshop
              <ArrowRight size={15} weight="bold" />
            </a>
            <Link href="/shop/saddles" className="btn btn-ghost">
              Browse saddles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
