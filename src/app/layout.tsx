import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { absoluteUrl, canonical, siteConfig } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: "Australian Saddle Company — Custom Made Australian Saddles",
    template: "%s — Australian Saddle Company",
  },
  description:
    "Custom made Australian saddles and tack, hand-built in Mt. Vernon, Ohio. Australian stock saddles on an aluminum and wood tree, with oilskin, holsters, girths and our own Aussie Leatherkeep conditioner.",
  keywords: [
    "Australian saddle",
    "stock saddle",
    "poley saddle",
    "custom saddle",
    "horses",
    "equestrian",
    "oilskin",
    "saddle fitting",
  ],
  alternates: {
    canonical: canonical("/"),
  },
  openGraph: {
    title: "Australian Saddle Company — Custom Made Australian Saddles",
    description:
      "Custom made Australian saddles and tack. Hand-built in Mt. Vernon, Ohio since 1987.",
    type: "website",
    images: [absoluteUrl("/images/brand/banner-american-poley.jpg")],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ece1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable} ${mono.variable}`}>
      <body className="grain">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <RevealObserver />
      </body>
    </html>
  );
}
