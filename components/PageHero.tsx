"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  heroActionsVariants,
  heroContainerVariants,
  heroEyebrowVariants,
  heroItemVariants,
} from "@/lib/motion/variants";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
  className = "page-hero compact",
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <section className={className}>
        <div className="page-hero-ambient" aria-hidden />
        <p className="eyebrow eyebrow-badge">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </section>
    );
  }

  return (
    <section className={className}>
      <div className="page-hero-ambient" aria-hidden />
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow eyebrow-badge" variants={heroEyebrowVariants}>
          {eyebrow}
        </motion.p>
        <motion.h1 variants={heroItemVariants}>{title}</motion.h1>
        <motion.p variants={heroItemVariants}>{description}</motion.p>
        {children ? (
          <motion.div className="page-hero-actions" variants={heroActionsVariants}>
            {children}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
