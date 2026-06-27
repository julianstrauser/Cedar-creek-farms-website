"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { GalleryItem } from "@/lib/types";
import SiteImage from "@/components/SiteImage";
import MotionButton from "@/components/motion/MotionButton";
import MotionChip from "@/components/motion/MotionChip";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import {
  GalleryGridSkeleton,
  LoadingPulse,
} from "@/components/motion/LoadingSkeleton";
import { lightboxVariants } from "@/lib/motion/variants";
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
    return <p className="empty-state muted">Gallery could not be loaded.</p>;
  }

  return (
    <>
      <div className="gallery-filter">
        {categories.map((cat) => (
          <MotionChip
            key={cat}
            active={cat === active}
            className="gallery-filter-chip"
            onClick={() => setActive(cat!)}
          >
            {cat}
          </MotionChip>
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
                  y: -10,
                  boxShadow:
                    "0 24px 52px rgba(14, 40, 29, 0.18), 0 0 0 1px rgba(31, 83, 63, 0.08)",
                }}
                whileTap={{ scale: 0.98 }}
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

      <AnimatePresence>
        {lightbox ? (
          <dialog className="lightbox" open onClose={() => setLightbox(null)}>
            <motion.div
              className="lightbox-inner"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={reduced ? undefined : lightboxVariants}
            >
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
            </motion.div>
          </dialog>
        ) : null}
      </AnimatePresence>
    </>
  );
}
