/** Normalized scroll progress ranges for each installation stage (0–1). */
export const STAGE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.1],
  [0.1, 0.2],
  [0.2, 0.3],
  [0.3, 0.4],
  [0.4, 0.5],
  [0.5, 0.6],
  [0.6, 0.7],
  [0.7, 0.8],
  [0.8, 0.9],
  [0.9, 1.0],
];

export function stageIndexFromProgress(progress: number): number {
  const p = Math.max(0, Math.min(0.999, progress));
  const idx = STAGE_RANGES.findIndex(([start, end]) => p >= start && p < end);
  return idx === -1 ? STAGE_RANGES.length - 1 : idx;
}

/** Midpoint progress for a stage — used for mobile / reduced-motion frames. */
export function stageMidpoint(index: number): number {
  const range = STAGE_RANGES[Math.max(0, Math.min(STAGE_RANGES.length - 1, index))];
  return (range[0] + range[1]) / 2;
}

/** World width of the continuous installation panorama (SVG units). */
export const SCENE_WORLD_WIDTH = 2000;
export const SCENE_VIEW_WIDTH = 900;
export const SCENE_VIEW_HEIGHT = 640;
