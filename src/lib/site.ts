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

/**
 * Build a fully-qualified URL for a public asset.
 *
 * Metadata (og:image, twitter:image) is resolved against `metadataBase`, so
 * these must be absolute and must NOT be double-prefixed — hence a dedicated
 * helper rather than `asset()`.
 */
export function absoluteUrl(src: string): string {
  if (!src) return src;
  if (/^https?:\/\//i.test(src)) return src;
  return `${siteConfig.origin}${asset(src)}`;
}

/**
 * Canonical URL for a route, e.g. /shop/saddles/ -> full URL.
 */
export function canonical(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withSlash = clean.endsWith("/") ? clean : `${clean}/`;
  return `${siteConfig.origin}${siteConfig.basePath}/${withSlash.slice(1)}`;
}

