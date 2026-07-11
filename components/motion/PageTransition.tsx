"use client";

import { useState } from "react";
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
  // Clear transform after enter so position:sticky descendants work
  const [entered, setEntered] = useState(false);

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
      onAnimationComplete={() => setEntered(true)}
      style={entered ? { transform: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}
