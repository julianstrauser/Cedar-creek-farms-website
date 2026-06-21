"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion/tokens";

const links = [
  { href: "/inventory", label: "Availability" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const MotionLink = motion.create(Link);

export default function FooterLinks() {
  const reduced = useReducedMotion();

  return (
    <div className="footer-links">
      {links.map((link) =>
        reduced ? (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ) : (
          <MotionLink
            key={link.href}
            href={link.href}
            whileHover={{ y: -1, color: "var(--green-700)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
          >
            {link.label}
          </MotionLink>
        )
      )}
    </div>
  );
}
