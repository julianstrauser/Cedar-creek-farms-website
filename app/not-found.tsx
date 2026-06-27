import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import NotFoundContent from "@/components/site/NotFoundContent";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you requested could not be found. Return to Cedar Creek Farms to browse tree inventory and services.",
};

export default function NotFound() {
  return (
    <PublicLayout>
      <NotFoundContent />
    </PublicLayout>
  );
}
