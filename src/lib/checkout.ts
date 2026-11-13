import type { CartLine } from "@/components/cart/CartProvider";

/** The live Shopify store that actually takes payment. */
export const SHOP_ORIGIN = "https://www.australiansaddleco.com";

/**
 * Build a Shopify cart permalink for the given lines.
 *
 * Shopify's cart API sends no CORS headers, so a cross-origin `fetch` from a
 * static host is blocked. A cart permalink is a plain navigation, which
 * bypasses CORS entirely: the browser follows it to the shop's own domain,
 * where the cart is created server-side and the customer lands on live
 * checkout with the right line items and totals.
 *
 * Format: /cart/{variantId}:{qty},{variantId}:{qty}
 *
 * Returns null when no line carries a variant id (nothing to hand off).
 */
export function buildCartPermalink(lines: CartLine[]): string | null {
  const usable = lines.filter(
    (l) => typeof l.variantId === "number" && l.variantId > 0 && l.qty > 0,
  );
  if (!usable.length) return null;

  const path = usable
    .map((l) => `${l.variantId}:${l.qty}`)
    .join(",");

  return `${SHOP_ORIGIN}/cart/${path}`;
}

/**
 * Same as buildCartPermalink but carries a source tag through to the shop.
 * Shopify preserves the cart, so the workshop can see which pages produced
 * an order.
 */
export function buildCheckoutUrl(
  lines: CartLine[],
  source = "australian-saddle-co",
): string | null {
  const base = buildCartPermalink(lines);
  if (!base) return null;
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}ref=${encodeURIComponent(source)}`;
}
