# JS건설 지주·표지판 제품 사이트

Figma 시안을 바탕으로 만든 Next.js 제품 소개 사이트입니다. 관리자 화면에서 제품과 사진을 관리하며, 문의는 전화·이메일로 받습니다. 시공 서비스는 제공하지 않습니다.

## 구성

- 고객 화면: 홈, 제품 목록·상세, 회사 소개, 구매 문의
- 관리자 화면: `/admin/login`, `/admin`, `/admin/products`, 상품 등록·수정
- Firebase Authentication: 관리자 이메일/비밀번호 로그인
- Cloud Firestore: 상품 정보와 관리자 허용 목록
- Cloud Storage: 상품 사진
- Firebase App Hosting: Next.js 서버 렌더링 및 배포

## 로컬 실행

1. `npm install`
2. `.env.example`을 `.env.local`로 복사하고 Firebase 콘솔의 웹 앱 설정값을 입력합니다. `.env.local`은 Git에 올라가지 않습니다.
3. `npm run dev`

Firebase 설정값이 없는 로컬 환경에서는 공개 페이지에 예시 상품 2개가 표시됩니다. 관리자 로그인은 실제 Firebase 연결 없이는 동작하지 않습니다. Firebase 연결 후 상품은 Firestore에서 읽습니다.

## Firebase 초기 설정

1. Firebase 프로젝트 `jsproject-16910`에서 Blaze 요금제가 활성화되어 있는지 확인합니다. Cloud Storage와 App Hosting에 필요합니다. 예산 알림과 사용량 제한도 설정해 주세요.
2. Authentication에서 이메일/비밀번호 로그인 방식을 켭니다.
3. Firestore 데이터베이스와 Cloud Storage 기본 버킷을 생성합니다.
4. 웹 앱을 등록하고 설정값을 `.env.local`에 넣습니다.
5. Firebase CLI에 로그인한 뒤 `npx firebase deploy --only firestore:rules,storage --project jsproject-16910`로 보안 규칙을 배포합니다.
6. Authentication에서 관리자 사용자 1명을 생성합니다. 해당 사용자의 UID를 확인하여 Firestore에 `admins/{UID}` 문서를 콘솔에서 직접 만듭니다. 필드는 `enabled: true` 정도로 두면 됩니다. 이 문서는 앱에서 만들거나 수정할 수 없습니다.
7. `/admin/login`으로 로그인하고 상품 목록의 “기본 상품 2개 등록”을 눌러 초기 상품을 Firestore에 저장합니다.

관리자 접근은 로그인뿐 아니라 `admins/{UID}` 문서로 한 번 더 제한합니다. Firestore·Storage 규칙도 동일한 권한을 확인합니다. 관리자 계정은 비밀번호를 공유하지 말고 필요 시 Firebase 콘솔에서 재설정하세요.

## 배포

GitHub 저장소 `yseungji/js_project`의 브랜치를 Firebase 콘솔 → App Hosting 백엔드에 연결합니다. 공개 Firebase 웹 앱 설정값은 `apphosting.yaml`에 저장되어 있습니다. `main`에 병합하거나 백엔드에서 지정한 브랜치에 푸시하면 자동 배포됩니다. 도메인을 연결한 후 검색 엔진 등록, 실제 상품 정보·사진 검수, 문의 연락처 테스트를 마쳐야 운영할 수 있습니다.

## 확인 명령

```powershell
npm run typecheck
npm run build
```
