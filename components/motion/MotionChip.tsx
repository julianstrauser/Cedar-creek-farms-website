"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

type MotionChipProps = {
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function MotionChip({
  active,
  children,
  className = "",
  onClick,
  type = "button",
}: MotionChipProps) {
  const reduced = useReducedMotion();
  const classes = [className, active ? "active" : ""].filter(Boolean).join(" ");

  if (reduced) {
    return (
      <button type={type} className={classes} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      {children}
    </motion.button>
  );
}
