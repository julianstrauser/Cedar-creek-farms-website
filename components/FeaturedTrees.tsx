"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { availabilityLabel, formatPrice } from "@/lib/utils";
import { PRICING_HELPER_TEXT, pricingInquiryMailto } from "@/lib/contact";

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
    <article className="tree-card">
      <img
        className="tree-card-image"
        src={tree.image_url || "/assets/logo.svg"}
        alt={tree.name}
        loading="lazy"
      />
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
              <button className="button secondary" type="button" onClick={onAddToQuote}>
                Add to Quote
              </button>
            ) : null}
            <a
              className="button primary"
              href={pricingInquiryMailto(tree.name)}
            >
              Contact for Pricing
            </a>
          </div>
          <p className="tree-card-helper">{PRICING_HELPER_TEXT}</p>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedTrees() {
  const [trees, setTrees] = useState<Product[]>([]);
  const [error, setError] = useState(false);

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
        return;
      }
      setTrees((data as Product[]) ?? []);
    }
    load();
  }, []);

  if (error) {
    return <p className="muted">Featured trees could not be loaded.</p>;
  }

  if (!trees.length) {
    return <p className="muted">No featured trees yet.</p>;
  }

  return (
    <div className="cards-row">
      {trees.map((tree) => (
        <TreeCard key={tree.id} tree={tree} compact />
      ))}
    </div>
  );
}

export { TreeCard };
