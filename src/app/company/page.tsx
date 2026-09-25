import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/products";

export const metadata: Metadata = {
  title: "회사 소개",
  description: "도로 공사 분야의 법인 회사 JS건설을 소개합니다.",
  alternates: { canonical: "/company" },
};

export default function CompanyPage() {
  return <main><section className="page-hero"><div className="container company-intro"><h1>현장에서 쌓은 경험으로<br />제품을 소개합니다.</h1><p>JS건설은 도로 공사 분야의 법인 회사입니다.</p></div></section>
    <section className="section"><div className="container detail-grid"><div><h2>JS건설의 제품 판매</h2><p>이 사이트에서 지주와 표지판을 안내하고 구매 문의를 받습니다.</p><p>시공 서비스는 제공하지 않습니다.</p></div><div className="detail-image"><Image src="/images/school-zone-sign.jpg" alt="어린이보호구역 표지판과 금속 지주" fill sizes="(max-width: 900px) 100vw, 50vw" /></div></div></section>
    <section className="section section-tint"><div className="container"><h2>판매하는 제품</h2><div className="info-grid"><div className="info-card"><h3>표지판</h3><p>어린이보호구역 표지판 · 보조표지</p></div><div className="info-card"><h3>지주</h3><p>표지판을 지지하는 금속 지주</p></div></div></div></section>
    <section className="section"><div className="container"><h2>회사 정보</h2><div className="info-card"><p>법인명&nbsp; JS건설</p><p>사업자등록번호&nbsp; {contact.businessNumber}</p><p>전화&nbsp; {contact.phone}</p><p>이메일&nbsp; {contact.email}</p></div></div></section>
    <section className="cta-band"><div className="container"><h2>제품 구매를 문의하세요</h2><Link className="button button-dark" href="/contact">문의 방법 보기</Link></div></section>
  </main>;
}
