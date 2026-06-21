import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import InventoryView from "@/components/InventoryView";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Tree Availability",
  description:
    "Browse current shade trees, ornamental trees, privacy trees, and seasonal availability at Cedar Creek Farms.",
};

export default function InventoryPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Current inventory"
        title="Tree Availability"
        description="Search by name, type, size, or notes. Availability is updated regularly — contact us for current pricing and to confirm quantities."
      />
      <InventoryView />
    </PublicLayout>
  );
}
