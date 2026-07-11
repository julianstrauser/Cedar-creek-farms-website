"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { MotionButton } from "@/components/motion";
import { DURATION, EASE } from "@/lib/motion/tokens";
import {
  INSTALLATION_STAGES,
  INSTALLATION_STAGE_COUNT,
} from "@/lib/tree-installation/stages";
import { stageIndexFromProgress } from "@/lib/tree-installation/timeline";
import InstallationProgress from "./InstallationProgress";
import InstallationStage from "./InstallationStage";
import TreeInstallationScene from "./TreeInstallationScene";

export default function TreeInstallationExperience() {
  const reduced = useReducedMotion();
  const installationRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);

  const { scrollYProgress } = useScroll({
    target: installationRef,
    offset: ["start start", "end end"],
  });

  // Fallback motion value for finale / SSR-safe consumers
  const finaleProgress = useMotionValue(0.95);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!pageVisible) return;
    setActiveStage(stageIndexFromProgress(v));
  });

  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const stageLabel = `Step ${activeStage + 1} — ${INSTALLATION_STAGES[activeStage]?.title ?? ""}`;

  return (
    <article className="tree-installation">
      <header className="tree-installation-intro">
        <div className="tree-installation-intro-ambient" aria-hidden />
        <motion.div
          className="tree-installation-intro-inner"
          initial={reduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE }}
        >
          <p className="eyebrow eyebrow-badge">Professional Tree Installation</p>
          <h1>From Our Farm to Your Property</h1>
          <p className="tree-installation-intro-copy">
            Follow the complete Cedar Creek Farms process—from selecting the right tree to
            establishing healthy roots for years to come.
          </p>
          <div className="hero-actions">
            <MotionButton className="button primary" href="/contact">
              Request an Installation Quote
            </MotionButton>
            <MotionButton className="button secondary" href="/inventory">
              View Available Trees
            </MotionButton>
          </div>
        </motion.div>
        <motion.div
          className="tree-installation-scroll-prompt"
          aria-hidden
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: pageVisible && !reduced ? 1 : 0.6 }}
          transition={{ delay: 0.8, duration: DURATION.base, ease: EASE }}
        >
          <span>Scroll to explore</span>
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none" aria-hidden>
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.5" />
            <motion.circle
              cx="10"
              cy="8"
              r="2"
              fill="currentColor"
              animate={reduced ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </header>

      <div className="tree-installation__scrolly" ref={installationRef}>
        <div className="tree-installation__visual-col" aria-hidden={false}>
          <div className="tree-installation__visual">
            <div className="tree-installation__scene-frame">
              <TreeInstallationScene
                progress={scrollYProgress}
                staticStage={reduced ? activeStage : undefined}
                variant="desktop"
                stageLabel={stageLabel}
              />
            </div>
            <InstallationProgress activeStep={activeStage} progress={scrollYProgress} />
          </div>
        </div>

        <div className="tree-installation__content-col">
          {INSTALLATION_STAGES.map((stage, index) => (
            <InstallationStage
              key={stage.id}
              data={stage}
              index={index}
              active={activeStage === index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <section className="tree-installation-finale">
        <div className="tree-installation-finale-scene" aria-hidden>
          <TreeInstallationScene
            progress={finaleProgress}
            staticStage={9}
            variant="mobile"
          />
        </div>
        <motion.div
          className="tree-installation-finale-content"
          initial={reduced ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: DURATION.slow, ease: EASE }}
        >
          <p className="eyebrow eyebrow-badge">Complete</p>
          <h2>Planted for Today. Growing for Generations.</h2>
          <p>
            Cedar Creek Farms provides professional tree selection, relocation, planting, and
            guidance to help give every tree the strongest possible start.
          </p>
          <div className="hero-actions tree-installation-finale-actions">
            <MotionButton className="button primary" href="/contact">
              Request an Installation Quote
            </MotionButton>
            <MotionButton className="button secondary" href="/inventory">
              View Available Trees
            </MotionButton>
            <MotionButton className="button ghost" href="/contact">
              Contact Cedar Creek Farms
            </MotionButton>
          </div>
        </motion.div>
      </section>

      <p className="sr-only">
        Installation process has {INSTALLATION_STAGE_COUNT} steps. Current step:{" "}
        {activeStage + 1}.
      </p>
    </article>
  );
}
