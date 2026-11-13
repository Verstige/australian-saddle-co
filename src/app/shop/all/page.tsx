import type { Metadata } from "next";
import { products } from "@/data/catalog";
import { ShopShell } from "@/components/shop/ShopShell";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: canonical("/shop/all") },
  title: "Full Catalog",
  description:
    "Every Australian saddle, piece of tack, holster, oilskin and leather conditioner we build — all 77 products from Australian Saddle Company.",
};

export default function AllProductsPage() {
  return (
    <ShopShell
      collection={{
        name: "Full Catalog",
        slug: "all",
        blurb:
          "Every saddle, piece of tack, holster, oilskin and conditioner we build — all in one place.",
        note: "Built to order in Mt. Vernon, Ohio.",
      }}
      products={products}
    />
  );
}
