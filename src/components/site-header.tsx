import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/">JS건설</Link>
    <nav aria-label="주요 메뉴" className="site-nav">
      <Link href="/products">제품 소개</Link><Link href="/products?category=sign">표지판</Link>
      <Link href="/products?category=post">지주</Link><Link href="/company">회사 소개</Link>
    </nav>
    <Link className="button button-dark header-cta" href="/contact">구매 문의</Link>
    <details className="mobile-menu"><summary>메뉴</summary><nav aria-label="모바일 메뉴">
      <Link href="/products">제품 소개</Link><Link href="/products?category=sign">표지판</Link>
      <Link href="/products?category=post">지주</Link><Link href="/company">회사 소개</Link><Link href="/contact">구매 문의</Link>
    </nav></details>
  </div></header>;
}
