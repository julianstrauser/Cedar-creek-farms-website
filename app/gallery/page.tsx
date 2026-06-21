import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import GalleryView from "@/components/GalleryView";
import PageHero from "@/components/PageHero";
import { ScrollReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Tree Farm & Transplanting Gallery",
  description:
    "Photos of tree farm rows, installed trees, transplanting projects, and equipment at Cedar Creek Farms.",
};

export default function GalleryPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Photos and recent work"
        title="Gallery"
        description="Farm photos, tree rows, installed trees, before-and-after projects, and equipment photos."
      />
      <ScrollReveal as="section" className="section">
        <GalleryView />
      </ScrollReveal>
    </PublicLayout>
  );
}
