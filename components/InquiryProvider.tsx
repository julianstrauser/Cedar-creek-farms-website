"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/types";

const storageKey = "cedarCreekInquiry";

type InquiryContextValue = {
  items: Product[];
  addItem: (tree: Product) => void;
  clearItems: () => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      setItems([]);
    }
  }, []);

  const persist = useCallback((next: Product[]) => {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }, []);

  const addItem = useCallback(
    (tree: Product) => {
      persist(items.some((item) => item.id === tree.id) ? items : [...items, tree]);
    },
    [items, persist]
  );

  const clearItems = useCallback(() => {
    persist([]);
  }, [persist]);

  const value = useMemo(
    () => ({ items, addItem, clearItems }),
    [items, addItem, clearItems]
  );

  return (
    <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within InquiryProvider");
  }
  return context;
}

export function InquirySummary() {
  const { items } = useInquiry();

  if (!items.length) {
    return <p className="muted">No trees selected yet. Add trees from the availability page.</p>;
  }

  return (
    <div className="selected-tree-list">
      {items.map((item) => (
        <div className="selected-tree" key={item.id}>
          <strong>{item.name}</strong>
          <span>
            {item.size} • {item.availability === "available" ? "Available" : "Sold out"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function selectedTreesText(items: Product[]) {
  return items.map((item) => `${item.name} - ${item.size ?? "size TBD"}`).join("\n");
}
