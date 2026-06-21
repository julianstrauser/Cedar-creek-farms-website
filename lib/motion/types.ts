import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/** Framer Motion's children typing is too wide for React 19; narrow it for our wrappers. */
export type MotionComponentProps<T extends keyof HTMLElementTagNameMap> = Omit<
  HTMLMotionProps<T>,
  "children"
> & {
  children?: ReactNode;
};
