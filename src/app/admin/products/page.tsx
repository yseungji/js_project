"use client";

import Link from "next/link";
import Image from "next/image";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AdminGuard } from "@/components/admin-guard";
import { db } from "@/lib/firebase-client";
import { Product, categoryLabel, sampleProducts } from "@/lib/products";

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  async function load() {
    if (!db) return;
    const result = await getDocs(collection(db, "products"));
    setProducts(result.docs.map(d => ({ ...d.data(), id: d.id } as Product)));
  }
  useEffect(() => { load().catch(() => setError("상품 목록을 읽지 못했습니다.")); }, []);
  async function seed() {
    if (!db) return;
    try {
      await Promise.all(sampleProducts.map(({ id, ...product }) => setDoc(doc(db!, "products", id), product)));
      await load();
    } catch { setError("기본 상품 등록에 실패했습니다. 관리자 권한을 확인해 주세요."); }
  }
  const filtered = products.filter(p => p.name.includes(query));
  return <><p className="admin-eyebrow">관리자 / 상품 관리</p><h1 className="admin-title">상품 목록</h1><p className="muted">상품을 추가하거나 내용을 수정할 수 있습니다.</p>
    <div className="admin-toolbar"><input className="search-input" aria-label="상품 검색" placeholder="상품명을 입력하세요" value={query} onChange={e => setQuery(e.target.value)} /><Link className="button button-dark" href="/admin/products/new">새 상품 등록</Link></div>
    {products.length === 0 && <div className="admin-card"><h2>기본 상품 등록</h2><p>현재 받은 사진의 표지판과 지주를 상품 데이터베이스에 등록합니다.</p><button className="button button-dark" onClick={seed}>기본 상품 2개 등록</button></div>}
    {error && <p className="error" role="alert">{error}</p>}
    <div className="admin-list">{filtered.map(p => <div className="admin-card admin-list-item" key={p.id}>
      <Image className="admin-thumb" src={p.imageUrl || sampleProducts[0].imageUrl} alt="" width={96} height={72} />
      <div className="grow"><h3>{p.name}</h3><p>{categoryLabel(p.category)} · {p.status === "published" ? "공개" : "초안"}</p></div>
      <span className="badge">{p.specification === "확인 후 안내" ? "정보 확인 필요" : "정보 등록"}</span>
      <Link className="button button-outline button-small" href={`/admin/products/${p.id}/edit`}>수정</Link>
    </div>)}</div>
    <p className="note">상품 공개 여부와 판매 단위는 실제 운영 정책에 맞게 설정해 주세요.</p>
  </>;
}
export default function AdminProductsPage() { return <AdminGuard><ProductList /></AdminGuard>; }
