"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE, OFFSET, VIEWPORT } from "@/lib/motion/tokens";

type ScrollRevealProps = {
  as?: "div" | "section" | "article" | "aside";
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function ScrollReveal({
  as = "div",
  children,
  className,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const motionProps = {
    className,
    initial: { opacity: 0, y: OFFSET },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: DURATION.base, ease: EASE, delay },
  };

  if (as === "section") return <motion.section {...motionProps}>{children}</motion.section>;
  if (as === "article") return <motion.article {...motionProps}>{children}</motion.article>;
  if (as === "aside") return <motion.aside {...motionProps}>{children}</motion.aside>;

  return <motion.div {...motionProps}>{children}</motion.div>;
}
