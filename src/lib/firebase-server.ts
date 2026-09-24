import { getApps, initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Product, sampleProducts } from "@/lib/products";

function adminDb() {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT;
  if (!projectId) return null;
  const app = getApps()[0] || initializeApp({ credential: applicationDefault(), projectId });
  return getFirestore(app);
}

export async function getProducts(): Promise<Product[]> {
  const database = adminDb();
  if (!database) return sampleProducts;
  try {
    const snapshot = await database.collection("products").where("status", "==", "published").get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Product));
  } catch (error) {
    console.error("Unable to load products from Firestore", error);
    return sampleProducts;
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((product) => product.slug === slug);
}
