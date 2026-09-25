"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AdminGuard } from "@/components/admin-guard";
import { db, storage } from "@/lib/firebase-client";
import { Product, sampleProducts } from "@/lib/products";

const emptyProduct: Product = {
  id: "", slug: "", name: "", category: "sign", summary: "", description: "",
  specification: "", material: "", saleUnit: "", priceLabel: "상담 시 안내",
  status: "draft", imageUrl: "",
};

function Editor({ id }: { id?: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product>({ ...emptyProduct });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [additionalFile, setAdditionalFile] = useState<File | null>(null);
  const [additionalPreview, setAdditionalPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(id));
  useEffect(() => {
    if (!id || !db) return;
    getDoc(doc(db, "products", id)).then(result => {
      if (!result.exists()) { setError("상품을 찾을 수 없습니다."); return; }
      setProduct({ ...result.data(), id: result.id } as Product);
    }).catch(() => setError("상품 정보를 불러오지 못했습니다.")).finally(() => setLoading(false));
  }, [id]);
  useEffect(() => {
    if (!file) { setPreview(""); return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);
  useEffect(() => {
    if (!additionalFile) { setAdditionalPreview(""); return; }
    const url = URL.createObjectURL(additionalFile); setAdditionalPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [additionalFile]);
  function update<K extends keyof Product>(key: K, value: Product[K]) { setProduct(current => ({ ...current, [key]: value })); }
  async function save(status?: "draft" | "published") {
    setError("");
    if (!db) { setError("Firebase 설정이 필요합니다."); return; }
    const slug = id || product.slug.trim().toLowerCase();
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) { setError("URL 주소는 영문 소문자, 숫자, 하이픈으로 입력해 주세요."); return; }
    if (!product.name.trim()) { setError("상품명을 입력해 주세요."); return; }
    if ([file, additionalFile].some(selected => selected && (!["image/jpeg", "image/png", "image/webp"].includes(selected.type) || selected.size >= 10 * 1024 * 1024))) { setError("사진은 각각 10MB 미만의 JPG, PNG, WebP 파일이어야 합니다."); return; }
    setBusy(true);
    try {
      let imageUrl = product.imageUrl;
      let imagePath = product.imagePath || "";
      let additionalImageUrl = product.additionalImageUrl || "";
      let additionalImagePath = product.additionalImagePath || "";
      if (file) {
        if (!storage) throw new Error("저장소 설정이 필요합니다.");
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        imagePath = `products/${slug}/${Date.now()}-${safeName}`;
        const fileRef = ref(storage, imagePath);
        await uploadBytes(fileRef, file, { contentType: file.type });
        imageUrl = await getDownloadURL(fileRef);
      }
      if (additionalFile) {
        if (!storage) throw new Error("저장소 설정이 필요합니다.");
        const safeName = additionalFile.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        additionalImagePath = `products/${slug}/${Date.now()}-additional-${safeName}`;
        const fileRef = ref(storage, additionalImagePath);
        await uploadBytes(fileRef, additionalFile, { contentType: additionalFile.type });
        additionalImageUrl = await getDownloadURL(fileRef);
      }
      const next = { ...product, slug, name: product.name.trim(), imageUrl, imagePath, additionalImageUrl,
        additionalImagePath, additionalImageCaption: product.additionalImageCaption?.trim() || "", status: status || product.status };
      if (!next.imageUrl) { setError("상품 사진을 추가해 주세요."); return; }
      const { id: ignored, ...data } = next;
      await setDoc(doc(db, "products", slug), { ...data, updatedAt: serverTimestamp() }, { merge: true });
      router.push("/admin/products");
      router.refresh();
    } catch (cause) { console.error(cause); setError("저장에 실패했습니다. 관리자 권한과 Storage 설정을 확인해 주세요."); }
    finally { setBusy(false); }
  }
  if (loading) return <p>상품 정보를 불러오고 있습니다…</p>;
  return <><p className="admin-eyebrow">관리자 / 상품 관리 / {id ? "상품 수정" : "상품 등록"}</p><h1 className="admin-title">상품 정보 {id ? "수정" : "등록"}</h1><p className="muted">필요한 항목을 입력하고 고객에게 보이는 모습을 확인하세요.</p>
    <form onSubmit={event => { event.preventDefault(); void save(); }}>
      <section className="admin-card form-section"><h2>상품 사진</h2><div className="info-grid">
        <div>{(preview || product.imageUrl) ? <Image className="preview-img" src={preview || product.imageUrl} alt="상품 사진 미리보기" width={350} height={250} unoptimized={Boolean(preview)} /> : <p className="muted">아직 사진이 없습니다.</p>}</div>
        <div><h3>대표 사진</h3><p className="muted">상품 목록과 상세 페이지의 첫 사진으로 사용합니다.</p><input aria-label="대표 사진 선택" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setFile(e.target.files?.[0] || null)} /></div>
      </div></section>
      <section className="admin-card form-section"><h2>추가 사진</h2><div className="info-grid">
        <div>{(additionalPreview || product.additionalImageUrl) ? <Image className="preview-img" src={additionalPreview || product.additionalImageUrl || ""} alt="추가 사진 미리보기" width={350} height={250} unoptimized={Boolean(additionalPreview)} /> : <p className="muted">아직 추가 사진이 없습니다.</p>}</div>
        <div><h3>규격·상세 참고 사진</h3><p className="muted">고객용 상세 페이지에서 대표 사진 아래에 표시합니다.</p><input aria-label="추가 사진 선택" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => setAdditionalFile(e.target.files?.[0] || null)} />
          <div className="field"><label htmlFor="additionalImageCaption">사진 설명</label><input id="additionalImageCaption" value={product.additionalImageCaption || ""} onChange={e => update("additionalImageCaption", e.target.value)} placeholder="예: 규격 실측 참고 사진" /></div></div>
      </div></section>
      <section className="admin-card form-section"><h2>기본 정보</h2><div className="form-grid">
        <div className="field"><label htmlFor="name">상품명</label><input id="name" required value={product.name} onChange={e => update("name", e.target.value)} /></div>
        <div className="field"><label htmlFor="category">제품 분류</label><select id="category" value={product.category} onChange={e => update("category", e.target.value as Product["category"])}><option value="sign">표지판</option><option value="post">지주</option></select></div>
      </div>
      <div className="field"><label htmlFor="slug">URL 주소 (영문 소문자)</label><input id="slug" value={id || product.slug} disabled={Boolean(id)} onChange={e => update("slug", e.target.value)} placeholder="예: road-sign" required /></div>
      <div className="field"><label htmlFor="summary">한 줄 소개</label><input id="summary" value={product.summary} onChange={e => update("summary", e.target.value)} /></div>
      <div className="field"><label htmlFor="description">상세 설명</label><textarea id="description" value={product.description} onChange={e => update("description", e.target.value)} placeholder="제품 특징과 구매 안내를 입력하세요" /></div></section>
      <section className="admin-card form-section"><h2>판매 정보</h2><div className="form-grid">
        <div className="field"><label htmlFor="specification">규격</label><input id="specification" value={product.specification} onChange={e => update("specification", e.target.value)} placeholder="확인 후 입력" /></div>
        <div className="field"><label htmlFor="material">재질</label><input id="material" value={product.material} onChange={e => update("material", e.target.value)} placeholder="확인 후 입력" /></div>
        <div className="field"><label htmlFor="saleUnit">판매 단위</label><input id="saleUnit" value={product.saleUnit} onChange={e => update("saleUnit", e.target.value)} placeholder="개별 / 세트 여부 확인" /></div>
        <div className="field"><label htmlFor="priceLabel">가격 표시</label><input id="priceLabel" value={product.priceLabel} onChange={e => update("priceLabel", e.target.value)} placeholder="상담 시 안내" /></div>
      </div></section>
      <section className="admin-card form-section"><h2>공개 설정</h2><p className="muted">초안으로 저장한 뒤 내용을 확인하고 공개하세요.</p><div className="field"><label htmlFor="status">공개 상태</label><select id="status" value={product.status} onChange={e => update("status", e.target.value as Product["status"])}><option value="draft">초안</option><option value="published">공개</option></select></div></section>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="form-actions"><button type="submit" className="button button-dark" disabled={busy}>{busy ? "저장 중…" : "저장"}</button>
        <button type="button" className="button button-outline" disabled={busy} onClick={() => save("draft")}>초안 저장</button>
        {product.slug && <Link className="button button-outline" href={`/products/${product.slug}`} target="_blank">고객 화면 미리보기</Link>}
        <Link className="button button-outline" href="/admin/products">상품 목록으로</Link>
      </div>
    </form>
  </>;
}

export function ProductEditor({ id }: { id?: string }) { return <AdminGuard><Editor id={id} /></AdminGuard>; }
