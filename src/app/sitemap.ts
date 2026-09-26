import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/firebase-server";
import { absoluteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  return [
    { url: absoluteUrl("/"), priority: 1 },
    { url: absoluteUrl("/products"), priority: 0.9 },
    { url: absoluteUrl("/products/signs"), priority: 0.8 },
    { url: absoluteUrl("/products/posts"), priority: 0.8 },
    { url: absoluteUrl("/company"), priority: 0.6 },
    { url: absoluteUrl("/contact"), priority: 0.6 },
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${encodeURIComponent(product.slug)}`),
      priority: 0.8,
    })),
  ];
}
