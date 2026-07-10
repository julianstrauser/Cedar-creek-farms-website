"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import TreeIllustration, { TreeIllustrationDefs, treeGradients } from "./TreeIllustration";
import RootBallIllustration from "./RootBallIllustration";
import TreeSpadeIllustration from "./TreeSpadeIllustration";
import WateringIllustration from "./WateringIllustration";
import RootGrowthIllustration from "./RootGrowthIllustration";

export type SceneVariant = "desktop" | "mobile";

type TreeInstallationSceneProps = {
  stage: number;
  blend?: number;
  variant?: SceneVariant;
  className?: string;
};

function clampStage(stage: number) {
  return Math.max(0, Math.min(9, stage));
}

export default function TreeInstallationScene({
  stage,
  blend = 0,
  variant = "desktop",
  className,
}: TreeInstallationSceneProps) {
  const reduced = useReducedMotion();
  const gradPrefix = useId().replace(/:/g, "");
  const grads = treeGradients(gradPrefix);
  const s = clampStage(stage);
  const t = reduced ? { duration: 0.01 } : { duration: 0.65, ease: EASE };

  const isFarm = s <= 1;
  const isProperty = s >= 1 && s <= 2;
  const showUnderground = s >= 2 && s <= 8;
  const showHole = s >= 3 && s <= 6;
  const treeLift = s >= 2 && s <= 4 ? (s === 2 ? 0.4 : s === 3 ? 0.15 : 0) : 0;
  const treeInHole = s >= 4 && s <= 6;
  const mulchRing = s >= 6 ? Math.min(1, s === 6 ? 0.5 + blend * 0.5 : 1) : 0;
  const waterPhase = s === 7 ? 1 : s > 7 ? 0.6 : 0;
  const rootGrowth = s >= 8 ? Math.min(1, s - 8 + blend) : 0;
  const careIcons = s >= 9 ? 1 : 0;
  const canopyFull = 0.6 + (s / 9) * 0.4;

  return (
    <div
      className={["tree-installation-scene", `tree-installation-scene--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={variant === "desktop"}
    >
      <svg
        className="tree-installation-scene-svg"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Tree installation process illustration"
      >
        <TreeIllustrationDefs prefix={gradPrefix} />
        <rect width={800} height={600} fill={grads.sky} />
        <rect x={0} y={420} width={800} height={180} fill={grads.ground} />

        <motion.g animate={{ opacity: isFarm && s === 0 ? 1 : s === 0 ? 0.4 : 0 }} transition={t}>
          <ellipse cx={200} cy={430} rx={120} ry={20} fill="rgba(42, 107, 82, 0.12)" />
          <ellipse cx={600} cy={435} rx={100} ry={18} fill="rgba(42, 107, 82, 0.1)" />
          <TreeIllustration gradPrefix={gradPrefix} x={180} y={400} scale={0.65} opacity={0.5} canopyFullness={0.7} />
          <TreeIllustration gradPrefix={gradPrefix} x={520} y={405} scale={0.6} opacity={0.45} canopyFullness={0.65} />
          <TreeIllustration gradPrefix={gradPrefix} x={400} y={395} scale={0.85} highlight canopyFullness={0.85} />
          {s === 0 && (
            <g stroke="#173b2f" strokeWidth="1" opacity={0.45} fill="none">
              <line x1={400} y1={280} x2={400} y2={340} strokeDasharray="3 2" />
              <text x={410} y={310} fontSize="9" fill="#173b2f">
                Height
              </text>
              <line x1={340} y1={360} x2={460} y2={360} strokeDasharray="3 2" />
              <text x={400} y={352} textAnchor="middle" fontSize="9" fill="#173b2f">
                Canopy
              </text>
            </g>
          )}
        </motion.g>

        <motion.g
          animate={{ opacity: isProperty || s > 1 ? Math.min(1, s >= 1 ? 0.3 + s * 0.15 : 0) : 0 }}
          transition={t}
        >
          <rect x={80} y={300} width={140} height={100} rx={4} fill="#e8e4dc" stroke="#c8c0b4" strokeWidth="1.5" />
          <polygon points="80,300 150,240 220,300" fill="#d4cfc4" stroke="#c8c0b4" strokeWidth="1.5" />
          <rect x={520} y={340} width={80} height={12} rx={2} fill="#b8b0a4" opacity={0.6} />
          {s === 1 && (
            <>
              <path
                d="M120 120 Q400 80 680 140"
                fill="none"
                stroke="rgba(199, 162, 93, 0.55)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text x={400} y={70} textAnchor="middle" fontSize="10" fill="#745337" fontWeight="700">
                Sun path
              </text>
              <line x1={400} y1={450} x2={400} y2={480} stroke="#c7a25d" strokeWidth="2" />
              <circle cx={400} cy={448} r={6} fill="#c7a25d" />
              <text x={400} y={498} textAnchor="middle" fontSize="9" fill="#173b2f">
                Planting location
              </text>
              <line x1={300} y1={500} x2={500} y2={500} stroke="#65736b" strokeWidth="1" strokeDasharray="4 3" opacity={0.5} />
              <text x={400} y={515} textAnchor="middle" fontSize="8" fill="#65736b">
                Utilities
              </text>
            </>
          )}
        </motion.g>

        <motion.rect
          x={0}
          y={440}
          width={800}
          height={160}
          fill={grads.soilCut}
          initial={false}
          animate={{ opacity: showUnderground ? 0.85 : 0 }}
          transition={t}
        />

        <TreeSpadeIllustration progress={s === 2 ? 0.6 + blend * 0.4 : s > 2 ? 0 : 0} />
        <RootBallIllustration visible={s >= 2 && s <= 5 ? 1 : 0} lift={treeLift * 80} />

        {showHole && (
          <motion.g initial={false} animate={{ opacity: s >= 3 ? 1 : 0 }} transition={t}>
            <ellipse cx={400} cy={455} rx={55} ry={25} fill="#6b5640" />
            <motion.ellipse
              cx={400}
              cy={480}
              rx={48}
              ry={s >= 3 && s <= 4 ? 35 : 20}
              fill="#5a4838"
              animate={{ ry: s >= 3 && s <= 4 ? 35 : s >= 5 ? 8 : 25 }}
              transition={t}
            />
            {s === 3 && (
              <g fontSize="9" fill="#f5f8f2" fontWeight="700">
                <text x={460} y={470}>
                  Width
                </text>
                <text x={460} y={495}>
                  Depth — not too deep
                </text>
              </g>
            )}
          </motion.g>
        )}

        <TreeIllustration
          gradPrefix={gradPrefix}
          x={400}
          y={treeInHole ? 410 : 395 - treeLift * 60}
          scale={0.85 + (s >= 9 ? 0.1 : 0)}
          rotate={s === 4 ? 3 : 0}
          highlight={s === 0}
          showFlare={s >= 4}
          canopyFullness={canopyFull}
        />

        {s === 4 && (
          <motion.line
            x1={300}
            y1={400}
            x2={500}
            y2={400}
            stroke="#c7a25d"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.8 }}
            transition={t}
          />
        )}

        <motion.g animate={{ opacity: s >= 5 ? Math.min(1, s - 5 + blend + 0.3) : 0 }} transition={t}>
          <path d="M345 455 L345 480 L455 480 L455 455 Z" fill="#8a7358" opacity={0.7} />
        </motion.g>

        <motion.ellipse
          cx={400}
          cy={458}
          rx={90}
          ry={22}
          fill="none"
          stroke="#745337"
          strokeWidth={12}
          opacity={mulchRing * 0.35}
          initial={false}
          animate={{ opacity: mulchRing * 0.35 }}
          transition={t}
        />
        {s === 6 && (
          <g>
            <ellipse cx={520} cy={440} rx={25} ry={15} fill="#5a4029" opacity={0.5} />
            <text x={520} y={425} textAnchor="middle" fontSize="14" fill="#8b3a3a">
              ⚠
            </text>
            <text x={520} y={470} textAnchor="middle" fontSize="8" fill="#65736b">
              Volcano mulch
            </text>
          </g>
        )}

        <WateringIllustration deepSaturation={waterPhase} shallowContrast={s === 7 ? 0.7 : 0} />
        <RootGrowthIllustration expansion={rootGrowth} season={rootGrowth} />

        <motion.g animate={{ opacity: careIcons }} transition={t}>
          {[
            { x: 120, label: "Water" },
            { x: 220, label: "Mulch" },
            { x: 320, label: "Prune" },
            { x: 480, label: "Monitor" },
            { x: 580, label: "Inspect" },
            { x: 680, label: "Soil" },
          ].map((item) => (
            <g key={item.label}>
              <rect
                x={item.x - 28}
                y={520}
                width={56}
                height={28}
                rx={14}
                fill="rgba(255,255,255,0.75)"
                stroke="rgba(23,59,47,0.12)"
              />
              <text x={item.x} y={538} textAnchor="middle" fontSize="9" fontWeight="700" fill="#173b2f">
                {item.label}
              </text>
            </g>
          ))}
        </motion.g>

        <motion.g
          animate={{ opacity: s === 2 ? 0.7 + blend * 0.3 : 0, x: s === 2 ? 0 : -40 }}
          transition={t}
        >
          <rect x={560} y={400} width={120} height={50} rx={6} fill="#65736b" />
          <circle cx={590} cy={455} r={14} fill="#3a3a3a" />
          <circle cx={650} cy={455} r={14} fill="#3a3a3a" />
        </motion.g>
      </svg>
    </div>
  );
}
