"use client";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth, db, firebaseConfigured } from "@/lib/firebase-client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    if (!auth || !db) { setError("Firebase 웹 앱 설정이 아직 연결되지 않았습니다."); setBusy(false); return; }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const admin = await getDoc(doc(db, "admins", result.user.uid));
      if (!admin.exists() || admin.data().enabled !== true) { await signOut(auth); setError("관리자 권한이 등록되지 않은 계정입니다."); return; }
      router.push("/admin");
    } catch { setError("로그인에 실패했습니다. 계정 정보와 관리자 권한을 확인해 주세요."); }
    finally { setBusy(false); }
  }
  return <main className="admin-shell"><div className="admin-login">
    <div className="login-brand"><h1>JS건설</h1><h1>상품 정보를<br />쉽게 관리하세요.</h1><p>제품 사진과 설명을 등록하고<br />고객에게 보이는 화면을 확인할 수 있습니다.</p></div>
    <div className="login-form-wrap"><h1>관리자 로그인</h1><p className="muted">관리자 계정으로 로그인해 주세요.</p>
      <form onSubmit={login}><div className="field"><label htmlFor="email">이메일</label><input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required placeholder="이메일 주소" /></div>
      <div className="field"><label htmlFor="password">비밀번호</label><input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="비밀번호" /></div>
      {error && <p className="error" role="alert">{error}</p>}
      {!firebaseConfigured && <p className="note">프로젝트의 Firebase 설정값을 먼저 입력해야 합니다.</p>}
      <button className="button button-dark" disabled={busy} type="submit">{busy ? "확인 중…" : "로그인"}</button></form>
    </div>
  </div></main>;
}
