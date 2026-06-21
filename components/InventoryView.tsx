"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { TreeCard } from "@/components/FeaturedTrees";
import { useInquiry } from "@/components/InquiryProvider";
import MotionButton from "@/components/motion/MotionButton";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { LoadingPulse, TreeCardSkeleton } from "@/components/motion/LoadingSkeleton";

type ChipFilter =
  | "all"
  | "shade"
  | "privacy"
  | "ornamental"
  | "available"
  | "sold_out"
  | "featured";

const CHIP_FILTERS: { id: ChipFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "shade", label: "Shade Trees" },
  { id: "privacy", label: "Privacy Trees" },
  { id: "ornamental", label: "Ornamental Trees" },
  { id: "available", label: "Available Now" },
  { id: "sold_out", label: "Sold Out" },
  { id: "featured", label: "Featured" },
];

function matchesChip(tree: Product, chip: ChipFilter) {
  const category = (tree.category ?? "").toLowerCase();

  switch (chip) {
    case "all":
      return true;
    case "shade":
      return category.includes("shade");
    case "privacy":
      return category.includes("privacy");
    case "ornamental":
      return category.includes("ornamental");
    case "available":
      return tree.availability === "available";
    case "sold_out":
      return tree.availability === "sold_out";
    case "featured":
      return tree.featured;
    default:
      return true;
  }
}

export default function InventoryView() {
  const { items, addItem, clearItems } = useInquiry();
  const [trees, setTrees] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [size, setSize] = useState("all");
  const [chip, setChip] = useState<ChipFilter>("all");
  const [status, setStatus] = useState("Loading inventory...");
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .in("availability", ["available", "sold_out"])
        .order("sort_order", { ascending: true });

      if (error) {
        setLoadError(true);
        setStatus("Inventory could not be loaded.");
        setLoading(false);
        return;
      }
      setTrees((data as Product[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const types = useMemo(
    () => [...new Set(trees.map((tree) => tree.category).filter(Boolean))].sort(),
    [trees]
  );
  const sizes = useMemo(
    () => [...new Set(trees.map((tree) => tree.size).filter(Boolean))].sort(),
    [trees]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return trees.filter((tree) => {
      const text = `${tree.name} ${tree.common_name ?? ""} ${tree.category ?? ""} ${tree.size ?? ""} ${tree.description ?? ""} ${tree.best_use ?? ""}`.toLowerCase();
      return (
        (!q || text.includes(q)) &&
        (type === "all" || tree.category === type) &&
        (size === "all" || tree.size === size) &&
        matchesChip(tree, chip)
      );
    });
  }, [trees, search, type, size, chip]);

  useEffect(() => {
    if (loadError) return;
    if (loading) return;
    setStatus(`${filtered.length} of ${trees.length} trees shown`);
  }, [filtered.length, trees.length, loadError, loading]);

  const countText =
    items.length === 1 ? "1 tree selected" : `${items.length} trees selected`;

  return (
    <ScrollReveal as="section" className="section inventory-layout">
      <aside className="filters" aria-label="Inventory filters">
        <label htmlFor="tree-search">Search trees</label>
        <input
          id="tree-search"
          type="search"
          placeholder="Oak, elm, 30 gal..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <label htmlFor="tree-type">Tree type</label>
        <select
          id="tree-type"
          value={type}
          onChange={(event) => setType(event.target.value)}
        >
          <option value="all">All types</option>
          {types.map((value) => (
            <option key={value} value={value!}>
              {value}
            </option>
          ))}
        </select>
        <label htmlFor="tree-size">Size</label>
        <select
          id="tree-size"
          value={size}
          onChange={(event) => setSize(event.target.value)}
        >
          <option value="all">All sizes</option>
          {sizes.map((value) => (
            <option key={value} value={value!}>
              {value}
            </option>
          ))}
        </select>
        <MotionButton
          className="button secondary full"
          type="button"
          onClick={() => {
            setSearch("");
            setType("all");
            setSize("all");
            setChip("all");
          }}
        >
          Clear Filters
        </MotionButton>
        <div className="inquiry-box">
          <h2>Inquiry list</h2>
          <p>{countText}</p>
          <MotionButton className="button primary full" href="/contact">
            Request Pricing
          </MotionButton>
          <MotionButton className="button ghost full" type="button" onClick={clearItems}>
            Clear List
          </MotionButton>
        </div>
      </aside>

      <div>
        <div className="inventory-chip-filter" role="group" aria-label="Quick filters">
          {CHIP_FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={chip === item.id ? "active" : ""}
              onClick={() => setChip(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="inventory-topline">
          {loading ? <LoadingPulse label="Loading inventory" /> : <p>{status}</p>}
        </div>
        {loading ? (
          <div className="tree-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <TreeCardSkeleton key={index} />
            ))}
          </div>
        ) : loadError ? (
          <p className="muted">Tree availability could not be loaded at this time.</p>
        ) : filtered.length === 0 ? (
          <p className="muted">No trees match your current filters.</p>
        ) : (
          <StaggerContainer className="tree-grid" key={`${search}-${type}-${size}-${chip}`}>
            {filtered.map((tree) => (
              <StaggerItem key={tree.id}>
                <TreeCard tree={tree} onAddToQuote={() => addItem(tree)} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </ScrollReveal>
  );
}
