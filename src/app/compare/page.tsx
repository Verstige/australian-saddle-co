import type { Metadata } from "next";
import { SaddleComparison } from "@/components/build/SaddleComparison";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare Saddles",
  description:
    "Side-by-side specifications for all eight Australian saddles we build — seat depth, knee pads, panel material, tree, rigging and weight.",
  alternates: { canonical: canonical("/compare") },
};

export default function ComparePage() {
  return (
    <>
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="label text-[10px] text-tan-600">Side by side</p>
          <h1 className="font-display mt-5 max-w-[16ch] text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            Compare the saddles
          </h1>
          <p className="mt-7 max-w-[56ch] text-[16.5px] leading-[1.78] text-ink-muted">
            Eight models, one tree philosophy. The numbers below are each
            saddle&apos;s published specification — seat depth, knee pads,
            panels, weight and rigging — so you can narrow it down before we
            start on your tracings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <SaddleComparison />
      </section>
    </>
  );
}
