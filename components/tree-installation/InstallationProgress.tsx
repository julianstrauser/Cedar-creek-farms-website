"use client";

import { motion, type MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { INSTALLATION_STAGE_COUNT } from "@/lib/tree-installation/stages";

type InstallationProgressProps = {
  activeStep: number;
  progress: MotionValue<number>;
  className?: string;
};

export default function InstallationProgress({
  activeStep,
  progress,
  className,
}: InstallationProgressProps) {
  const reduced = useReducedMotion();
  const fillFromStep = ((activeStep + 1) / INSTALLATION_STAGE_COUNT) * 100;
  const fillHeight = useTransform(progress, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);

  return (
    <nav
      className={["tree-installation-progress", className].filter(Boolean).join(" ")}
      aria-label="Installation process progress"
    >
      <div className="tree-installation-progress-track" aria-hidden>
        {reduced ? (
          <motion.div
            className="tree-installation-progress-fill"
            initial={false}
            animate={{ height: `${fillFromStep}%` }}
            transition={{ duration: 0.01 }}
          />
        ) : (
          <motion.div className="tree-installation-progress-fill" style={{ height: fillHeight }} />
        )}
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
