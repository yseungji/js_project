import { contact } from "@/lib/products";

export function SiteFooter() {
  return <footer className="site-footer"><div className="container">
    <strong>JS건설</strong><p>지주·표지판 제품 판매 <span aria-hidden="true">|</span> 시공 서비스 미제공</p>
    <small>사업자등록번호 {contact.businessNumber} <span aria-hidden="true">|</span> 이메일 {contact.email}</small>
  </div></footer>;
}
