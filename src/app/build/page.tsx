import type { Metadata } from "next";
import { SaddleBuilder } from "@/components/build/SaddleBuilder";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Build Your Saddle",
  description:
    "Choose your model, seat size, colour and finish. Every Australian saddle is built to your horse's tracings — configure yours here.",
  alternates: { canonical: canonical("/build") },
};

export default function BuildPage() {
  return (
    <>
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <p className="label text-[10px] text-tan-600">Configure</p>
          <h1 className="font-display mt-5 max-w-[15ch] text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            Build your saddle
          </h1>
          <p className="mt-7 max-w-[54ch] text-[16.5px] leading-[1.78] text-ink-muted">
            Pick a model and make it yours. Every saddle we build is shaped to
            one horse&apos;s tracings — this is where you choose the starting
            point, and the workshop does the rest.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-16">
        <SaddleBuilder />
      </section>
    </>
  );
}
