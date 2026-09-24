import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";
import { Category } from "@/lib/products";

export const metadata: Metadata = { title: "지주·표지판 제품 소개", description: "JS건설의 도로 표지판과 지주 제품을 확인하고 구매 문의하세요." };
export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const selected = category === "sign" || category === "post" ? category as Category : null;
  const products = (await getProducts()).filter(product => !selected || product.category === selected);
  return <main><section className="page-hero"><div className="container"><h1>지주와 표지판을 살펴보세요</h1><p>현재 사진 자료가 있는 제품을 우선 안내합니다. 제품 규격과 가격은 상담 시 확인해 주세요.</p></div></section>
    <section className="section"><div className="container"><div className="filters" aria-label="제품 분류">
      <Link className={`filter ${!selected ? "active" : ""}`} href="/products">전체 제품</Link>
      <Link className={`filter ${selected === "sign" ? "active" : ""}`} href="/products?category=sign">표지판</Link>
      <Link className={`filter ${selected === "post" ? "active" : ""}`} href="/products?category=post">지주</Link>
    </div><div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
    {products.length === 0 && <p>아직 등록된 제품이 없습니다.</p>}
    <p className="note">사진은 제품 구성 참고용입니다. 규격·재질·판매 단위는 확인 후 기재합니다.</p></div></section>
    <section className="cta-band"><div className="container"><h2>찾는 제품이 있으신가요?</h2><p>필요한 규격과 수량을 알려주시면 상담해 드립니다.</p><Link className="button button-dark" href="/contact">구매 문의</Link></div></section>
  </main>;
}
