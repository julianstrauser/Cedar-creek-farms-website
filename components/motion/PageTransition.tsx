"use client";

import { motion, useReducedMotion } from "framer-motion";
import { pageVariants } from "@/lib/motion/variants";

export default function PageTransition({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
