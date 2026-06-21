"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { availabilityLabel } from "@/lib/utils";
import { PRICING_HELPER_TEXT } from "@/lib/contact";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import SiteImage from "@/components/SiteImage";
import MotionCard from "@/components/motion/MotionCard";
import MotionButton from "@/components/motion/MotionButton";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import { LoadingPulse, TreeGridSkeleton } from "@/components/motion/LoadingSkeleton";

function TreeCard({
  tree,
  compact = false,
  onAddToQuote,
}: {
  tree: Product;
  compact?: boolean;
  onAddToQuote?: () => void;
}) {
  const settings = useSiteSettings();
  const mailto = `mailto:${settings.contact_email}?subject=${encodeURIComponent(`Pricing Question About ${tree.name}`)}`;
  const displayName = tree.common_name
    ? `${tree.name}${tree.common_name !== tree.name ? ` (${tree.common_name})` : ""}`
    : tree.name;

  return (
    <MotionCard className="tree-card">
      <div className="tree-card-image-wrap">
        <SiteImage
          className="tree-card-image"
          src={tree.image_url || "/assets/logo.svg"}
          alt={tree.name}
          width={640}
          height={400}
          sizes="(max-width: 720px) 100vw, 50vw"
        />
      </div>
      <div className="tree-card-body">
        <h3>{displayName}</h3>
        {tree.description ? <p>{tree.description}</p> : null}
        <div className="tree-card-meta">
          {tree.category ? <span className="badge">{tree.category}</span> : null}
          {tree.size ? <span className="badge">{tree.size}</span> : null}
          <span className={`badge${tree.availability === "available" ? " gold" : ""}`}>
            {availabilityLabel(tree.availability)}
          </span>
        </div>
        {tree.best_use ? (
          <p className="tree-card-detail">
            <strong>Best use:</strong> {tree.best_use}
          </p>
        ) : null}
        {!compact && (tree.sun_needs || tree.water_needs || tree.mature_size) ? (
          <ul className="tree-card-specs">
            {tree.sun_needs ? <li>Sun: {tree.sun_needs}</li> : null}
            {tree.water_needs ? <li>Water: {tree.water_needs}</li> : null}
            {tree.mature_size ? <li>Mature size: {tree.mature_size}</li> : null}
          </ul>
        ) : null}
        <div className="tree-card-contact">
          <div className="tree-card-actions">
            {!compact && onAddToQuote && tree.availability === "available" ? (
              <MotionButton
                className="button secondary"
                type="button"
                onClick={onAddToQuote}
              >
                Add to Quote
              </MotionButton>
            ) : null}
            <MotionButton className="button primary" href={mailto}>
              Contact for Pricing
            </MotionButton>
          </div>
          <p className="tree-card-helper">{PRICING_HELPER_TEXT}</p>
        </div>
      </div>
    </MotionCard>
  );
}

export default function FeaturedTrees() {
  const [trees, setTrees] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .in("availability", ["available", "sold_out"])
        .order("sort_order", { ascending: true })
        .limit(3);

      if (fetchError) {
        setError(true);
        setLoading(false);
        return;
      }
      setTrees((data as Product[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingPulse label="Loading featured trees" />
        <TreeGridSkeleton count={3} />
      </>
    );
  }

  if (error) {
    return <p className="muted">Featured trees could not be loaded at this time.</p>;
  }

  if (!trees.length) {
    return <p className="muted">Featured trees will appear here as inventory is updated.</p>;
  }

  return (
    <StaggerContainer className="cards-row">
      {trees.map((tree) => (
        <StaggerItem key={tree.id}>
          <TreeCard tree={tree} compact />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export { TreeCard };
