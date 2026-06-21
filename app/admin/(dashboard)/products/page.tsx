import ProductsAdmin from "@/components/admin/ProductsAdmin";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await requireAdmin();
  return <ProductsAdmin />;
}
