"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "@/lib/motion/variants";
import { VIEWPORT_GRID } from "@/lib/motion/tokens";
import type { MotionComponentProps } from "@/lib/motion/types";

export function StaggerContainer({
  children,
  className,
  ...props
}: MotionComponentProps<"div">) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_GRID}
      variants={staggerContainerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: MotionComponentProps<"div">) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={`stagger-item${className ? ` ${className}` : ""}`} variants={staggerItemVariants} {...props}>
      {children}
    </motion.div>
  );
}
