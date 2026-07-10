"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

type TreeSpadeIllustrationProps = {
  progress?: number;
  x?: number;
};

export default function TreeSpadeIllustration({ progress = 0, x = 400 }: TreeSpadeIllustrationProps) {
  if (progress <= 0) return null;

  const bladeY = 380 - progress * 40;

  return (
    <motion.g
      initial={false}
      animate={{ opacity: Math.min(1, progress * 1.5), x }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <path
        d={`M${x - 55} ${bladeY} L${x - 55} 480 L${x - 25} 480 L${x - 25} ${bladeY + 20} Z`}
        fill="rgba(90, 64, 41, 0.35)"
        stroke="#5a4029"
        strokeWidth="1.5"
      />
      <path
        d={`M${x + 25} ${bladeY} L${x + 25} 480 L${x + 55} 480 L${x + 55} ${bladeY + 20} Z`}
        fill="rgba(90, 64, 41, 0.35)"
        stroke="#5a4029"
        strokeWidth="1.5"
      />
      <rect x={x - 8} y={bladeY - 30} width={16} height={35} rx={2} fill="#745337" />
      <text
        x={x}
        y={bladeY - 38}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#173b2f"
        opacity={progress}
      >
        Tree spade
      </text>
    </motion.g>
  );
}
