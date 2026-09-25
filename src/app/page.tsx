import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "JS건설 | 지주·표지판 제품 판매",
    description: "JS건설의 도로 표지판과 금속 지주를 살펴보세요. 현장에 맞는 지주·표지판의 맞춤 제작과 구매를 문의할 수 있습니다. 제품만 판매하며 시공은 제공하지 않습니다.",
    url: "/",
    siteName: "JS건설",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/school-zone-sign.jpg", alt: "어린이보호구역 표지판과 금속 지주" }],
  },
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = (await getProducts()).slice(0, 3);
  return <main>
    <section className="hero"><div className="container hero-grid">
      <div><span className="eyebrow pill">지주 · 표지판 판매</span>
        <h1>지주·표지판,<br />현장에 맞게 주문 제작하세요.</h1>
        <p>필요한 규격과 문구, 수량을 알려주세요.<br />JS건설이 지주·표지판 맞춤 제작과 구매 문의를 상담합니다.</p>
        <div className="button-row"><Link className="button button-dark" href="/products">제품 둘러보기</Link><Link className="button button-white" href="/contact">구매 문의</Link></div>
      </div>
      <div className="hero-image"><Image src="/images/school-zone-sign.jpg" alt="어린이보호구역 표지판과 금속 지주가 설치된 도로" fill priority sizes="(max-width: 800px) 100vw, 50vw" /></div>
    </div></section>
    <section className="section"><div className="container"><span className="eyebrow">PRODUCTS</span><h2>찾고 계신 제품을 선택하세요</h2>
      <p className="section-lead">현재 사진 자료가 있는 상품으로 제품을 안내합니다. 추가 상품은 준비되는 대로 등록합니다.</p>
      <div className="product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </div></section>
    <section className="section section-tint"><div className="container"><span className="eyebrow">HOW TO ORDER</span><h2>제품을 확인하고 편하게 문의하세요</h2>
      <div className="steps"><div><b>01</b><h3>제품 선택</h3><p>표지판 또는 지주를 확인</p></div><div><b>02</b><h3>필요 조건 정리</h3><p>규격·수량·납품 지역 정리</p></div><div><b>03</b><h3>상담 연결</h3><p>전화·이메일 문의</p></div></div>
    </div></section>
    <section className="section"><div className="container"><h2>JS건설이 판매합니다</h2><p className="section-lead">JS건설은 도로 공사 분야의 법인 회사입니다. 지주와 표지판은 현장에 필요한 조건에 맞춰 주문 제작을 상담합니다. 제품 판매만 진행하며 시공은 제공하지 않습니다.</p></div></section>
    <section className="cta-band"><div className="container"><h2>필요한 규격이 따로 있으신가요?</h2><p>지주·표지판의 규격, 문구, 수량을 알려주시면 맞춤 제작 가능 여부를 상담해 드립니다.</p><div className="button-row"><Link className="button button-dark" href="/contact">전화 문의</Link><Link className="button button-white" href="/contact">이메일 문의</Link></div></div></section>
  </main>;
}
