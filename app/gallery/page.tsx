import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import GalleryView from "@/components/GalleryView";
import { ScrollReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Tree farm photos, installed trees, transplanting projects, and farm rows.",
};

export default function GalleryPage() {
  return (
    <PublicLayout>
      <ScrollReveal as="section" className="page-hero compact">
        <p className="eyebrow">Photos and recent work</p>
        <h1>Gallery</h1>
        <p>
          Farm photos, tree rows, installed trees, before-and-after projects, and
          equipment photos.
        </p>
      </ScrollReveal>
      <ScrollReveal as="section" className="section">
        <GalleryView />
      </ScrollReveal>
    </PublicLayout>
  );
}
