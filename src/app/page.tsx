import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/firebase-server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = (await getProducts()).slice(0, 2);
  return <main>
    <section className="hero"><div className="container hero-grid">
      <div><span className="eyebrow pill">지주 · 표지판 판매</span>
        <h1>필요한 도로 표지 제품,<br />한곳에서 확인하세요.</h1>
        <p>JS건설이 지주와 표지판의 구매 문의를 받습니다.<br />제품을 확인하고 편한 방법으로 연락해 주세요.</p>
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
    <section className="section"><div className="container"><h2>JS건설이 판매합니다</h2><p className="section-lead">JS건설은 도로 공사 분야의 법인 회사입니다. 이 사이트에서는 지주와 표지판을 판매하며 시공은 제공하지 않습니다.</p></div></section>
    <section className="cta-band"><div className="container"><h2>어떤 제품이 필요하신가요?</h2><p>제품 종류와 수량을 알려주시면 상담을 시작할 수 있습니다.</p><div className="button-row"><Link className="button button-dark" href="/contact">전화 문의</Link><Link className="button button-white" href="/contact">이메일 문의</Link></div></div></section>
  </main>;
}
