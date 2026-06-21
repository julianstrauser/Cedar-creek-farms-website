"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";
import SiteImage from "@/components/SiteImage";

export default function GalleryView() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("gallery")
        .select("*")
        .eq("visible", true)
        .order("sort_order", { ascending: true });

      if (fetchError) {
        setError(true);
        return;
      }
      setItems((data as GalleryItem[]) ?? []);
    }
    load();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(items.map((item) => item.category).filter(Boolean))],
    [items]
  );

  const shown = useMemo(
    () =>
      active === "All" ? items : items.filter((item) => item.category === active),
    [active, items]
  );

  if (error) {
    return <p className="muted">Gallery could not be loaded.</p>;
  }

  return (
    <>
      <div className="gallery-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={cat === active ? "active" : ""}
            onClick={() => setActive(cat!)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {shown.map((item) => (
          <button
            key={item.id}
            className="gallery-card"
            type="button"
            onClick={() => setLightbox(item)}
          >
            <SiteImage
              src={item.image_url}
              alt={item.alt_text || item.title}
              className="gallery-card-image"
              width={800}
              height={600}
              sizes="(max-width: 720px) 100vw, 33vw"
            />
            <div>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {lightbox ? (
        <dialog className="lightbox" open onClose={() => setLightbox(null)}>
          <button
            className="lightbox-close"
            aria-label="Close image"
            type="button"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          <SiteImage
            src={lightbox.image_url}
            alt={lightbox.alt_text || lightbox.title}
            className="lightbox-image"
            width={900}
            height={675}
            sizes="(max-width: 900px) 100vw, 900px"
          />
          <h2>{lightbox.title}</h2>
          <p>{lightbox.caption}</p>
        </dialog>
      ) : null}
    </>
  );
}
