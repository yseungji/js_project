# 나중에 진행할 상품 공개 작업

2026-09-25 기준으로 `products/concrete-base-post`는 Firebase Firestore에 `draft`로 저장되어 있습니다. 상품 사진 2장과 맞춤 제작 안내 코드는 `codex/firebase-site` 브랜치에 푸시했습니다. 판매 상품은 **금속 지주**이며, 사진 속 **콘크리트 기초는 판매 구성에 포함되지 않습니다**. 치수 숫자는 기재하지 않고 실측 사진을 참고 자료로 사용합니다.

이 작업은 네이버 검색 유입 준비 뒤에 진행합니다. 담당자는 Firebase 상품 문서의 다음 필드를 확인·수정한 다음 `status`를 `published`로 바꾸고 공개 페이지를 확인합니다.

- `name`: `기초 설치형 금속 지주`
- `summary`: `현장에 맞는 규격으로 맞춤 제작을 상담하는 금속 지주 · 콘크리트 기초 미포함`
- `description`: `판매 상품은 금속 지주입니다. 사진 속 콘크리트 기초는 설치 예시이며 판매 구성에 포함되지 않습니다. 필요한 규격은 사진을 참고해 문의해 주세요. 시공 서비스는 제공하지 않습니다.`
- `specification`: `사진 참고 · 주문 규격 상담`
- `additionalImageCaption`: `설치 예시의 콘크리트 기초 실측 사진 · 기초 미포함`

Firestore 문서: <https://console.firebase.google.com/project/jsproject-16910/firestore/databases/-default-/data/~2Fproducts~2Fconcrete-base-post>

공개 확인 주소: <https://js-construction--jsproject-16910.asia-east1.hosted.app/products/concrete-base-post>

주의: 문서의 `name`과 `additionalImageCaption`은 수정 시도 후 콘솔에 새 값이 표시됐지만, 나머지 필드와 실제 저장 상태는 공개 전에 다시 확인해야 합니다. `status`는 마지막 확인 당시 `draft`였습니다.
