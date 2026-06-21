import type { Variants } from "framer-motion";
import { DURATION, EASE, OFFSET, STAGGER } from "./tokens";

export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER,
      delayChildren: 0.05,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: OFFSET },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.base,
      ease: EASE,
      staggerChildren: STAGGER,
      delayChildren: 0.04,
    },
  },
};

export const mobileMenuItemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.base, ease: EASE },
  },
};

export const lightboxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: DURATION.fast, ease: EASE },
  },
};
