import Link from "next/link";
import type { Product } from "@/data/catalog";
import { collections } from "@/data/catalog";
import { asset } from "@/lib/site";

const collectionName = (slug: string) =>
  collections.find((c) => c.slug === slug)?.name ?? slug;

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: Product;
  priority?: boolean;
  index?: number;
}) {
  const p = product;
  const multi = p.priceMax > p.price;
  const href = `/shop/${p.collection}/${p.handle}`;

  return (
    <Link
      href={href}
      className="group card-lift reveal block"
      style={{ transitionDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <div className="media relative aspect-4/5 border border-leather-900/10">
        {p.images[0] ? (
          <img
            src={asset(p.images[0])}
            alt={p.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span className="label text-[9px] text-ink-faint">Photo</span>
            <span className="font-display text-[15px] leading-snug text-ink-muted">
              {p.title}
            </span>
            <span className="text-[12px] text-ink-faint">in store</span>
          </div>
        )}

        {!p.available && (
          <span className="label absolute left-3 top-3 bg-leather-900/88 px-2.5 py-1.5 text-[9px] text-paper-deep">
            Sold Out
          </span>
        )}

        {p.available && multi && (
          <span className="label absolute left-3 top-3 bg-tan-500/92 px-2.5 py-1.5 text-[9px] text-leather-900">
            Multiple Sizes
          </span>
        )}

        {p.images.length > 1 && (
          <span className="tnum absolute bottom-3 right-3 bg-leather-900/78 px-2 py-1 text-[10px] text-paper-deep">
            {p.images.length} photos
          </span>
        )}
      </div>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label text-[9px] text-ink-faint">
            {collectionName(p.collection)}
          </p>
          <h3 className="font-display mt-1.5 text-[15px] leading-snug text-leather-900 transition-colors group-hover:text-tan-600">
            {p.title}
          </h3>
        </div>
        <span className="tnum shrink-0 pt-4 text-[14px] text-leather-900">
          {multi ? "From " : ""}${p.price.toFixed(0)}
        </span>
      </div>
    </Link>
  );
}
