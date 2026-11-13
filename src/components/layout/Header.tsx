"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, MagnifyingGlass, X, Handbag } from "@phosphor-icons/react";
import { collections } from "@/data/catalog";
import { useCart } from "@/components/cart/CartProvider";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { MobileNav } from "@/components/layout/MobileNav";
import { asset } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile nav whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Announcement strip */}
      <div className="bg-leather-900 text-paper-deep">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-2 sm:px-6">
          <p className="label text-[10px] text-tan-400">
            Custom built · Mt. Vernon, Ohio
          </p>
          <p className="label hidden text-[10px] text-paper-deep/70 sm:block">
            Free shipping on orders over $150
          </p>
          <Link
            href="/shows"
            className="label text-[10px] text-paper-deep/70 transition-colors hover:text-tan-400"
          >
            Show Schedule
          </Link>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-paper/92 backdrop-blur-md border-b border-leather-900/10"
            : "bg-paper border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3 sm:px-6">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 text-leather-900 transition-opacity hover:opacity-60 lg:hidden"
            aria-label="Open menu"
          >
            <List size={22} weight="bold" />
          </button>

          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
            aria-label="Australian Saddle Company — home"
          >
            <img
              src={asset("/images/brand/logo.jpg")}
              alt=""
              width={44}
              height={44}
              className="h-9 w-9 object-contain sm:h-11 sm:w-11"
            />
            <span className="hidden sm:block leading-none">
              <span className="font-display block text-[17px] font-semibold tracking-tight text-leather-900">
                Australian Saddle
              </span>
              <span className="label mt-1 block text-[9px] text-ink-muted">
                Company · Est. 1987
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="ml-4 hidden items-center gap-1 lg:flex">
            <Link
              href="/build"
              className={`label relative px-3 py-2 text-[10px] transition-colors ${
                isActive("/build")
                  ? "text-tan-600"
                  : "text-ink-muted hover:text-leather-900"
              }`}
            >
              Build
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-tan-600 transition-transform duration-400 ${
                  isActive("/build") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
            <Link
              href="/compare"
              className={`label relative px-3 py-2 text-[10px] transition-colors ${
                isActive("/compare")
                  ? "text-tan-600"
                  : "text-ink-muted hover:text-leather-900"
              }`}
            >
              Compare
              <span
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-tan-600 transition-transform duration-400 ${
                  isActive("/compare") ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className={`label relative px-3 py-2 text-[10px] transition-colors ${
                  isActive(`/shop/${c.slug}`)
                    ? "text-tan-600"
                    : "text-ink-muted hover:text-leather-900"
                }`}
              >
                {c.name}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-tan-600 transition-transform duration-400 ${
                    isActive(`/shop/${c.slug}`)
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 text-leather-900 transition-opacity hover:opacity-60"
              aria-label="Search products"
            >
              <MagnifyingGlass size={19} />
            </button>

            <button
              type="button"
              onClick={open}
              className="relative p-2.5 text-leather-900 transition-opacity hover:opacity-60"
              aria-label={`Open cart, ${count} items`}
            >
              <Handbag size={19} />
              {count > 0 && (
                <span className="tnum absolute right-0.5 top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-tan-600 px-1 text-[10px] font-medium text-paper-card">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
