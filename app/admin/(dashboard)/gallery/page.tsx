import GalleryAdmin from "@/components/admin/GalleryAdmin";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  await requireAdmin();
  return <GalleryAdmin />;
}
