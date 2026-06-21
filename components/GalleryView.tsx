"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";
import SiteImage from "@/components/SiteImage";
import MotionButton from "@/components/motion/MotionButton";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  GalleryGridSkeleton,
  LoadingPulse,
} from "@/components/motion/LoadingSkeleton";
import { DURATION, EASE } from "@/lib/motion/tokens";

export default function GalleryView() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();

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
        setLoading(false);
        return;
      }
      setItems((data as GalleryItem[]) ?? []);
      setLoading(false);
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

  if (loading) {
    return (
      <>
        <LoadingPulse label="Loading gallery" />
        <GalleryGridSkeleton count={6} />
      </>
    );
  }

  if (error) {
    return <p className="muted">Gallery could not be loaded.</p>;
  }

  const FilterButton = reduced ? "button" : motion.button;

  return (
    <>
      <div className="gallery-filter">
        {categories.map((cat) => (
          <FilterButton
            key={cat}
            type="button"
            className={cat === active ? "active" : ""}
            onClick={() => setActive(cat!)}
            {...(!reduced
              ? {
                  whileHover: { y: -1, scale: 1.02 },
                  whileTap: { scale: 0.98 },
                  transition: { duration: DURATION.fast, ease: EASE },
                }
              : {})}
          >
            {cat}
          </FilterButton>
        ))}
      </div>
      <StaggerContainer className="gallery-grid" key={active}>
        {shown.map((item) => (
          <StaggerItem key={item.id}>
            {reduced ? (
              <button
                className="gallery-card"
                type="button"
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-card-image-wrap">
                  <SiteImage
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    className="gallery-card-image"
                    width={800}
                    height={600}
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </button>
            ) : (
              <motion.button
                className="gallery-card"
                type="button"
                onClick={() => setLightbox(item)}
                whileHover={{
                  y: -4,
                  boxShadow: "0 20px 40px rgba(14, 40, 29, 0.12)",
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: DURATION.fast, ease: EASE }}
              >
                <div className="gallery-card-image-wrap">
                  <SiteImage
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    className="gallery-card-image"
                    width={800}
                    height={600}
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </div>
              </motion.button>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>

      {lightbox ? (
        <dialog className="lightbox" open onClose={() => setLightbox(null)}>
          <MotionButton
            className="lightbox-close"
            aria-label="Close image"
            type="button"
            onClick={() => setLightbox(null)}
          >
            ×
          </MotionButton>
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
