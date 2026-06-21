import OrdersAdmin from "@/components/admin/OrdersAdmin";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdmin();
  return <OrdersAdmin />;
}
