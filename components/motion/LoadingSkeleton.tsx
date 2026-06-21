"use client";

import { motion, useReducedMotion } from "framer-motion";

export function SkeletonBlock({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <div
      className={`skeleton${className ? ` ${className}` : ""}${reduced ? " skeleton-static" : ""}`}
      aria-hidden
    />
  );
}

export function TreeCardSkeleton() {
  return (
    <article className="tree-card skeleton-card">
      <SkeletonBlock className="skeleton-image tree-card-image" />
      <div className="tree-card-body">
        <SkeletonBlock className="skeleton-line skeleton-line-lg" />
        <SkeletonBlock className="skeleton-line skeleton-line-full" />
        <SkeletonBlock className="skeleton-line skeleton-line-md" />
        <div className="tree-card-meta">
          <SkeletonBlock className="skeleton-badge" />
          <SkeletonBlock className="skeleton-badge" />
        </div>
        <SkeletonBlock className="skeleton-button" />
      </div>
    </article>
  );
}

export function GalleryCardSkeleton() {
  return (
    <div className="gallery-card skeleton-card">
      <SkeletonBlock className="skeleton-image gallery-card-image" />
      <div>
        <SkeletonBlock className="skeleton-line skeleton-line-md" />
        <SkeletonBlock className="skeleton-line skeleton-line-full" />
      </div>
    </div>
  );
}

export function LoadingPulse({ label = "Loading" }: { label?: string }) {
  const reduced = useReducedMotion();

  return (
    <div className="loading-pulse" role="status" aria-live="polite">
      {!reduced ? (
        <motion.span
          className="loading-pulse-dot"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <span className="loading-pulse-dot loading-pulse-dot-static" />
      )}
      <span>{label}</span>
    </div>
  );
}

export function TreeGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="cards-row">
      {Array.from({ length: count }).map((_, index) => (
        <TreeCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function GalleryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="gallery-grid">
      {Array.from({ length: count }).map((_, index) => (
        <GalleryCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function LoginSkeleton() {
  return (
    <div className="admin-login-card skeleton-card" aria-hidden>
      <SkeletonBlock className="skeleton-line skeleton-line-sm" />
      <SkeletonBlock className="skeleton-line skeleton-line-lg" />
      <SkeletonBlock className="skeleton-line skeleton-line-full" />
      <SkeletonBlock className="skeleton-line skeleton-line-full" />
      <SkeletonBlock className="skeleton-button skeleton-button-lg" />
    </div>
  );
}
