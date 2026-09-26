import { contact, type Category } from "@/lib/products";

type InquiryOptions = {
  productName?: string;
  category?: Category;
};

export function inquiryMailto({ productName, category }: InquiryOptions = {}) {
  const subject = `${productName || "지주·표지판"} 구매 문의`;
  const body = [
    "안녕하세요. JS건설 제품 구매를 문의합니다.",
    "",
    `제품 종류: ${productName || ""}`,
    ...(category === "sign" ? ["원하는 표시 문구: "] : []),
    ...(category === "post" ? ["지주 사용 용도: "] : []),
    "희망 규격: ",
    "수량: ",
    "납품 지역: ",
    "희망 일정: ",
    "추가 요청사항: ",
    "",
    "참고 사진이 있다면 메일에 첨부해 주세요.",
  ].join("\r\n");

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
