import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    <Link href={`/products/${product.slug}`} aria-label={`${product.name} 자세히 보기`} className="product-image">
      <Image src={product.imageUrl} alt={`${product.name} 참고 사진`} fill sizes="(max-width: 720px) 100vw, 50vw" />
    </Link>
    <div className="product-card-content"><h3>{product.name}</h3><p>{product.summary}</p>
      <Link className="button button-outline button-small" href={`/products/${product.slug}`}>자세히 보기</Link>
    </div>
  </article>;
}
