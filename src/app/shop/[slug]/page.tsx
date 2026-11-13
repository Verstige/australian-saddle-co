import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, collections } from "@/data/catalog";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopShell } from "@/components/shop/ShopShell";
import { canonical } from "@/lib/site";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = collections.find((x) => x.slug === slug);
  if (!c) return { title: "Shop" };
  return {
    title: c.name,
    description: c.blurb,
    alternates: { canonical: canonical(`/shop/${c.slug}`) },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  const items = products.filter((p) => p.collection === slug);

  return (
    <ShopShell collection={collection} products={items} />
  );
}
