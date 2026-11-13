import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="label text-[10px] text-tan-600">404</p>
      <h1 className="font-display mt-5 text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.03em] text-leather-900">
        Wrong stirrup
      </h1>
      <p className="mt-6 max-w-[42ch] text-[15.5px] leading-relaxed text-ink-muted">
        That page isn&apos;t in the catalog. It may have sold out, moved, or
        never existed in the first place.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/shop/all" className="btn btn-primary">
          Browse all products
          <ArrowRight size={15} weight="bold" />
        </Link>
        <Link href="/" className="btn btn-ghost">
          Back home
        </Link>
      </div>
    </section>
  );
}
