"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

const LEAVES = [
  { top: "12%", size: 11, duration: 16, delay: 0, yDrift: 18, opacity: 0.55 },
  { top: "22%", size: 9, duration: 19, delay: 2.5, yDrift: 24, opacity: 0.45 },
  { top: "34%", size: 13, duration: 14, delay: 5, yDrift: 14, opacity: 0.5 },
  { top: "48%", size: 8, duration: 21, delay: 1, yDrift: 28, opacity: 0.4 },
  { top: "58%", size: 10, duration: 17, delay: 7, yDrift: 16, opacity: 0.48 },
  { top: "68%", size: 12, duration: 15, delay: 3.5, yDrift: 22, opacity: 0.42 },
  { top: "28%", size: 7, duration: 22, delay: 9, yDrift: 12, opacity: 0.38 },
  { top: "72%", size: 9, duration: 18, delay: 6, yDrift: 20, opacity: 0.44 },
] as const;

const GRASS_BLADES = [
  { x: 42, height: 28, delay: 0 },
  { x: 78, height: 22, delay: 0.4 },
  { x: 118, height: 32, delay: 0.15 },
  { x: 158, height: 24, delay: 0.55 },
  { x: 198, height: 30, delay: 0.25 },
  { x: 238, height: 26, delay: 0.7 },
  { x: 278, height: 34, delay: 0.1 },
  { x: 318, height: 22, delay: 0.45 },
  { x: 352, height: 28, delay: 0.35 },
] as const;

function FloatingLeaf({
  top,
  size,
  duration,
  delay,
  yDrift,
  opacity,
}: (typeof LEAVES)[number]) {
  return (
    <motion.div
      className="not-found-leaf"
      aria-hidden
      style={{ top, width: size, height: size * 1.4, opacity }}
      initial={{ x: "-12%", y: 0, rotate: -18 }}
      animate={{
        x: "112%",
        y: [0, yDrift, -yDrift * 0.4, yDrift * 0.6, 0],
        rotate: [-18, 12, -8, 16, -18],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
        y: { duration, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: duration * 0.85, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <svg viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 1C3 4 1 8 1 12c0 2.5 2 3.5 5 3.5S11 14.5 11 12c0-4-2-8-5-11Z"
          fill="#3d6b52"
        />
        <path d="M6 2v12" stroke="#2a5540" strokeWidth="0.6" strokeLinecap="round" />
      </svg>
    </motion.div>
  );
}

function CedarCrown() {
  return (
    <>
      <path d="M70 310 L200 250 L330 310 L200 285 Z" fill="url(#nf-foliage-a)" opacity="0.92" />
      <path d="M95 275 L200 215 L305 275 L200 250 Z" fill="url(#nf-foliage-b)" />
      <path d="M115 240 L200 175 L285 240 L200 215 Z" fill="url(#nf-foliage-a)" opacity="0.95" />
      <path d="M135 205 L200 145 L265 205 L200 180 Z" fill="url(#nf-foliage-b)" />
      <path d="M152 172 L200 118 L248 172 L200 150 Z" fill="url(#nf-foliage-a)" />
      <path d="M168 142 L200 95 L232 142 L200 122 Z" fill="#2a6b52" />
      <path d="M182 118 L200 78 L218 118 L200 100 Z" fill="#3d8a6a" />
    </>
  );
}

function CedarTreeDefs() {
  return (
    <defs>
      <linearGradient id="nf-trunk" x1="200" y1="280" x2="200" y2="430" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8a6548" />
        <stop offset="0.45" stopColor="#745337" />
        <stop offset="1" stopColor="#5a4029" />
      </linearGradient>
      <linearGradient id="nf-foliage-a" x1="200" y1="60" x2="200" y2="320" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2a6b52" />
        <stop offset="1" stopColor="#173b2f" />
      </linearGradient>
      <linearGradient id="nf-foliage-b" x1="200" y1="80" x2="200" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3d8a6a" />
        <stop offset="1" stopColor="#1f533f" />
      </linearGradient>
      <linearGradient id="nf-hill-back" x1="0" y1="360" x2="400" y2="460" gradientUnits="userSpaceOnUse">
        <stop stopColor="#c8d9c8" stopOpacity="0.55" />
        <stop offset="1" stopColor="#a8bfb0" stopOpacity="0.35" />
      </linearGradient>
      <linearGradient id="nf-hill-front" x1="0" y1="390" x2="400" y2="460" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d8e8d4" />
        <stop offset="1" stopColor="#b8cdb8" />
      </linearGradient>
    </defs>
  );
}

function CedarTreeBase() {
  return (
    <>
      <ellipse cx="200" cy="430" rx="170" ry="28" fill="url(#nf-hill-back)" opacity="0.7" />
      <path
        d="M0 410 Q100 380 200 395 T400 405 L400 460 L0 460 Z"
        fill="url(#nf-hill-front)"
      />
      <path
        d="M188 430 C186 390 184 340 188 300 C190 285 210 285 212 300 C216 340 214 390 212 430 Z"
        fill="url(#nf-trunk)"
      />
      <path
        d="M192 320 C175 315 158 305 148 295"
        stroke="#5a4029"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M208 310 C225 302 242 292 252 280"
        stroke="#5a4029"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </>
  );
}

function GrassBlade({
  blade,
  animated,
}: {
  blade: (typeof GRASS_BLADES)[number];
  animated: boolean;
}) {
  const d = `M${blade.x} 430 Q${blade.x + 4} ${430 - blade.height} ${blade.x + 8} ${430 - blade.height * 0.15}`;

  if (!animated) {
    return (
      <path
        d={d}
        stroke="#4a7a5a"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />
    );
  }

  return (
    <motion.path
      d={d}
      stroke="#4a7a5a"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.55"
      style={{
        transformOrigin: `${blade.x}px 430px`,
        transformBox: "fill-box",
      }}
      animate={{ rotate: [-3, 4, -3] }}
      transition={{
        duration: 3.2 + blade.delay,
        repeat: Infinity,
        ease: EASE,
        delay: blade.delay,
      }}
    />
  );
}

function CedarTree({ animated }: { animated: boolean }) {
  return (
    <svg
      className="not-found-tree-svg"
      viewBox="0 0 400 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <CedarTreeDefs />
      <CedarTreeBase />

      {animated ? (
        <motion.g
          style={{ transformOrigin: "200px 340px", transformBox: "fill-box" }}
          animate={{ rotate: [-1.2, 1.4, -1.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: EASE }}
        >
          <CedarCrown />
        </motion.g>
      ) : (
        <g>
          <CedarCrown />
        </g>
      )}

      {GRASS_BLADES.map((blade) => (
        <GrassBlade key={blade.x} blade={blade} animated={animated} />
      ))}
    </svg>
  );
}

export default function NotFoundTreeScene() {
  const reduced = useReducedMotion();

  return (
    <div className="not-found-scene" aria-hidden>
      <div className="not-found-scene-sky" />
      <div className="not-found-scene-haze" />

      {!reduced && (
        <motion.div
          className="not-found-breeze"
          animate={{ opacity: [0.25, 0.45, 0.25], x: [0, 8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: EASE }}
        />
      )}

      {!reduced &&
        LEAVES.map((leaf, index) => (
          <FloatingLeaf key={`${leaf.top}-${index}`} {...leaf} />
        ))}

      <div className="not-found-tree-wrap">
        <CedarTree animated={!reduced} />
      </div>
    </div>
  );
}
