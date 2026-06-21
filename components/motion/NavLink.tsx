"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

const MotionLink = motion.create(Link);

export default function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Link href={href} aria-current={active ? "page" : undefined} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onClick}
      className="nav-link-motion"
      whileHover={{ backgroundColor: "rgba(31, 83, 63, 0.1)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: DURATION.fast, ease: EASE }}
    >
      {children}
      {active ? <span className="nav-link-underline active" aria-hidden /> : null}
      {!active ? (
        <motion.span
          className="nav-link-underline"
          aria-hidden
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: DURATION.fast, ease: EASE }}
        />
      ) : null}
    </MotionLink>
  );
}
