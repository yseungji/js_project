"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db, firebaseConfigured } from "@/lib/firebase-client";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"loading" | "allowed" | "denied">("loading");
  useEffect(() => {
    if (!auth || !db) { setState("denied"); return; }
    const firebaseAuth = auth;
    const database = db;
    return onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      if (!user) { router.replace("/admin/login"); return; }
      try {
        const admin = await getDoc(doc(database, "admins", user.uid));
        if (admin.exists()) setState("allowed");
        else { await signOut(firebaseAuth); setState("denied"); }
      } catch { setState("denied"); }
    });
  }, [router]);
  if (state === "loading") return <div className="admin-shell"><div className="admin-container">관리자 권한을 확인하고 있습니다…</div></div>;
  if (state === "denied") return <div className="admin-shell"><div className="admin-container admin-card"><h1>관리자 접근 불가</h1><p>{firebaseConfigured ? "관리자 권한이 없거나 확인할 수 없습니다." : "Firebase 웹 앱 설정이 필요합니다."}</p><Link className="button button-dark" href="/admin/login">로그인으로 돌아가기</Link></div></div>;
  return <div className="admin-shell"><div className="admin-container"><div className="admin-bar">
    <Link className="brand" href="/admin">JS건설</Link><span>관리자&nbsp; / &nbsp;상품 관리</span>
    <button className="button button-outline button-small" onClick={async () => { if (auth) await signOut(auth); router.push("/admin/login"); }}>로그아웃</button>
  </div>{children}</div></div>;
}
