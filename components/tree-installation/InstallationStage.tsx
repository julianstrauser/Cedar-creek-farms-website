"use client";

import { motion, type MotionValue, useReducedMotion } from "framer-motion";
import type { InstallationStageData } from "@/lib/tree-installation/stages";
import { DURATION, EASE, OFFSET } from "@/lib/motion/tokens";
import TreeInstallationScene from "./TreeInstallationScene";

type InstallationStageProps = {
  data: InstallationStageData;
  index: number;
  active: boolean;
  progress: MotionValue<number>;
};

export default function InstallationStage({
  data,
  index,
  active,
  progress,
}: InstallationStageProps) {
  const reduced = useReducedMotion();

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

  return (
    <section
      className={[
        "installation-stage",
        active ? "installation-stage--active" : "installation-stage--inactive",
        reduced ? "installation-stage--reduced" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={`installation-stage-${data.id}`}
      data-stage-index={index}
      aria-current={active ? "step" : undefined}
    >
      <div className="installation-stage-scene-mobile">
        <TreeInstallationScene
          progress={progress}
          staticStage={index}
          variant="mobile"
          stageLabel={`Step ${data.step}`}
        />
      </div>
      <motion.div
        className="installation-stage-content"
        initial={false}
        animate={
          reduced
            ? { opacity: 1, y: 0 }
            : active
              ? { opacity: 1, y: 0 }
              : { opacity: 0.4, y: OFFSET * 0.25 }
        }
        transition={{ duration: reduced ? 0.01 : DURATION.reveal, ease: EASE }}
      >
        {content}
      </motion.div>
    </section>
  );
}
