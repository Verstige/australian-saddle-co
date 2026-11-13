import Link from "next/link";
import { collections } from "@/data/catalog";
import { shows } from "@/data/shows";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { asset } from "@/lib/site";

const COMPANY = [
  { href: "/about", label: "Our Workshop" },
  { href: "/fitting", label: "Fitting a Saddle" },
  { href: "/shows", label: "Upcoming Shows" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="dark-panel relative overflow-hidden">
      {/* Subtle leather texture band */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src={asset("/images/brand/logo.jpg")}
                alt="Australian Saddle Company"
                width={52}
                height={52}
                className="h-12 w-12 rounded-sm object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <span className="font-display text-[19px] font-semibold text-paper">
                Australian Saddle
              </span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[14px] leading-relaxed text-paper-deep/60">
              Custom made Australian saddles and tack, hand-built in Mt. Vernon,
              Ohio since 1987. We also make leather holsters and supplies for
              mounted shooters and gun owners.
            </p>
            <address className="mt-6 space-y-1 text-[13px] not-italic text-paper-deep/55">
              <p>10700 Old Delaware Rd</p>
              <p>Mt. Vernon, Ohio 43050</p>
              <p className="tnum pt-1">
                <a href="tel:+17403933111" className="hover:text-tan-400">
                  Phone &amp; Fax: 740-393-3111
                </a>
              </p>
              <p>
                <a
                  href="mailto:Australiansaddleco@Gmail.com"
                  className="break-all hover:text-tan-400"
                >
                  Australiansaddleco@Gmail.com
                </a>
              </p>
            </address>
          </div>

          {/* Shop */}
          <nav>
            <p className="label text-[10px] text-tan-400">Shop</p>
            <ul className="mt-5 space-y-2.5">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop/${c.slug}`}
                    className="text-[13.5px] text-paper-deep/60 transition-colors hover:text-paper"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav>
            <p className="label text-[10px] text-tan-400">Company</p>
            <ul className="mt-5 space-y-2.5">
              {COMPANY.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[13.5px] text-paper-deep/60 transition-colors hover:text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Newsletter + next shows */}
          <div>
            <p className="label text-[10px] text-tan-400">Stay in the saddle</p>
            <p className="mt-5 text-[13.5px] leading-relaxed text-paper-deep/60">
              New builds, show dates and Leatherkeep restocks — no noise.
            </p>
            <NewsletterForm />

            <p className="label mt-9 text-[10px] text-tan-400">Next up</p>
            <ul className="mt-4 space-y-3">
              {shows.slice(0, 3).map((s) => (
                <li key={s.name + s.dates}>
                  <div className="flex items-baseline gap-3">
                    <span className="tnum shrink-0 text-[11px] text-tan-400">
                      {s.dates.split(" ")[0]}
                    </span>
                    <span className="text-[13px] leading-snug text-paper-deep/70">
                      {s.name}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/shows"
              className="label mt-4 inline-block text-[10px] text-tan-400 transition-colors hover:text-tan-300"
            >
              Full schedule →
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[10px] text-paper-deep/40">
            © {new Date().getFullYear()} Australian Saddle Company
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { label: "Facebook", href: "https://www.facebook.com/AustralianSaddleCompany/" },
              { label: "Instagram", href: "https://www.instagram.com/australiansaddleco/" },
              { label: "YouTube", href: "https://www.youtube.com/@AussieSaddles" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[10px] text-paper-deep/45 transition-colors hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
