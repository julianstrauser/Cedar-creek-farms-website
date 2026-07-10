"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

type RootGrowthIllustrationProps = {
  expansion?: number;
  season?: number;
};

const SEASON_LABELS = ["Spring", "Summer", "Fall", "Winter"];

export default function RootGrowthIllustration({
  expansion = 0,
  season = 0,
}: RootGrowthIllustrationProps) {
  const seasonIndex = Math.min(3, Math.floor(season * 4));
  const reach = 30 + expansion * 55;

  return (
    <g aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M400 480 Q${380 + i * 10} ${500 + reach * 0.3} ${360 + i * 15} ${480 + reach}`}
          fill="none"
          stroke="#4a7a5a"
          strokeWidth={1.5 + expansion}
          strokeLinecap="round"
          initial={false}
          animate={{
            pathLength: expansion,
            opacity: 0.35 + expansion * 0.45,
          }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
        />
      ))}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.path
          key={`r-${i}`}
          d={`M400 480 Q${420 - i * 10} ${500 + reach * 0.3} ${440 - i * 15} ${480 + reach}`}
          fill="none"
          stroke="#4a7a5a"
          strokeWidth={1.5 + expansion}
          strokeLinecap="round"
          initial={false}
          animate={{
            pathLength: expansion,
            opacity: 0.35 + expansion * 0.45,
          }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
        />
      ))}
      <motion.text
        x={680}
        y={80}
        textAnchor="end"
        fontSize="11"
        fontWeight="800"
        fill="#173b2f"
        initial={false}
        animate={{ opacity: expansion > 0.2 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        {SEASON_LABELS[seasonIndex]}
      </motion.text>
    </g>
  );
}
