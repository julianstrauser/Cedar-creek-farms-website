"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { MotionButton } from "@/components/motion";
import {
  heroActionsVariants,
  heroContainerVariants,
  heroItemVariants,
  heroPanelVariants,
} from "@/lib/motion/variants";

export default function HeroSection() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const panelY = useTransform(scrollY, [0, 500], [0, -32]);
  const glowY = useTransform(scrollY, [0, 500], [0, 48]);

  if (reduced) {
    return (
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">
            Field-grown trees • Professional transplanting • Reliable availability
          </p>
          <h1>Quality trees grown for landscapes that need to last.</h1>
          <p className="hero-copy">
            Browse current availability, contact us for pricing, and see recent
            farm and transplanting work.
          </p>
          <div className="hero-actions">
            <MotionButton className="button primary" href="/inventory">
              View Available Trees
            </MotionButton>
            <MotionButton className="button secondary" href="/contact">
              Contact Us
            </MotionButton>
          </div>
        </div>
        <HeroPanelStatic />
      </section>
    );
  }

  return (
    <section className="hero">
      <motion.div
        className="hero-glow"
        aria-hidden
        style={{ y: glowY }}
      />
      <motion.div
        className="hero-content"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={heroItemVariants}>
          Field-grown trees • Professional transplanting • Reliable availability
        </motion.p>
        <motion.h1 variants={heroItemVariants}>
          Quality trees grown for landscapes that need to last.
        </motion.h1>
        <motion.p className="hero-copy" variants={heroItemVariants}>
          Browse current availability, contact us for pricing, and see recent
          farm and transplanting work.
        </motion.p>
        <motion.div className="hero-actions" variants={heroActionsVariants}>
          <MotionButton className="button primary" href="/inventory">
            View Available Trees
          </MotionButton>
          <MotionButton className="button secondary" href="/contact">
            Contact Us
          </MotionButton>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-panel"
        aria-label="Tree farm highlight card"
        variants={heroPanelVariants}
        initial="hidden"
        animate="visible"
        style={{ y: panelY }}
      >
        <HeroPanelStatic />
      </motion.div>
    </section>
  );
}

function HeroPanelStatic() {
  return (
    <>
      <div className="status-card">
        <span className="status-dot"></span>
        <p>Availability updated regularly</p>
      </div>
      <h2>
        Shade trees, ornamental trees, privacy trees, and transplanting
        services.
      </h2>
      <dl className="hero-stats">
        <div>
          <dt>Services</dt>
          <dd>Sales + Transplanting</dd>
        </div>
        <div>
          <dt>Use</dt>
          <dd>Homes, ranches, businesses</dd>
        </div>
        <div>
          <dt>Process</dt>
          <dd>Contact → Select → Deliver</dd>
        </div>
      </dl>
    </>
  );
}
