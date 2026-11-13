import type { Product } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";

/**
 * Horizontal product rail — snap-scrolled on mobile, a draggable strip on desktop.
 * Uses CSS scroll-snap rather than a JS carousel so it stays accessible and
 * degrades to native scrolling.
 */
export function ProductRail({ products }: { products: Product[] }) {
  return (
    <div className="no-bar relative">
      <div
        className="flex gap-5 overflow-x-auto px-4 pb-2 sm:px-6"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((p, i) => (
          <div
            key={p.handle}
            className="w-[248px] shrink-0 sm:w-[286px]"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={p} index={i} priority={i < 3} />
          </div>
        ))}

        {/* Trailing spacer so the last card isn't flush to the edge */}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </div>
  );
}
