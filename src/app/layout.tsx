import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "JS건설 | 지주·표지판 제품 판매", template: "%s | JS건설" },
  description: "JS건설의 도로 표지판과 금속 지주를 살펴보고 맞춤 제작 및 구매를 문의하세요. 제품만 판매하며 시공 서비스는 제공하지 않습니다.",
  metadataBase: new URL(siteUrl),
  verification: process.env.NAVER_SITE_VERIFICATION
    ? { other: { "naver-site-verification": process.env.NAVER_SITE_VERIFICATION } }
    : undefined,
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
