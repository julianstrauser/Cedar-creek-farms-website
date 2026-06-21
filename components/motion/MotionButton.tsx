"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

const MotionLink = motion.create(Link);
const MotionAnchor = motion.create("a");

const buttonInteractive = {
  whileHover: { y: -2, scale: 1.015 },
  whileTap: { scale: 0.98, y: 0 },
  transition: { duration: DURATION.fast, ease: EASE },
};

const textInteractive = {
  whileHover: { x: 3 },
  whileTap: { scale: 0.99 },
  transition: { duration: DURATION.fast, ease: EASE },
};

function isExternalHref(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

type MotionButtonProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export default function MotionButton({
  href,
  className,
  children,
  type = "button",
  disabled,
  onClick,
  ...aria
}: MotionButtonProps) {
  const reduced = useReducedMotion();
  const isTextLink = className?.includes("text-link");
  const interactive = isTextLink ? textInteractive : buttonInteractive;

  if (href) {
    if (reduced) {
      if (isExternalHref(href)) {
        return (
          <a className={className} href={href} onClick={onClick}>
            {children}
          </a>
        );
      }
      return (
        <Link className={className} href={href} onClick={onClick}>
          {children}
        </Link>
      );
    }

    if (isExternalHref(href)) {
      return (
        <MotionAnchor className={className} href={href} onClick={onClick} {...interactive}>
          {children}
        </MotionAnchor>
      );
    }

    return (
      <MotionLink className={className} href={href} onClick={onClick} {...interactive}>
        {children}
      </MotionLink>
    );
  }

  if (reduced) {
    return (
      <button
        className={className}
        type={type}
        disabled={disabled}
        onClick={onClick}
        {...aria}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...interactive}
      {...aria}
    >
      {children}
    </motion.button>
  );
}
