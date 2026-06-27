/** Cedar Creek Farms — shared motion tokens */
export const EASE = [0.22, 0.03, 0.26, 1] as const;

export const DURATION = {
  fast: 0.25,
  base: 0.5,
  slow: 0.6,
  reveal: 0.55,
  page: 0.38,
} as const;

/** Scroll reveal vertical travel (px) */
export const OFFSET = 52;

/** Staggered child vertical travel (px) */
export const STAGGER_OFFSET = 44;

export const STAGGER = 0.11;

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
