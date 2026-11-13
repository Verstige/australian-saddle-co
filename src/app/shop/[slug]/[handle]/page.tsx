import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { products, collections } from "@/data/catalog";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductRail } from "@/components/product/ProductRail";
import { asset } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({
    slug: p.collection,
    handle: p.handle,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const p = products.find((x) => x.handle === handle);
  if (!p) return { title: "Product" };
  return {
    title: p.title,
    description:
      p.description.slice(0, 155) ||
      `${p.title} from Australian Saddle Company.`,
    openGraph: { images: p.images.slice(0, 3).map(asset) },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string; handle: string }>;
}) {
  const { handle } = await params;
  const product = products.find((p) => p.handle === handle);
  if (!product) notFound();

  const collection = collections.find((c) => c.slug === product.collection);
  const related = products
    .filter((p) => p.collection === product.collection && p.handle !== product.handle)
    .slice(0, 6);

  // Pull structured spec lines out of the description (Weight / Seat Depth / etc.)
  const specLines = product.description
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^(weight|seat depth|kneepads?|panel type|seat|panels?)\b/i.test(l));

  const paragraphs = product.description
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="label text-[9.5px] text-ink-faint">
          <Link href="/" className="transition-colors hover:text-tan-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/shop/${product.collection}`}
            className="transition-colors hover:text-tan-600"
          >
            {collection?.name ?? product.collection}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink-muted">{product.title}</span>
        </nav>
      </div>

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} title={product.title} />

          {/* Buy column */}
          <div className="lg:sticky lg:top-[96px] lg:self-start">
            <p className="label text-[10px] text-tan-600">
              {collection?.name}
            </p>
            <h1 className="font-display mt-3 text-[clamp(2rem,4.6vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.022em] text-leather-900">
              {product.title}
            </h1>

            {paragraphs.length > 0 && (
              <div className="mt-6 space-y-4">
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className="max-w-[56ch] text-[15px] leading-[1.78] text-ink-muted"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {specLines.length > 0 && (
              <dl className="mt-8 border-t border-leather-900/12">
                {specLines.map((line, i) => {
                  const [k, ...rest] = line.split(":");
                  return (
                    <div
                      key={i}
                      className="flex items-baseline gap-4 border-b border-leather-900/10 py-3"
                    >
                      <dt className="label w-28 shrink-0 text-[9.5px] text-ink-faint">
                        {k.trim()}
                      </dt>
                      <dd className="tnum text-[13.5px] text-leather-900">
                        {rest.join(":").trim()}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            )}

            <div className="mt-9">
              <ProductPurchase product={product} />
            </div>

            {/* Assurance row */}
            <ul className="mt-9 grid gap-3 border-t border-leather-900/12 pt-6 sm:grid-cols-2">
              {[
                { t: "Built to order", d: "Made after your tracings are confirmed" },
                { t: "Fitting help", d: "Walk us through it at 740-393-3111" },
                { t: "Made in Ohio", d: "10700 Old Delaware Rd, Mt. Vernon" },
                { t: "Leatherkeep", d: "Our conditioner keeps it supple" },
              ].map((a) => (
                <li key={a.t}>
                  <p className="label text-[9.5px] text-tan-600">{a.t}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                    {a.d}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-leather-900/10 py-16 sm:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.3rem)] font-semibold leading-tight tracking-[-0.02em] text-leather-900">
                More from {collection?.name}
              </h2>
              <Link
                href={`/shop/${product.collection}`}
                className="label group inline-flex items-center gap-2 text-[10px] text-ink-muted transition-colors hover:text-tan-600"
              >
                View all
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="transition-transform duration-400 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
          <div className="mt-9">
            <ProductRail products={related} />
          </div>
        </section>
      )}
    </>
  );
}
