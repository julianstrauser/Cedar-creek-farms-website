"use client";

import { memo, type ReactNode } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  SCENE_VIEW_HEIGHT,
  SCENE_VIEW_WIDTH,
  SCENE_WORLD_WIDTH,
  stageMidpoint,
} from "@/lib/tree-installation/timeline";

export type SceneVariant = "desktop" | "mobile";

type TreeInstallationSceneProps = {
  progress: MotionValue<number>;
  staticStage?: number;
  variant?: SceneVariant;
  className?: string;
  stageLabel?: string;
};

function SceneDefs() {
  return (
    <defs>
      <linearGradient id="ti-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#dce9f2" />
        <stop offset="45%" stopColor="#e8f0e6" />
        <stop offset="100%" stopColor="#cfd9c4" />
      </linearGradient>
      <linearGradient id="ti-sky-warm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f0e6d4" />
        <stop offset="50%" stopColor="#e4ecdf" />
        <stop offset="100%" stopColor="#c8d4b0" />
      </linearGradient>
      <linearGradient id="ti-sky-cool" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#c5d4e0" />
        <stop offset="100%" stopColor="#b8c4b0" />
      </linearGradient>
      <linearGradient id="ti-farm-ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8fa878" />
        <stop offset="40%" stopColor="#6f8a5c" />
        <stop offset="100%" stopColor="#4f6640" />
      </linearGradient>
      <linearGradient id="ti-lawn" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7a9a68" />
        <stop offset="100%" stopColor="#5a7a4c" />
      </linearGradient>
      <linearGradient id="ti-soil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9a7a58" />
        <stop offset="35%" stopColor="#7a5c40" />
        <stop offset="100%" stopColor="#4a3428" />
      </linearGradient>
      <linearGradient id="ti-soil-moist" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6a5240" />
        <stop offset="100%" stopColor="#3a2a20" />
      </linearGradient>
      <linearGradient id="ti-canopy" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#3d8f68" />
        <stop offset="45%" stopColor="#246b4a" />
        <stop offset="100%" stopColor="#143d2c" />
      </linearGradient>
      <linearGradient id="ti-canopy-full" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0%" stopColor="#4aa574" />
        <stop offset="40%" stopColor="#2a7a52" />
        <stop offset="100%" stopColor="#164830" />
      </linearGradient>
      <linearGradient id="ti-trunk" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5a3d28" />
        <stop offset="45%" stopColor="#8a6340" />
        <stop offset="100%" stopColor="#4a3220" />
      </linearGradient>
      <linearGradient id="ti-rootball" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8b6a48" />
        <stop offset="50%" stopColor="#6a4e36" />
        <stop offset="100%" stopColor="#4a3424" />
      </linearGradient>
      <linearGradient id="ti-mulch" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6b4a2e" />
        <stop offset="100%" stopColor="#3d2a18" />
      </linearGradient>
      <linearGradient id="ti-house" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f2ebe0" />
        <stop offset="100%" stopColor="#d8cfc2" />
      </linearGradient>
      <linearGradient id="ti-spade" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a9098" />
        <stop offset="50%" stopColor="#5a6068" />
        <stop offset="100%" stopColor="#3a4048" />
      </linearGradient>
      <linearGradient id="ti-truck" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#6a7278" />
        <stop offset="100%" stopColor="#3a4248" />
      </linearGradient>
      <radialGradient id="ti-select-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(199,162,93,0.45)" />
        <stop offset="100%" stopColor="rgba(199,162,93,0)" />
      </radialGradient>
      <pattern id="ti-soil-noise" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r="0.8" fill="rgba(40,28,18,0.25)" />
        <circle cx="8" cy="7" r="0.6" fill="rgba(60,42,28,0.2)" />
        <circle cx="5" cy="10" r="0.5" fill="rgba(30,20,12,0.18)" />
      </pattern>
      <clipPath id="ti-cutaway-clip">
        <rect x="1350" y="380" width="300" height="260" />
      </clipPath>
      <filter id="ti-soft-shadow" x="-20%" y="-10%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0c2119" floodOpacity="0.22" />
      </filter>
    </defs>
  );
}

const FarmTreeRow = memo(function FarmTreeRow() {
  const trees = [
    { x: 80, s: 0.55, o: 0.55 },
    { x: 180, s: 0.7, o: 0.65 },
    { x: 280, s: 0.5, o: 0.5 },
    { x: 520, s: 0.62, o: 0.58 },
    { x: 620, s: 0.48, o: 0.45 },
    { x: 720, s: 0.68, o: 0.6 },
  ];
  return (
    <g aria-hidden>
      {trees.map((t) => (
        <g key={t.x} transform={`translate(${t.x} 360) scale(${t.s})`} opacity={t.o}>
          <path d="M0 -160 L-48 -20 L48 -20 Z" fill="#1f533f" />
          <path d="M0 -200 L-36 -70 L36 -70 Z" fill="#2a6b52" />
          <path d="M0 -230 L-22 -110 L22 -110 Z" fill="#3d8a6a" />
          <rect x="-7" y="-20" width="14" height="70" rx="3" fill="#5a4029" />
        </g>
      ))}
    </g>
  );
});

function ContinuousSceneLayers({ progress }: { progress: MotionValue<number> }) {
  const cameraX = useTransform(
    progress,
    [0, 0.08, 0.14, 0.22, 0.28, 1],
    [0, 0, -280, -980, -1100, -1100],
  );

  const skyWarm = useTransform(progress, [0.8, 0.88, 0.95, 1], [0, 0.7, 0.35, 0.2]);
  const skyCool = useTransform(progress, [0.85, 0.92, 1], [0, 0.5, 0]);
  const farmOpacity = useTransform(progress, [0, 0.12, 0.22], [1, 0.85, 0.15]);
  const propertyOpacity = useTransform(progress, [0.08, 0.16, 0.25, 1], [0, 0.4, 1, 1]);
  const selectAnnot = useTransform(progress, [0, 0.02, 0.08, 0.11], [0, 1, 1, 0]);
  const neighborDim = useTransform(progress, [0, 0.04, 0.1], [1, 0.35, 0.25]);
  const evalAnnot = useTransform(progress, [0.1, 0.13, 0.18, 0.21], [0, 1, 1, 0]);

  const treeX = useTransform(
    progress,
    [0, 0.18, 0.22, 0.28, 0.32, 0.38, 0.42, 1],
    [400, 400, 520, 900, 1100, 1480, 1480, 1480],
  );
  const treeY = useTransform(
    progress,
    [0, 0.2, 0.24, 0.28, 0.35, 0.4, 0.45, 0.5, 1],
    [360, 360, 280, 300, 300, 300, 340, 368, 368],
  );
  const treeRotate = useTransform(progress, [0.4, 0.44, 0.48, 0.52], [0, -4, 3, 0]);
  const treeScale = useTransform(progress, [0, 0.85, 1], [1, 1.05, 1.12]);
  const canopyFull = useTransform(progress, [0.8, 0.9, 1], [0, 0.5, 1]);

  const rootBallOpacity = useTransform(progress, [0.2, 0.23, 0.55, 0.62], [0, 1, 1, 0.15]);
  const rootBallY = useTransform(progress, [0.2, 0.24, 0.42, 0.48], [40, 55, 55, 72]);

  const spadeOpacity = useTransform(progress, [0.18, 0.2, 0.28, 0.32], [0, 1, 1, 0]);
  const spadeX = useTransform(progress, [0.18, 0.22, 0.26], [180, 340, 400]);
  const spadeY = useTransform(progress, [0.2, 0.23, 0.26], [-40, 20, -80]);
  const bladeOpen = useTransform(progress, [0.21, 0.24], [0, 1]);

  const truckOpacityBase = useTransform(progress, [0.22, 0.25, 0.38, 0.42], [0, 1, 1, 0]);
  const truckX = useTransform(progress, [0.22, 0.28, 0.36, 0.4], [700, 850, 1300, 1550]);
  const equipmentGone = useTransform(progress, [0.9, 0.94], [1, 0]);
  const truckOpacity = useTransform(
    [truckOpacityBase, equipmentGone],
    ([a, b]: number[]) => a * b,
  );
  const spadeCombinedOpacity = useTransform(
    [spadeOpacity, equipmentGone],
    ([a, b]: number[]) => a * b,
  );

  const cutawayOpacity = useTransform(progress, [0.28, 0.34, 0.88, 0.95], [0, 1, 1, 0.55]);
  const holeDepth = useTransform(progress, [0.3, 0.36, 0.4], [0, 55, 70]);
  const holeRx = useTransform(progress, [0.3, 0.36], [4, 70]);
  const holeRy = useTransform(holeDepth, (d) => Math.max(4, d * 0.35));
  const holePath = useTransform(holeDepth, (d) => {
    const w = 55;
    const depth = Math.max(2, d);
    return `M${1480 - w} 405 Q${1480} ${405 + depth} ${1480 + w} 405 L${1480 + w * 0.7} ${405 + depth * 0.85} Q${1480} ${405 + depth * 1.05} ${1480 - w * 0.7} ${405 + depth * 0.85} Z`;
  });
  const holeAnnot = useTransform(progress, [0.32, 0.35, 0.38, 0.41], [0, 1, 1, 0]);
  const levelLine = useTransform(progress, [0.42, 0.46, 0.5, 0.54], [0, 1, 1, 0]);

  const backfillH = useTransform(progress, [0.5, 0.55, 0.58, 0.62], [0, 25, 45, 58]);
  const backfillY = useTransform(backfillH, (h) => 470 - h);
  const backfillOpacity = useTransform(progress, [0.5, 0.52, 0.65, 0.7], [0, 1, 1, 0.3]);

  const mulchScale = useTransform(progress, [0.6, 0.66, 0.7], [0.2, 1, 1]);
  const mulchOpacity = useTransform(progress, [0.6, 0.64, 1], [0, 1, 1]);
  const volcanoOpacity = useTransform(progress, [0.63, 0.65, 0.67, 0.69], [0, 1, 1, 0]);
  const stakeOpacity = useTransform(progress, [0.66, 0.68, 0.72, 0.78], [0, 0.7, 0.7, 0]);

  const waterDeep = useTransform(progress, [0.7, 0.74, 0.78, 0.82], [0, 0.7, 1, 0.4]);
  const waterShallow = useTransform(progress, [0.72, 0.74, 0.76, 0.78], [0, 0.8, 0.3, 0]);
  const soilMoist = useTransform(progress, [0.72, 0.78, 0.85], [0, 0.6, 0.35]);

  const rootYoung = useTransform(progress, [0.8, 0.86, 0.92], [0, 1, 0.4]);
  const rootEstablished = useTransform(progress, [0.86, 0.92, 1], [0, 0.7, 1]);
  const rootPath = useTransform(progress, [0.8, 0.9, 1], [0, 0.7, 1]);

  const careOpacity = useTransform(progress, [0.92, 0.96, 1], [0, 1, 1]);
  const shadeOpacity = useTransform(progress, [0.9, 0.96], [0, 0.35]);

  return (
    <motion.g style={{ x: cameraX }}>
      <rect width={SCENE_WORLD_WIDTH} height="420" fill="url(#ti-sky)" />
      <motion.rect width={SCENE_WORLD_WIDTH} height="420" fill="url(#ti-sky-warm)" style={{ opacity: skyWarm }} />
      <motion.rect width={SCENE_WORLD_WIDTH} height="420" fill="url(#ti-sky-cool)" style={{ opacity: skyCool }} />

      <path
        d="M0 340 Q200 300 400 330 T800 320 T1200 335 T1600 310 T2000 340 L2000 420 L0 420 Z"
        fill="rgba(90,120,80,0.25)"
      />

      <motion.g style={{ opacity: farmOpacity }}>
        <rect x="0" y="380" width="900" height="260" fill="url(#ti-farm-ground)" />
        <path
          d="M0 380 L900 380 L900 400 Q700 395 500 402 T0 398 Z"
          fill="rgba(255,255,255,0.08)"
        />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="40"
            y1={400 + i * 18}
            x2="780"
            y2={405 + i * 16}
            stroke="rgba(40,60,30,0.15)"
            strokeWidth="2"
          />
        ))}
        <motion.g style={{ opacity: neighborDim }}>
          <FarmTreeRow />
        </motion.g>
      </motion.g>

      <rect x="850" y="390" width="400" height="40" fill="#6a6860" opacity="0.55" />
      <rect x="850" y="405" width="400" height="4" fill="rgba(255,255,255,0.25)" />

      <motion.g style={{ opacity: propertyOpacity }}>
        <rect x="1150" y="380" width="850" height="260" fill="url(#ti-lawn)" />
        <g transform="translate(1280 250)" filter="url(#ti-soft-shadow)">
          <rect x="0" y="60" width="160" height="110" fill="url(#ti-house)" />
          <polygon points="-10,60 80,0 170,60" fill="#8a6a4a" />
          <rect x="20" y="90" width="28" height="36" fill="#6a8aaa" opacity="0.7" />
          <rect x="110" y="90" width="28" height="36" fill="#6a8aaa" opacity="0.7" />
          <rect x="65" y="115" width="30" height="55" fill="#5a4030" />
        </g>
        <path
          d="M1440 420 Q1520 430 1600 425 L1620 460 Q1500 470 1420 455 Z"
          fill="#9a9488"
          opacity="0.7"
        />
        <line x1="1680" y1="200" x2="1900" y2="210" stroke="#5a5a5a" strokeWidth="1.5" opacity="0.5" />
        <line x1="1720" y1="200" x2="1720" y2="380" stroke="#5a5a5a" strokeWidth="2" opacity="0.4" />
        <line x1="1860" y1="208" x2="1860" y2="380" stroke="#5a5a5a" strokeWidth="2" opacity="0.4" />
        <motion.ellipse
          cx="1480"
          cy="400"
          rx="120"
          ry="28"
          fill="rgba(20,40,25,0.35)"
          style={{ opacity: shadeOpacity }}
        />
      </motion.g>

      <motion.g style={{ opacity: evalAnnot }} aria-hidden>
        <path
          d="M1220 140 Q1480 60 1780 150"
          fill="none"
          stroke="rgba(199,162,93,0.65)"
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <circle cx="1480" cy="70" r="14" fill="#e8c878" opacity="0.85" />
        <text x="1480" y="50" textAnchor="middle" fontSize="11" fontWeight="700" fill="#745337">
          Sun path
        </text>
        <path
          d="M1300 500 Q1480 510 1700 495"
          fill="none"
          stroke="#65736b"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <text x="1480" y="530" textAnchor="middle" fontSize="10" fill="#65736b" fontWeight="600">
          Underground utilities
        </text>
        <circle
          cx="1480"
          cy="400"
          r="90"
          fill="none"
          stroke="rgba(31,83,63,0.45)"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <circle cx="1480" cy="398" r="7" fill="#c7a25d" />
        <text x="1480" y="385" textAnchor="middle" fontSize="10" fontWeight="700" fill="#173b2f">
          Planting location
        </text>
        <text x="1360" y="360" fontSize="9" fill="#65736b">
          House clearance
        </text>
        <text x="1580" y="360" fontSize="9" fill="#65736b">
          Driveway
        </text>
        <text x="1720" y="280" fontSize="9" fill="#65736b">
          Overhead lines
        </text>
      </motion.g>

      <motion.g style={{ opacity: cutawayOpacity }} clipPath="url(#ti-cutaway-clip)" aria-hidden>
        <rect x="1350" y="400" width="280" height="220" fill="url(#ti-soil)" />
        <rect x="1350" y="400" width="280" height="220" fill="url(#ti-soil-noise)" />
        <motion.rect
          x="1350"
          y="400"
          width="280"
          height="220"
          fill="url(#ti-soil-moist)"
          style={{ opacity: soilMoist }}
        />
        <line x1="1350" y1="400" x2="1630" y2="400" stroke="#5a7a4c" strokeWidth="3" />
      </motion.g>

      <motion.g style={{ opacity: cutawayOpacity }} aria-hidden>
        <motion.ellipse cx="1480" cy="410" fill="#3a2a1c" style={{ rx: holeRx, ry: holeRy }} />
        <motion.path fill="#2a1e14" style={{ d: holePath }} />
      </motion.g>

      <motion.g style={{ opacity: holeAnnot }} aria-hidden>
        <line x1="1410" y1="400" x2="1550" y2="400" stroke="#f5f8f2" strokeWidth="1.5" />
        <text x="1560" y="404" fontSize="10" fill="#f5f8f2" fontWeight="700">
          Grade
        </text>
        <line x1="1555" y1="410" x2="1555" y2="470" stroke="#c7a25d" strokeWidth="1.5" />
        <text x="1565" y="445" fontSize="10" fill="#c7a25d" fontWeight="700">
          Depth
        </text>
        <text x="1480" y="490" textAnchor="middle" fontSize="10" fill="#f5f8f2" fontWeight="600">
          Match root-ball width — not too deep
        </text>
      </motion.g>

      <motion.g style={{ opacity: truckOpacity, x: truckX }} aria-hidden>
        <g transform="translate(0 340)">
          <rect x="0" y="20" width="160" height="36" rx="4" fill="url(#ti-truck)" />
          <rect x="130" y="0" width="55" height="40" rx="4" fill="#4a5258" />
          <rect x="145" y="8" width="22" height="14" fill="#7a9aaa" opacity="0.6" />
          <circle cx="30" cy="60" r="14" fill="#2a2a2a" />
          <circle cx="30" cy="60" r="6" fill="#6a6a6a" />
          <circle cx="110" cy="60" r="14" fill="#2a2a2a" />
          <circle cx="110" cy="60" r="6" fill="#6a6a6a" />
          <circle cx="155" cy="58" r="12" fill="#2a2a2a" />
        </g>
      </motion.g>

      <motion.g style={{ opacity: spadeCombinedOpacity, x: spadeX, y: spadeY }} aria-hidden>
        <g transform="translate(0 300)">
          <rect x="-8" y="-120" width="16" height="100" rx="2" fill="url(#ti-spade)" />
          <rect x="-40" y="-130" width="80" height="18" rx="3" fill="#4a5058" />
          <line
            x1="0"
            y1="-20"
            x2="-28"
            y2="50"
            stroke="#5a6068"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1="0"
            y1="-20"
            x2="28"
            y2="50"
            stroke="#5a6068"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <motion.g style={{ opacity: bladeOpen }}>
            <line
              x1="-8"
              y1="-10"
              x2="-30"
              y2="48"
              stroke="#3a4048"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <line
              x1="8"
              y1="-10"
              x2="30"
              y2="48"
              stroke="#3a4048"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </motion.g>
          <path d="M-28 40 Q0 70 28 40" fill="none" stroke="#3a4048" strokeWidth="5" strokeLinecap="round" />
        </g>
      </motion.g>

      <motion.g style={{ opacity: selectAnnot }} aria-hidden>
        <ellipse cx="400" cy="375" rx="90" ry="50" fill="url(#ti-select-glow)" />
        <line x1="400" y1="160" x2="400" y2="340" stroke="#173b2f" strokeWidth="1.25" strokeDasharray="3 3" />
        <text x="412" y="240" fontSize="10" fontWeight="700" fill="#173b2f">
          Height
        </text>
        <line x1="340" y1="300" x2="460" y2="300" stroke="#173b2f" strokeWidth="1.25" strokeDasharray="3 3" />
        <text x="400" y="292" textAnchor="middle" fontSize="10" fontWeight="700" fill="#173b2f">
          Canopy
        </text>
        <line x1="385" y1="350" x2="415" y2="350" stroke="#745337" strokeWidth="2" />
        <text x="425" y="354" fontSize="9" fill="#745337" fontWeight="600">
          Caliper
        </text>
        <text x="400" y="420" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1f533f">
          Species · sun · spacing
        </text>
      </motion.g>

      <motion.g style={{ opacity: backfillOpacity }} aria-hidden>
        <motion.rect x="1420" fill="#7a5c40" width="120" style={{ y: backfillY, height: backfillH }} />
        <motion.rect
          x="1420"
          width="120"
          fill="url(#ti-soil-noise)"
          style={{ y: backfillY, height: backfillH }}
        />
      </motion.g>

      <motion.g style={{ opacity: waterDeep }} aria-hidden>
        <ellipse cx="1480" cy="450" rx="50" ry="40" fill="rgba(90,140,160,0.25)" />
        <ellipse cx="1480" cy="470" rx="45" ry="35" fill="rgba(70,120,140,0.3)" />
        <path
          d="M1450 420 Q1480 460 1510 420"
          fill="none"
          stroke="rgba(120,170,190,0.45)"
          strokeWidth="3"
        />
        <path
          d="M1440 440 Q1480 490 1520 440"
          fill="none"
          stroke="rgba(100,150,170,0.35)"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g style={{ opacity: waterShallow }} aria-hidden>
        <ellipse cx="1580" cy="405" rx="35" ry="8" fill="rgba(100,160,200,0.4)" />
        <text x="1580" y="395" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b3a3a">
          Shallow only ✕
        </text>
        <text x="1480" y="520" textAnchor="middle" fontSize="10" fontWeight="700" fill="#1f533f">
          Deep root-zone moisture ✓
        </text>
      </motion.g>

      <motion.g style={{ opacity: rootYoung }} aria-hidden>
        <motion.path
          d="M1480 455 Q1450 480 1420 510"
          fill="none"
          stroke="#5a4030"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: rootPath }}
        />
        <motion.path
          d="M1480 455 Q1510 485 1545 505"
          fill="none"
          stroke="#5a4030"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: rootPath }}
        />
        <motion.path
          d="M1480 460 Q1465 500 1455 530"
          fill="none"
          stroke="#6a5040"
          strokeWidth="1.5"
          style={{ pathLength: rootPath }}
        />
      </motion.g>

      <motion.g style={{ opacity: rootEstablished }} aria-hidden>
        <path d="M1480 450 Q1420 490 1360 540" fill="none" stroke="#4a3428" strokeWidth="2.5" opacity="0.7" />
        <path d="M1480 450 Q1540 495 1600 535" fill="none" stroke="#4a3428" strokeWidth="2.5" opacity="0.7" />
        <path d="M1480 455 Q1450 520 1430 560" fill="none" stroke="#5a4030" strokeWidth="2" opacity="0.6" />
        <path d="M1480 455 Q1515 525 1535 565" fill="none" stroke="#5a4030" strokeWidth="2" opacity="0.6" />
        <path d="M1470 460 Q1400 510 1380 580" fill="none" stroke="#6a5040" strokeWidth="1.5" opacity="0.5" />
        <path d="M1490 460 Q1560 515 1580 575" fill="none" stroke="#6a5040" strokeWidth="1.5" opacity="0.5" />
      </motion.g>

      <motion.g
        style={{ x: treeX, y: treeY, rotate: treeRotate, scale: treeScale }}
        filter="url(#ti-soft-shadow)"
      >
        <motion.g style={{ opacity: rootBallOpacity, y: rootBallY }}>
          <ellipse cx="0" cy="0" rx="48" ry="36" fill="url(#ti-rootball)" />
          <ellipse cx="0" cy="-8" rx="42" ry="20" fill="rgba(90,70,50,0.35)" />
          <path
            d="M-30 5 Q-40 25 -20 35 M0 10 Q-5 40 10 38 M25 5 Q35 28 15 36"
            fill="none"
            stroke="#3a2a1c"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <ellipse cx="0" cy="0" rx="48" ry="36" fill="none" stroke="#4a3424" strokeWidth="1.5" opacity="0.4" />
        </motion.g>

        <rect x="-9" y="-30" width="18" height="95" rx="4" fill="url(#ti-trunk)" />
        <path d="M-9 55 Q0 48 9 55" fill="none" stroke="#5a4029" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="-4" y1="-10" x2="-4" y2="50" stroke="rgba(40,28,18,0.25)" strokeWidth="1" />
        <line x1="3" y1="0" x2="3" y2="45" stroke="rgba(40,28,18,0.2)" strokeWidth="1" />

        <path d="M0 -175 L-62 -25 L62 -25 Z" fill="url(#ti-canopy)" />
        <path d="M0 -215 L-48 -70 L48 -70 Z" fill="#2a6b52" />
        <path d="M0 -245 L-30 -115 L30 -115 Z" fill="#3d8a6a" />
        <path d="M-8 -170 L-50 -40" stroke="rgba(120,180,140,0.35)" strokeWidth="3" fill="none" />

        <motion.g style={{ opacity: canopyFull }}>
          <path d="M0 -185 L-78 -20 L78 -20 Z" fill="url(#ti-canopy-full)" opacity="0.85" />
          <path d="M0 -230 L-58 -60 L58 -60 Z" fill="#2f7a58" opacity="0.9" />
          <path d="M0 -265 L-36 -105 L36 -105 Z" fill="#4aa574" />
          <ellipse cx="-25" cy="-100" rx="18" ry="12" fill="rgba(90,160,110,0.35)" />
          <ellipse cx="28" cy="-90" rx="16" ry="10" fill="rgba(90,160,110,0.3)" />
        </motion.g>
      </motion.g>

      <motion.g style={{ opacity: levelLine }} aria-hidden>
        <line x1="1400" y1="400" x2="1560" y2="400" stroke="#c7a25d" strokeWidth="2" />
        <text x="1480" y="392" textAnchor="middle" fontSize="10" fontWeight="700" fill="#745337">
          Root flare at grade
        </text>
        <line
          x1="1480"
          y1="280"
          x2="1480"
          y2="400"
          stroke="rgba(23,59,47,0.4)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text x="1490" y="320" fontSize="9" fill="#173b2f">
          Plumb
        </text>
      </motion.g>

      <motion.ellipse
        cx="1480"
        cy="402"
        rx="95"
        ry="22"
        fill="url(#ti-mulch)"
        style={{ opacity: mulchOpacity, scale: mulchScale }}
        aria-hidden
      />
      <motion.ellipse
        cx="1480"
        cy="402"
        rx="28"
        ry="10"
        fill="url(#ti-lawn)"
        style={{ opacity: mulchOpacity }}
        aria-hidden
      />

      <motion.g style={{ opacity: volcanoOpacity }} aria-hidden>
        <ellipse cx="1620" cy="395" rx="28" ry="18" fill="#4a3020" />
        <path d="M1600 395 L1620 360 L1640 395 Z" fill="#3a2418" />
        <circle cx="1655" cy="355" r="12" fill="#8b3a3a" />
        <text x="1655" y="359" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">
          !
        </text>
        <text x="1620" y="430" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8b3a3a">
          Volcano mulch — incorrect
        </text>
        <text x="1480" y="435" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1f533f">
          Wide ring, clear of trunk — correct
        </text>
      </motion.g>

      <motion.g style={{ opacity: stakeOpacity }} aria-hidden>
        <line x1="1430" y1="300" x2="1465" y2="395" stroke="#8a7358" strokeWidth="3" />
        <line x1="1530" y1="300" x2="1495" y2="395" stroke="#8a7358" strokeWidth="3" />
        <line x1="1435" y1="340" x2="1480" y2="355" stroke="#c7a25d" strokeWidth="1.5" />
        <line x1="1525" y1="340" x2="1480" y2="355" stroke="#c7a25d" strokeWidth="1.5" />
      </motion.g>

      <motion.g style={{ opacity: careOpacity }} aria-hidden>
        {[
          { x: 1320, label: "Water" },
          { x: 1400, label: "Mulch" },
          { x: 1480, label: "Prune" },
          { x: 1560, label: "Inspect" },
          { x: 1640, label: "Soil" },
        ].map((item) => (
          <g key={item.label} transform={`translate(${item.x} 545)`}>
            <rect
              x="-32"
              y="-14"
              width="64"
              height="28"
              rx="8"
              fill="rgba(255,255,255,0.82)"
              stroke="rgba(23,59,47,0.12)"
            />
            <text x="0" y="5" textAnchor="middle" fontSize="10" fontWeight="700" fill="#173b2f">
              {item.label}
            </text>
          </g>
        ))}
      </motion.g>
    </motion.g>
  );
}

function StaticProgressBridge({
  progress,
  staticStage,
  children,
}: {
  progress: MotionValue<number>;
  staticStage?: number;
  children: (bridged: MotionValue<number>) => ReactNode;
}) {
  const bridged = useTransform(progress, (p) =>
    staticStage !== undefined ? stageMidpoint(staticStage) : p,
  );
  return <>{children(bridged)}</>;
}

export default function TreeInstallationScene({
  progress,
  staticStage,
  variant = "desktop",
  className,
  stageLabel,
}: TreeInstallationSceneProps) {
  useReducedMotion();

  return (
    <div
      className={["installation-scene", `installation-scene--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {stageLabel ? (
        <p className="installation-scene__label" aria-live="polite">
          {stageLabel}
        </p>
      ) : null}
      <svg
        className="installation-scene__svg"
        viewBox={`0 0 ${SCENE_VIEW_WIDTH} ${SCENE_VIEW_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Continuous tree installation illustration from farm to established landscape"
      >
        <SceneDefs />
        <StaticProgressBridge progress={progress} staticStage={staticStage}>
          {(bridged) => <ContinuousSceneLayers progress={bridged} />}
        </StaticProgressBridge>
      </svg>
    </div>
  );
}
