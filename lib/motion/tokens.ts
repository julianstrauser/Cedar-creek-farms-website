/** Cedar Creek Farms — shared motion tokens */
export const EASE = [0.25, 0.1, 0.25, 1] as const;

export const DURATION = {
  fast: 0.2,
  base: 0.3,
  slow: 0.4,
} as const;

export const OFFSET = 16;

export const STAGGER = 0.08;

export const VIEWPORT = {
  once: true,
  margin: "-60px 0px -40px 0px",
} as const;
