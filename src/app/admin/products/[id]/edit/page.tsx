import { ProductEditor } from "@/components/product-editor";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  return <ProductEditor id={(await params).id} />;
}
