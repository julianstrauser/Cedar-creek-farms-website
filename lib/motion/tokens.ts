/** Cedar Creek Farms — shared motion tokens */
export const EASE = [0.22, 0.03, 0.26, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.55,
  slow: 0.65,
  page: 0.4,
} as const;

/** Scroll reveal vertical travel (px) */
export const OFFSET = 40;

/** Staggered child vertical travel (px) */
export const STAGGER_OFFSET = 36;

export const STAGGER = 0.1;

/** Triggers when ~20% of the element is visible */
export const VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;

/** Slightly earlier trigger for large grids */
export const VIEWPORT_GRID = {
  once: true,
  amount: 0.15,
} as const;
