"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { availabilityLabel, formatPrice } from "@/lib/utils";
import { PRICING_HELPER_TEXT, pricingInquiryMailto } from "@/lib/contact";
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
        <h3>{tree.name}</h3>
        <p>{tree.description}</p>
        <div className="tree-card-meta">
          {tree.category ? <span className="badge">{tree.category}</span> : null}
          {tree.size ? <span className="badge">{tree.size}</span> : null}
          <span className={`badge${tree.availability === "available" ? " gold" : ""}`}>
            {availabilityLabel(tree.availability)}
          </span>
        </div>
        {!compact ? (
          <p>
            <strong>{formatPrice(tree.price)}</strong>
          </p>
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
            <MotionButton
              className="button primary"
              href={pricingInquiryMailto(tree.name)}
            >
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
    return <p className="muted">Featured trees could not be loaded.</p>;
  }

  if (!trees.length) {
    return <p className="muted">No featured trees yet.</p>;
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
