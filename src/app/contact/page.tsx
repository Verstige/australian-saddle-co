import type { Metadata } from "next";
import { Phone, Envelope, MapPin } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/ContactForm";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/contact") },
  title: "Contact Us",
  description:
    "Reach Australian Saddle Company at 10700 Old Delaware Rd, Mt. Vernon, Ohio. Phone or fax 740-393-3111.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-leather-900/10">
        <div className="mx-auto max-w-[1400px] px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16">
          <p className="label text-[10px] text-tan-600">Get in touch</p>
          <h1 className="font-display mt-5 text-[clamp(2.4rem,6.4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.028em] text-leather-900">
            Talk to the
            <br />
            workshop
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Details */}
          <div className="reveal">
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-tan-600" />
                <div>
                  <p className="label text-[9.5px] text-ink-faint">Address</p>
                  <address className="mt-2 text-[15px] not-italic leading-relaxed text-leather-900">
                    Australian Saddle Company
                    <br />
                    10700 Old Delaware Rd
                    <br />
                    Mt. Vernon Ohio 43050
                  </address>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-tan-600" />
                <div>
                  <p className="label text-[9.5px] text-ink-faint">
                    Phone or Fax
                  </p>
                  <a
                    href="tel:+17403933111"
                    className="tnum mt-2 block text-[15px] text-leather-900 transition-colors hover:text-tan-600"
                  >
                    740-393-3111
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <Envelope size={20} className="mt-0.5 shrink-0 text-tan-600" />
                <div>
                  <p className="label text-[9.5px] text-ink-faint">Email</p>
                  <a
                    href="mailto:Australiansaddleco@Gmail.com"
                    className="mt-2 block break-all text-[15px] text-leather-900 transition-colors hover:text-tan-600"
                  >
                    Australiansaddleco@Gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-leather-900/12 pt-8">
              <p className="label text-[10px] text-tan-600">Best for</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Saddle fitting questions and tracings",
                  "Custom build timelines and pricing",
                  "Order status for existing orders",
                  "Wholesale and dealer inquiries",
                  "Leatherkeep and care product questions",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-[14px] text-ink-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-tan-500" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
