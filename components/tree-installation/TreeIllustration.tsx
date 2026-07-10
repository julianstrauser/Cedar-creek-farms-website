"use client";

type TreeIllustrationProps = {
  gradPrefix: string;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  highlight?: boolean;
  canopyFullness?: number;
  showFlare?: boolean;
  className?: string;
};

/** Consistent cedar-style tree used across all installation stages */
export default function TreeIllustration({
  gradPrefix,
  x = 400,
  y = 380,
  scale = 1,
  rotate = 0,
  opacity = 1,
  highlight = false,
  canopyFullness = 1,
  showFlare = false,
  className,
}: TreeIllustrationProps) {
  const canopyH = 120 + canopyFullness * 40;

  return (
    <g
      className={className}
      opacity={opacity}
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
    >
      {highlight && (
        <ellipse
          cx={0}
          cy={20}
          rx={70}
          ry={12}
          fill="rgba(199, 162, 93, 0.35)"
          stroke="rgba(199, 162, 93, 0.6)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      )}
      <rect x={-8} y={-20} width={16} height={90} rx={4} fill="#745337" />
      {showFlare && (
        <path
          d="M-14 70 Q0 58 14 70"
          fill="none"
          stroke="#5a4029"
          strokeWidth="2"
          strokeLinecap="round"
        />
      )}
      <path
        d={`M0 ${-canopyH} L-55 ${-20} L55 ${-20} Z`}
        fill={`url(#${gradPrefix}-canopy-a)`}
        opacity={0.95}
      />
      <path
        d={`M0 ${-canopyH - 30} L-42 ${-45} L42 ${-45} Z`}
        fill={`url(#${gradPrefix}-canopy-b)`}
      />
      <path d={`M0 ${-canopyH - 55} L-28 ${-65} L28 ${-65} Z`} fill="#2a6b52" />
    </g>
  );
}

export function TreeIllustrationDefs({ prefix }: { prefix: string }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-canopy-a`} x1="0" y1="-120" x2="0" y2="-20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3d8a6a" />
        <stop offset="1" stopColor="#173b2f" />
      </linearGradient>
      <linearGradient id={`${prefix}-canopy-b`} x1="0" y1="-150" x2="0" y2="-45" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2a6b52" />
        <stop offset="1" stopColor="#1f533f" />
      </linearGradient>
      <linearGradient id={`${prefix}-sky`} x1="0" y1="0" x2="0" y2="600" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f5f8f2" />
        <stop offset="0.55" stopColor="#e7efe8" />
        <stop offset="1" stopColor="#d8e8d4" />
      </linearGradient>
      <linearGradient id={`${prefix}-ground`} x1="0" y1="420" x2="0" y2="600" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c8d4b8" />
        <stop offset="1" stopColor="#a8b898" />
      </linearGradient>
      <linearGradient id={`${prefix}-soil-cut`} x1="0" y1="400" x2="0" y2="600" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8a7358" />
        <stop offset="1" stopColor="#6b5640" />
      </linearGradient>
    </defs>
  );
}

export function treeGradients(prefix: string) {
  return {
    sky: `url(#${prefix}-sky)`,
    ground: `url(#${prefix}-ground)`,
    soilCut: `url(#${prefix}-soil-cut)`,
  };
}
