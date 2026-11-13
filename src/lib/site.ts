/**
 * Single source of truth for site-wide constants.
 *
 * `basePath` MUST match the `basePath` in next.config.ts — it is used to
 * prefix raw <img src> paths, which Next.js does not rewrite automatically
 * (only next/link and next/image get the prefix for free).
 */
export const siteConfig = {
  /** GitHub Pages project sub-path. Empty string for local dev / root domain. */
  basePath: "/australian-saddle-co",
  /** The GitHub repository that hosts the deployed site. */
  repo: "australian-saddle-co",
  /** Canonical origin — used for metadataBase and sitemap URLs. */
  origin: "https://verstige.github.io",
  siteUrl: "https://verstige.github.io/australian-saddle-co",
} as const;

/**
 * Prefix a public asset path with the deployment basePath.
 * Absolute URLs and data URIs are returned untouched.
 */
export function asset(src: string): string {
  if (!src) return src;
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  const clean = src.startsWith("/") ? src : `/${src}`;
  return `${siteConfig.basePath}${clean}`;
}
