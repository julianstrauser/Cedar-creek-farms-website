import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import GalleryView from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Project Gallery",
  description: "Tree farm photos, installed trees, transplanting projects, and farm rows.",
};

export default function GalleryPage() {
  return (
    <PublicLayout>
      <section className="page-hero compact">
        <p className="eyebrow">Photos and recent work</p>
        <h1>Gallery</h1>
        <p>
          Farm photos, tree rows, installed trees, before-and-after projects, and
          equipment photos.
        </p>
      </section>
      <section className="section">
        <GalleryView />
      </section>
    </PublicLayout>
  );
}
