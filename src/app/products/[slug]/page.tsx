import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/firebase-server";
import { contact } from "@/lib/products";

export const dynamic = "force-dynamic";

const productGuides: Record<string, {
  scope: string;
  photo: string;
  inquiry: string;
  imageNotice: string;
  additionalImageCaption?: string;
}> = {
  "school-zone-sign": {
    scope: "사진 속 어린이보호구역 표지판과 ‘여기부터’ 보조표지를 소개합니다. 표지판과 보조표지의 판매 구성은 주문 전 문의로 확인해 주세요.",
    photo: "대표 사진에서 어린이보호구역 표시, 제한속도 30 표시와 아래쪽 ‘여기부터’ 보조표지를 확인할 수 있습니다.",
    inquiry: "필요한 표시 문구, 희망 규격, 수량과 납품 지역을 알려주시면 맞춤 제작 가능 여부와 견적을 상담합니다.",
    imageNotice: "현장 사진은 제품 형태를 보여주는 참고 자료입니다. 사진 속 설치·시공 서비스는 제공하지 않습니다.",
  },
  "sign-post": {
    scope: "판매 문의 대상은 표지판을 지지하는 금속 지주입니다. 사진 속 표지판과의 판매 구성은 견적 시 확인해 주세요.",
    photo: "대표 사진에서 표지판 아래에 세워진 지주의 형태를 확인할 수 있습니다. 길이·직경·두께는 사진만으로 확정할 수 없습니다.",
    inquiry: "지주의 용도, 희망 규격과 수량, 납품 지역을 알려주시면 제작 가능 여부와 판매 단위를 상담합니다.",
    imageNotice: "설치된 모습은 참고용입니다. 지주 판매만 진행하며 현장 시공 서비스는 제공하지 않습니다.",
  },
  "concrete-base-post": {
    scope: "판매 대상은 금속 지주입니다. 사진 속 콘크리트 기초는 판매 구성에 포함되지 않습니다.",
    photo: "대표 사진은 금속 지주의 설치 현장 예시입니다. 추가 사진은 콘크리트 기초를 자로 확인한 참고 장면으로, 지주의 확정 치수를 뜻하지 않습니다.",
    inquiry: "필요한 지주의 규격과 수량, 납품 지역을 알려주시면 맞춤 제작 가능 여부와 견적을 상담합니다.",
    imageNotice: "콘크리트 기초는 판매 구성에 포함되지 않습니다. 사진은 제품 형태와 설치 상태를 참고하기 위한 자료입니다.",
    additionalImageCaption: "콘크리트 기초 실측 참고 사진 · 기초 미포함",
  },
};

function isConfirmedDetail(value?: string) {
  const detail = value?.trim();
  return Boolean(detail && detail !== "확인 후 안내" && detail !== "확인 예정");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  return product
    ? {
        title: product.name,
        description: product.summary,
        alternates: { canonical: `/products/${encodeURIComponent(product.slug)}` },
        openGraph: {
          title: `${product.name} 판매·맞춤 제작 문의 | JS건설`,
          description: `JS건설의 ${product.name} 제품을 사진과 함께 확인하세요. 필요한 규격과 수량, 납품 지역을 알려주시면 맞춤 주문 제작 가능 여부와 구매 방법을 상담해 드립니다. 제품만 판매하며 시공 서비스는 제공하지 않습니다.`,
          url: `/products/${encodeURIComponent(product.slug)}`,
          siteName: "JS건설",
          locale: "ko_KR",
          type: "website",
          images: [{ url: product.imageUrl, alt: `${product.name} 상품 사진` }],
        },
      }
    : { title: "제품을 찾을 수 없습니다", robots: { index: false, follow: false } };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const guide = productGuides[product.slug];
  const confirmedDetails = [
    { label: "규격", value: product.specification },
    { label: "재질", value: product.material },
    { label: "판매 단위", value: product.saleUnit },
  ].filter(({ value }) => isConfirmedDetail(value));
  return <main><section className="section"><div className="container detail-grid">
    <div><div className="detail-image"><Image src={product.imageUrl} alt={`${product.name} 상품 사진`} fill priority sizes="(max-width: 900px) 100vw, 50vw" /></div>
      {product.additionalImageUrl && <figure className="detail-additional"><a href={product.additionalImageUrl} target="_blank" rel="noopener noreferrer" aria-label="참고 사진 원본 보기"><Image src={product.additionalImageUrl} alt={guide?.additionalImageCaption || product.additionalImageCaption || `${product.name} 추가 사진`} width={800} height={600} sizes="(max-width: 900px) 100vw, 50vw" /></a><figcaption>{guide?.additionalImageCaption || product.additionalImageCaption || "제품 상세 참고 사진"} · 클릭하면 원본 사진이 열립니다.</figcaption></figure>}
      <p className="note">{guide?.imageNotice || "사진은 제품 구성 참고용입니다. 정확한 규격과 판매 단위는 문의 시 확인해 주세요."}</p></div>
    <div className="detail-copy"><span className="eyebrow">제품 판매 · 시공 미제공</span><h1>{product.name}</h1><p>{product.summary}</p>
      <div className="detail-meta"><strong>가격&nbsp; {product.priceLabel || "견적 문의"}</strong><p>{product.detailScope?.trim() || guide?.scope || "필요한 제품 규격과 판매 구성을 문의해 주세요."}</p></div>
      <div className="button-row"><a className="button button-dark" href={`tel:${contact.phone.replaceAll("-", "")}`}>전화 문의</a><a className="button button-white" href={`mailto:${contact.email}?subject=${encodeURIComponent(product.name + " 구매 문의")}`}>이메일 문의</a></div>
    </div>
  </div></section>
  <section className="section section-tint"><div className="container info-grid"><div className="info-card"><h2>사진과 판매 범위 안내</h2>{(product.photoDescription?.trim() || guide?.photo) && <p>{product.photoDescription?.trim() || guide?.photo}</p>}<p>{product.description}</p>
      {confirmedDetails.length > 0 && <ul>{confirmedDetails.map(({ label, value }) => <li key={label}>{label}: {value}</li>)}</ul>}
      {confirmedDetails.length < 3 && <p>표기되지 않은 상세 규격·재질·판매 단위는 견적 문의 시 확인해 주세요.</p>}
      <p>시공 서비스는 제공하지 않습니다.</p></div>
    <div className="info-card"><h2>맞춤 제작·견적 문의</h2><p>{product.inquiryGuide?.trim() || guide?.inquiry || "제품의 용도, 희망 규격과 수량, 납품 지역을 알려주시면 제작 가능 여부와 견적을 상담합니다."}</p><div className="help-list"><div>제품 종류</div><div>희망 규격·수량</div><div>납품 지역·일정</div></div></div></div></section>
  <section className="cta-band"><div className="container"><h2>제품이 필요하신가요?</h2><div className="button-row"><a className="button button-dark" href={`tel:${contact.phone.replaceAll("-", "")}`}>전화 문의</a><Link className="button button-white" href="/contact">문의 방법 보기</Link></div></div></section></main>;
}
