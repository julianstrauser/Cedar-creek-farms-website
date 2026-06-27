"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MotionButton } from "@/components/motion";
import { DURATION, EASE } from "@/lib/motion/tokens";
import NotFoundTreeScene from "@/components/site/NotFoundTreeScene";

export default function NotFoundContent() {
  const reduced = useReducedMotion();

  const content = (
    <>
      <p className="not-found-code">404</p>
      <h1 className="not-found-headline">Looks like you wandered off the path</h1>
      <p className="not-found-copy">
        The page you&apos;re looking for can&apos;t be found, but there&apos;s plenty to
        explore at Cedar Creek Farms.
      </p>
      <div className="hero-actions not-found-actions">
        <MotionButton className="button primary" href="/">
          Back Home
        </MotionButton>
        <MotionButton className="button secondary" href="/inventory">
          View Inventory
        </MotionButton>
      </div>
    </>
  );

  if (reduced) {
    return (
      <section className="not-found">
        <div className="not-found-inner">
          <div className="not-found-content">{content}</div>
          <NotFoundTreeScene />
        </div>
      </section>
    );
  }

  return (
    <section className="not-found">
      <div className="not-found-inner">
        <motion.div
          className="not-found-content"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.08 },
            },
          }}
        >
          <motion.p
            className="not-found-code"
            variants={{
              hidden: { opacity: 0, y: 36 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            404
          </motion.p>
          <motion.h1
            className="not-found-headline"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            Looks like you wandered off the path
          </motion.h1>
          <motion.p
            className="not-found-copy"
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            The page you&apos;re looking for can&apos;t be found, but there&apos;s plenty to
            explore at Cedar Creek Farms.
          </motion.p>
          <motion.div
            className="hero-actions not-found-actions"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: DURATION.slow, ease: EASE },
              },
            }}
          >
            <MotionButton className="button primary" href="/">
              Back Home
            </MotionButton>
            <MotionButton className="button secondary" href="/inventory">
              View Inventory
            </MotionButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.18 }}
        >
          <NotFoundTreeScene />
        </motion.div>
      </div>
    </section>
  );
}
