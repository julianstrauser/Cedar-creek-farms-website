"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

type MotionCardProps = {
  as?: "article" | "div" | "button";
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  type?: "button";
  onClick?: () => void;
};

const hoverProps = {
  whileHover: {
    y: -10,
    boxShadow: "0 24px 52px rgba(14, 40, 29, 0.18), 0 0 0 1px rgba(31, 83, 63, 0.08)",
  },
  whileTap: { scale: 0.98, y: -3 },
  transition: { duration: DURATION.fast, ease: EASE },
};

export default function MotionCard({
  as = "article",
  children,
  className,
  interactive = true,
  type,
  onClick,
}: MotionCardProps) {
  const reduced = useReducedMotion();

  if (reduced || !interactive) {
    if (as === "button") {
      return (
        <button className={className} type={type ?? "button"} onClick={onClick}>
          {children}
        </button>
      );
    }
    if (as === "div") {
      return (
        <div className={className} onClick={onClick}>
          {children}
        </div>
      );
    }
    return (
      <article className={className} onClick={onClick}>
        {children}
      </article>
    );
  }

  if (as === "button") {
    return (
      <motion.button className={className} type={type} onClick={onClick} {...hoverProps}>
        {children}
      </motion.button>
    );
  }

  if (as === "div") {
    return (
      <motion.div className={className} onClick={onClick} {...hoverProps}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.article className={className} onClick={onClick} {...hoverProps}>
      {children}
    </motion.article>
  );
}
