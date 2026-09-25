export type Category = "sign" | "post";
export type ProductStatus = "draft" | "published";
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  summary: string;
  description: string;
  specification: string;
  material: string;
  saleUnit: string;
  priceLabel: string;
  status: ProductStatus;
  imageUrl: string;
  imagePath?: string;
  additionalImageUrl?: string;
  additionalImagePath?: string;
  additionalImageCaption?: string;
};

export const contact = {
  phone: "010-3671-9640",
  email: "0116719640@hanmail.net",
  businessNumber: "203-16-63696",
} as const;

export const sampleProducts: Product[] = [
  {
    id: "school-zone-sign", slug: "school-zone-sign", name: "어린이보호구역 표지판", category: "sign",
    summary: "어린이보호구역 표지판과 ‘여기부터’ 보조표지",
    description: "어린이보호구역 표시가 포함된 표지판과 ‘여기부터’ 보조표지입니다. 상세 규격과 재질은 확인 후 안내합니다. 시공 서비스는 제공하지 않습니다.",
    specification: "확인 후 안내", material: "확인 후 안내", saleUnit: "확인 후 안내", priceLabel: "상담 시 안내",
    status: "published", imageUrl: "/images/school-zone-sign.jpg",
  },
  {
    id: "sign-post", slug: "sign-post", name: "금속 지주", category: "post",
    summary: "사진 속 표지판을 지지하는 금속 지주",
    description: "표지판 설치에 사용되는 지주입니다. 상세 규격·재질 및 표지판과의 별도 또는 세트 판매 여부는 확인 후 안내합니다. 시공 서비스는 제공하지 않습니다.",
    specification: "확인 후 안내", material: "확인 후 안내", saleUnit: "확인 후 안내", priceLabel: "상담 시 안내",
    status: "published", imageUrl: "/images/school-zone-sign.jpg",
  },
  {
    id: "concrete-base-post", slug: "concrete-base-post", name: "기초 설치형 금속 지주", category: "post",
    summary: "현장에 맞는 규격으로 맞춤 제작을 상담하는 금속 지주 · 콘크리트 기초 미포함",
    description: "판매 상품은 금속 지주입니다. 사진 속 콘크리트 기초는 설치 예시이며 판매 구성에 포함되지 않습니다. 필요한 규격은 사진을 참고해 문의해 주세요. 시공 서비스는 제공하지 않습니다.",
    specification: "사진 참고 · 주문 규격 상담", material: "확인 후 안내", saleUnit: "확인 후 안내", priceLabel: "상담 시 안내",
    status: "published", imageUrl: "/images/concrete-base-post.jpg",
    additionalImageUrl: "/images/concrete-base-post-measurement.jpg",
    additionalImageCaption: "설치 예시의 콘크리트 기초 실측 사진 · 기초 미포함",
  },
];

export const categoryLabel = (category: Category) => category === "sign" ? "표지판" : "지주";
