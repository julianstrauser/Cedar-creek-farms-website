import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import InventoryView from "@/components/InventoryView";
import { ScrollReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Tree Availability",
  description: "Browse current tree availability by variety, size, type, and notes.",
};

export default function InventoryPage() {
  return (
    <PublicLayout>
      <ScrollReveal as="section" className="page-hero compact">
        <p className="eyebrow">Current inventory</p>
        <h1>Tree Availability</h1>
        <p>
          Search by name, type, size, or notes. Availability is updated
          regularly — contact us for current pricing and to confirm quantities.
        </p>
      </ScrollReveal>
      <InventoryView />
    </PublicLayout>
  );
}
