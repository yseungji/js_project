import type { Metadata } from "next";
import { contact } from "@/lib/products";

export const metadata: Metadata = {
  title: "구매 문의",
  description: "JS건설 지주·표지판 구매 및 맞춤 주문 제작 문의: 전화와 이메일로 상담하세요.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <main><section className="page-hero"><div className="container"><h1>편한 방법으로 문의하세요</h1><p>지주·표지판 맞춤 제작을 원하시면 필요한 규격과 문구, 수량을 알려주세요.</p></div></section>
    <section className="section"><div className="container"><div className="contact-grid">
      <div className="contact-card"><span>전화</span><strong>{contact.phone}</strong><a className="button button-dark" href={`tel:${contact.phone.replaceAll("-", "")}`}>전화 문의</a></div>
      <div className="contact-card"><span>이메일</span><strong>{contact.email}</strong><a className="button button-dark" href={`mailto:${contact.email}`}>이메일 문의</a></div>
    </div><p className="note">사업자등록번호 {contact.businessNumber}</p></div></section>
    <section className="section section-tint"><div className="container"><h2>상담 전에 알려주세요</h2><div className="info-card"><p>제품 종류 &nbsp;·&nbsp; 필요 규격·문구 &nbsp;·&nbsp; 수량 &nbsp;·&nbsp; 납품 지역 &nbsp;·&nbsp; 희망 일정</p><p>규격이 확실하지 않아도 사진이나 용도를 설명해 주시면 맞춤 제작 가능 여부를 함께 확인하겠습니다.</p></div></div></section>
    <section className="section"><div className="container"><h2>안내 사항</h2><p>이 사이트는 지주와 표지판 판매용입니다. 시공은 제공하지 않습니다.</p></div></section>
  </main>;
}
