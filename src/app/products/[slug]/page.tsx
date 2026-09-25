import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/firebase-server";
import { contact } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return product ? { title: product.name, description: product.summary } : { title: "제품을 찾을 수 없습니다" };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  return <main><section className="section"><div className="container detail-grid">
    <div><div className="detail-image"><Image src={product.imageUrl} alt={`${product.name} 상품 사진`} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
      {product.additionalImageUrl && <figure className="detail-additional"><a href={product.additionalImageUrl} target="_blank" rel="noopener noreferrer" aria-label="규격 참고 사진 원본 보기"><Image src={product.additionalImageUrl} alt={product.additionalImageCaption || `${product.name} 추가 사진`} width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" /></a><figcaption>{product.additionalImageCaption || "제품 상세 참고 사진"} · 클릭하면 원본 사진이 열립니다.</figcaption></figure>}
      <p className="note">사진은 제품 구성 참고용입니다. 정확한 규격과 판매 단위는 문의 시 확인해 주세요.</p></div>
    <div className="detail-copy"><span className="eyebrow">제품 판매 · 시공 미제공</span><h1>{product.name}</h1><p>{product.summary}</p>
      <div className="detail-meta"><strong>가격&nbsp; {product.priceLabel}</strong><p>규격 · 재질 · 판매 단위&nbsp; {product.specification === "확인 후 안내" ? "확인 예정" : product.specification}</p></div>
      <div className="button-row"><a className="button button-dark" href={`tel:${contact.phone.replaceAll("-", "")}`}>전화 문의</a><a className="button button-white" href={`mailto:${contact.email}?subject=${encodeURIComponent(product.name + " 구매 문의")}`}>이메일 문의</a></div>
    </div>
  </div></section>
  <section className="section section-tint"><div className="container info-grid"><div className="info-card"><h2>제품 정보</h2><p>{product.description}</p><ul><li>규격: {product.specification}</li><li>재질: {product.material}</li><li>판매 단위: {product.saleUnit}</li><li>시공 서비스는 제공하지 않습니다.</li></ul></div>
    <div className="info-card"><h2>이렇게 알려주시면 상담이 빨라집니다</h2><div className="help-list"><div>제품 종류</div><div>필요 규격·수량</div><div>납품 지역·일정</div></div></div></div></section>
  <section className="cta-band"><div className="container"><h2>제품이 필요하신가요?</h2><div className="button-row"><a className="button button-dark" href={`tel:${contact.phone.replaceAll("-", "")}`}>전화 문의</a><Link className="button button-white" href="/contact">문의 방법 보기</Link></div></div></section></main>;
}
