"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

export default function HamburgerIcon({ open }: { open: boolean }) {
  const reduced = useReducedMotion();

  const lineProps = reduced
    ? {}
    : { transition: { duration: DURATION.base, ease: EASE } };

  return (
    <span className="hamburger-icon" aria-hidden>
      <motion.span
        className="hamburger-line"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        {...lineProps}
      />
      <motion.span
        className="hamburger-line"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        {...lineProps}
      />
      <motion.span
        className="hamburger-line"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        {...lineProps}
      />
    </span>
  );
}
