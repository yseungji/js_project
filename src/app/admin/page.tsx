"use client";

import Link from "next/link";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { db } from "@/lib/firebase-client";
import { Product, sampleProducts } from "@/lib/products";

function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => { if (db) getDocs(collection(db, "products")).then(result => setProducts(result.docs.map(d => ({ ...d.data(), id: d.id } as Product)))).catch(console.error); }, []);
  return <><p className="admin-eyebrow">관리자 / 대시보드</p><h1 className="admin-title">상품 관리</h1><p className="muted">등록된 상품을 확인하고 필요한 정보를 수정하세요.</p>
    <div className="admin-grid"><div className="admin-card">등록 상품<strong>{products.length}개</strong></div><div className="admin-card">공개 상품<strong>{products.filter(p => p.status === "published").length}개</strong></div><div className="admin-card">연락 방법<strong>전화·이메일</strong></div></div>
    <h2>빠른 작업</h2><div className="admin-actions"><Link className="button button-dark" href="/admin/products/new">상품 등록</Link><Link className="button button-white" href="/admin/products">상품 목록 보기</Link></div>
    <h2>등록된 상품</h2><div className="admin-list">{products.map(p => <div className="admin-card admin-list-item" key={p.id}><Image className="admin-thumb" src={p.imageUrl || sampleProducts[0].imageUrl} alt="" width={96} height={72} /><div className="grow"><h3>{p.name}</h3><p>{p.specification}</p></div><Link className="button button-outline button-small" href={`/admin/products/${p.id}/edit`}>수정하기</Link></div>)}</div>
    {products.length === 0 && <p className="muted">등록된 상품이 없습니다. 기본 상품은 상품 목록에서 등록할 수 있습니다.</p>}
  </>;
}

export default function AdminPage() { return <AdminGuard><Dashboard /></AdminGuard>; }
