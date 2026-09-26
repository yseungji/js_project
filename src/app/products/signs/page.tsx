import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";
import { inquiryMailto } from "@/lib/inquiry-mailto";

export const metadata: Metadata = {
  title: "도로 표지판 판매·맞춤 제작 문의",
  description: "어린이보호구역 표지판 등 도로 표지판 제품을 사진으로 확인하고 필요한 문구·규격·수량을 문의하세요. JS건설은 제품만 판매하며 시공은 제공하지 않습니다.",
  alternates: { canonical: "/products/signs" },
  openGraph: {
    title: "도로 표지판 판매·맞춤 제작 문의 | JS건설",
    description: "어린이보호구역 표지판을 살펴보고 필요한 문구와 규격을 문의하세요. 제품만 판매하며 시공은 제공하지 않습니다.",
    url: "/products/signs",
    siteName: "JS건설",
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/images/school-zone-sign.jpg", alt: "어린이보호구역 표지판 현장 사진" }],
  },
};

export const dynamic = "force-dynamic";

export default async function SignsPage() {
  const products = (await getProducts()).filter((product) => product.category === "sign");
  const mailto = inquiryMailto({ productName: "도로 표지판", category: "sign" });

  return <main>
    <section className="page-hero"><div className="container">
      <span className="eyebrow">도로 표지판 · 제품 판매</span>
      <h1>도로 표지판을 찾고 계신가요?</h1>
      <p>현재 등록된 표지판을 사진으로 살펴보고, 필요한 문구와 규격의 제작 가능 여부를 문의하세요.</p>
      <div className="button-row landing-actions"><a className="button button-dark" href={mailto}>표지판 이메일 문의</a><Link className="button button-white" href="/contact">문의 방법 보기</Link></div>
    </div></section>
    <section className="section"><div className="container">
      <h2>사진으로 확인할 수 있는 표지판</h2>
      <p className="section-lead">어린이보호구역 표지판 사진에는 보호구역 표시, 제한속도 30 표시와 ‘여기부터’ 보조표지가 보입니다. 표지판과 보조표지의 실제 판매 구성은 주문 전에 확인해 주세요.</p>
      <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
      {products.length === 0 && <p>현재 공개된 표지판 제품이 없습니다. 필요한 제품은 문의해 주세요.</p>}
      <p className="note">현장 사진은 형태를 보여주는 참고 자료입니다. 사진 속 설치·시공 서비스는 제공하지 않습니다.</p>
    </div></section>
    <section className="section section-tint"><div className="container info-grid">
      <div className="info-card"><h2>어떤 내용을 문의하면 되나요?</h2><p>원하는 표지판의 표시 문구와 참고 사진, 희망 규격, 수량, 납품 지역을 알려주세요. 사진과 다른 문구나 형태가 필요하다면 제작 가능 여부를 상담해 드립니다.</p></div>
      <div className="info-card"><h2>주문 전에 확인할 사항</h2><p>정확한 규격·재질·가격과 보조표지 포함 여부는 제품별로 문의해 주세요. JS건설은 표지판 제품 판매만 진행하며 현장 시공은 제공하지 않습니다.</p></div>
    </div></section>
    <section className="cta-band"><div className="container"><h2>필요한 표지판을 알려주세요</h2><p>문구·규격·수량을 이메일로 전달해 주시면 맞춤 제작 가능 여부와 구매 방법을 상담합니다.</p><a className="button button-dark" href={mailto}>이메일 문의</a></div></section>
  </main>;
}
