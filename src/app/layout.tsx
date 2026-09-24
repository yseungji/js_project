import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "JS건설 | 지주·표지판 제품 판매", template: "%s | JS건설" },
  description: "JS건설의 지주·표지판 제품을 살펴보고 구매 문의하세요. 제품 판매만 진행하며 시공 서비스는 제공하지 않습니다.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
