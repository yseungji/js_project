import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";
import { contact } from "@/lib/products";

export const metadata: Metadata = {
  title: "표지판용 금속 지주 판매·맞춤 제작 문의",
  description: "표지판용 금속 지주와 기초 설치형 지주를 사진으로 살펴보세요. 필요한 규격·수량을 문의하면 제작 가능 여부를 상담합니다. 콘크리트 기초와 시공은 포함되지 않습니다.",
  alternates: { canonical: "/products/posts" },
  openGraph: {
    title: "표지판용 금속 지주 판매·맞춤 제작 문의 | JS건설",
    description: "금속 지주의 현장 사진을 보고 희망 규격과 수량을 문의하세요. 콘크리트 기초와 시공은 포함되지 않습니다.",
    url: "/products/posts",
    siteName: "JS건설",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/concrete-base-post.jpg", alt: "금속 지주의 설치 현장 참고 사진" }],
  },
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const products = (await getProducts()).filter((product) => product.category === "post");

  return <main>
    <section className="page-hero"><div className="container">
      <span className="eyebrow">표지판 지주 · 제품 판매</span>
      <h1>표지판용 금속 지주를 찾고 계신가요?</h1>
      <p>표지판을 지지하는 금속 지주의 현장 사진을 확인하고, 필요한 규격의 제작 가능 여부를 문의하세요.</p>
      <div className="button-row landing-actions"><a className="button button-dark" href={`mailto:${contact.email}?subject=${encodeURIComponent("금속 지주 구매 문의")}`}>지주 이메일 문의</a><Link className="button button-white" href="/contact">문의 방법 보기</Link></div>
    </div></section>
    <section className="section"><div className="container">
      <h2>사진으로 확인할 수 있는 금속 지주</h2>
      <p className="section-lead">표지판을 지지하는 지주와 기초에 설치된 지주의 현장 모습을 소개합니다. 사진만으로 지주의 길이·직경·두께를 확정할 수 없어, 필요한 규격은 견적 상담에서 확인합니다.</p>
      <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      {products.length === 0 && <p>현재 공개된 지주 제품이 없습니다. 필요한 제품은 문의해 주세요.</p>}
      <p className="note">기초 설치형 지주 사진 속 콘크리트 기초는 판매 구성에 포함되지 않습니다. 실측 사진은 기초를 보여주는 참고 자료입니다.</p>
    </div></section>
    <section className="section section-tint"><div className="container info-grid">
      <div className="info-card"><h2>지주 문의에 필요한 내용</h2><p>사용하려는 표지판과 지주의 용도, 희망 길이·직경 등 규격, 수량, 납품 지역을 알려주세요. 규격을 모르면 참고 사진을 보내 제작 가능 여부부터 상담할 수 있습니다.</p></div>
      <div className="info-card"><h2>판매 범위를 확인해 주세요</h2><p>판매 대상은 금속 지주입니다. 표지판과 함께 구매할 수 있는지, 실제 재질·가격·판매 단위는 주문 전에 확인해 주세요. 콘크리트 기초와 현장 시공은 포함되지 않습니다.</p></div>
    </div></section>
    <section className="cta-band"><div className="container"><h2>필요한 지주 규격을 알려주세요</h2><p>용도·규격·수량을 이메일로 전달해 주시면 맞춤 제작 가능 여부와 구매 방법을 상담합니다.</p><a className="button button-dark" href={`mailto:${contact.email}?subject=${encodeURIComponent("금속 지주 구매 문의")}`}>이메일 문의</a></div></section>
  </main>;
}
