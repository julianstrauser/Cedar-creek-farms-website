import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import TreeInstallationExperience from "@/components/tree-installation/TreeInstallationExperience";

export const metadata: Metadata = {
  title: "Tree Installation Process",
  description:
    "Follow the Cedar Creek Farms professional tree installation process—from farm selection and transport to planting, watering, and long-term establishment.",
};

export default function TreeInstallationPage() {
  return (
    <PublicLayout>
      <TreeInstallationExperience />
    </PublicLayout>
  );
}
