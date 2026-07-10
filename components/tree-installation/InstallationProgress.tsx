"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion/tokens";
import { INSTALLATION_STAGE_COUNT } from "@/lib/tree-installation/stages";

type InstallationProgressProps = {
  activeStep: number;
  className?: string;
};

export default function InstallationProgress({
  activeStep,
  className,
}: InstallationProgressProps) {
  const reduced = useReducedMotion();
  const progress = ((activeStep + 1) / INSTALLATION_STAGE_COUNT) * 100;

  return (
    <nav
      className={["tree-installation-progress", className].filter(Boolean).join(" ")}
      aria-label="Installation process progress"
    >
      <div className="tree-installation-progress-track" aria-hidden>
        <motion.div
          className="tree-installation-progress-fill"
          initial={false}
          animate={{ height: reduced ? `${progress}%` : `${progress}%` }}
          transition={{ duration: reduced ? 0.01 : 0.5, ease: EASE }}
        />
      </div>
      <ol className="tree-installation-progress-steps">
        {Array.from({ length: INSTALLATION_STAGE_COUNT }, (_, i) => {
          const step = i + 1;
          const isActive = i === activeStep;
          const isComplete = i < activeStep;

          return (
            <li key={step} className={isActive ? "active" : isComplete ? "complete" : ""}>
              <span className="tree-installation-progress-dot" aria-hidden />
              <span className="tree-installation-progress-num">
                {step.toString().padStart(2, "0")}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="tree-installation-progress-label" aria-live="polite">
        Step {activeStep + 1} of {INSTALLATION_STAGE_COUNT}
      </p>
    </nav>
  );
}
