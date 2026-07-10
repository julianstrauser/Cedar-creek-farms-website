"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";

type RootBallIllustrationProps = {
  x?: number;
  y?: number;
  visible?: number;
  lift?: number;
};

export default function RootBallIllustration({
  x = 400,
  y = 420,
  visible = 1,
  lift = 0,
}: RootBallIllustrationProps) {
  if (visible <= 0) return null;

  return (
    <motion.g
      initial={false}
      animate={{ opacity: visible, y: -lift }}
      transition={{ duration: 0.55, ease: EASE }}
      transform={`translate(${x} ${y})`}
    >
      <ellipse cx={0} cy={28} rx={48} ry={32} fill="#6b5640" opacity={0.9} />
      <ellipse cx={0} cy={22} rx={42} ry={26} fill="#8a7358" />
      <path
        d="M-30 18 Q-15 8 0 12 Q15 8 30 18"
        fill="none"
        stroke="#5a4029"
        strokeWidth="1.2"
        opacity={0.5}
      />
      <path
        d="M-20 32 L-8 48 M0 30 L0 50 M20 32 L8 48"
        stroke="#4a6b48"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.45}
      />
    </motion.g>
  );
}
