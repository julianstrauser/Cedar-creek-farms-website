"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

type WateringIllustrationProps = {
  deepSaturation?: number;
  shallowContrast?: number;
};

export default function WateringIllustration({
  deepSaturation = 0,
  shallowContrast = 0,
}: WateringIllustrationProps) {
  return (
    <g aria-hidden>
      <motion.rect
        x={280}
        y={440}
        width={240}
        height={120}
        rx={8}
        fill="rgba(42, 107, 82, 0.15)"
        initial={false}
        animate={{ opacity: deepSaturation * 0.85 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.path
        d="M320 420 Q340 460 360 500 Q380 460 400 500 Q420 460 440 500 Q460 460 480 420"
        fill="none"
        stroke="#3d8a6a"
        strokeWidth="3"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: deepSaturation, opacity: deepSaturation }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      {shallowContrast > 0.3 && (
        <g opacity={shallowContrast * 0.5}>
          <ellipse cx={520} cy={470} rx={40} ry={8} fill="rgba(61, 138, 106, 0.25)" />
          <text x={520} y={455} textAnchor="middle" fontSize="9" fill="#65736b">
            Shallow only
          </text>
        </g>
      )}
      <motion.g
        initial={false}
        animate={{ opacity: deepSaturation }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <text x={400} y={575} textAnchor="middle" fontSize="10" fontWeight="700" fill="#173b2f">
          Weeks 1–4: deep soak 2–3× weekly
        </text>
      </motion.g>
    </g>
  );
}
