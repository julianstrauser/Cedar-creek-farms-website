"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { InstallationStageData } from "@/lib/tree-installation/stages";
import { DURATION, EASE, OFFSET } from "@/lib/motion/tokens";
import TreeInstallationScene from "./TreeInstallationScene";

type InstallationStageProps = {
  data: InstallationStageData;
  index: number;
  onActive?: (index: number) => void;
  showMobileScene?: boolean;
};

export default function InstallationStage({
  data,
  index,
  onActive,
  showMobileScene = true,
}: InstallationStageProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const inView = useInView(ref, {
    margin: "-35% 0px -35% 0px",
    amount: 0.35,
  });

  useEffect(() => {
    if (!inView || !onActive) return;

    const mq = window.matchMedia("(max-width: 950px)");
    const syncActive = () => {
      if (mq.matches) onActive(index);
    };

    syncActive();
    mq.addEventListener("change", syncActive);
    return () => mq.removeEventListener("change", syncActive);
  }, [inView, index, onActive]);

  const content = (
    <>
      <p className="eyebrow eyebrow-badge">Step {data.step}</p>
      <h2 id={`installation-stage-${data.id}`}>{data.title}</h2>
      <p>{data.body}</p>
      {data.disclaimer ? (
        <p className="tree-installation-disclaimer">{data.disclaimer}</p>
      ) : null}
    </>
  );

  if (reduced) {
    return (
      <section
        ref={ref}
        className="installation-stage installation-stage--reduced"
        aria-labelledby={`installation-stage-${data.id}`}
      >
        {showMobileScene ? <TreeInstallationScene stage={index} variant="mobile" /> : null}
        <div className="installation-stage-content">{content}</div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="installation-stage"
      aria-labelledby={`installation-stage-${data.id}`}
      data-stage-index={index}
    >
      {showMobileScene ? (
        <div className="installation-stage-scene-mobile">
          <TreeInstallationScene stage={index} variant="mobile" />
        </div>
      ) : null}
      <motion.div
        className="installation-stage-content"
        initial={{ opacity: 0, y: OFFSET }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.35, y: OFFSET * 0.4 }}
        transition={{ duration: DURATION.reveal, ease: EASE }}
      >
        {content}
      </motion.div>
    </section>
  );
}
