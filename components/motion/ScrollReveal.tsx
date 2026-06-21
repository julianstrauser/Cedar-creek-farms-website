"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE, OFFSET, VIEWPORT } from "@/lib/motion/tokens";

type ScrollRevealProps = {
  as?: "div" | "section" | "article" | "aside";
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Use mount animation for above-the-fold content (hero areas) */
  priority?: boolean;
};

export default function ScrollReveal({
  as = "div",
  children,
  className,
  delay = 0,
  priority = false,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const motionState = {
    opacity: 1,
    y: 0,
  };

  const baseProps = {
    className,
    initial: { opacity: 0, y: OFFSET },
    transition: { duration: DURATION.slow, ease: EASE, delay },
  };

  const motionProps = priority
    ? { ...baseProps, animate: motionState }
    : { ...baseProps, whileInView: motionState, viewport: VIEWPORT };

  if (as === "section") return <motion.section {...motionProps}>{children}</motion.section>;
  if (as === "article") return <motion.article {...motionProps}>{children}</motion.article>;
  if (as === "aside") return <motion.aside {...motionProps}>{children}</motion.aside>;

  return <motion.div {...motionProps}>{children}</motion.div>;
}
