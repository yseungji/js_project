import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";
import { Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "지주·표지판 제품 소개",
  description: "JS건설의 지주·표지판 제품을 확인하고 현장에 맞는 규격과 문구의 주문 제작을 문의하세요. 시공은 제공하지 않습니다.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "도로 표지판·금속 지주 제품 소개 | JS건설",
    description: "JS건설이 판매하는 도로 표지판과 금속 지주 제품을 사진으로 살펴보세요. 필요한 규격과 문구, 수량, 납품 지역을 알려주시면 맞춤 주문 제작 가능 여부와 구매 방법을 안내합니다. 시공 서비스는 제공하지 않습니다.",
    url: "/products",
    siteName: "JS건설",
    locale: "ko_KR",
    type: "website",
  },
};
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
    <section className="cta-band"><div className="container"><h2>원하는 규격의 제품이 있으신가요?</h2><p>지주·표지판의 규격, 문구, 수량을 알려주시면 맞춤 제작 가능 여부를 상담해 드립니다.</p><Link className="button button-dark" href="/contact">맞춤 제작 문의</Link></div></section>
  </main>;
}
