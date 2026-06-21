"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  HamburgerIcon,
  NavLink,
} from "@/components/motion";
import {
  mobileMenuItemVariants,
  mobileMenuVariants,
} from "@/lib/motion/variants";

const links = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Tree Availability" },
  { href: "/services", label: "Transplanting" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Cedar Creek Farms home">
        <Image src="/assets/logo.svg" alt="" width={42} height={42} unoptimized />
        <span>Cedar Creek Farms</span>
      </Link>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="main-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <HamburgerIcon open={open} />
        <span className="menu-button-label">Menu</span>
      </button>
      {reduced ? (
        <nav id="main-nav" className={`main-nav${open ? " open" : ""}`}>
          {links.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              active={pathname === link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      ) : (
        <>
          <nav id="main-nav" className="main-nav desktop-nav" aria-label="Main">
            {links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <AnimatePresence>
            {open ? (
              <motion.button
                type="button"
                className="mobile-nav-backdrop"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {open ? (
              <motion.nav
                id="main-nav-mobile"
                className="main-nav mobile-nav open"
                aria-label="Main"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={mobileMenuVariants}
              >
                {links.map((link) => (
                  <motion.div key={link.href} variants={mobileMenuItemVariants}>
                    <NavLink
                      href={link.href}
                      active={pathname === link.href}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </header>
  );
}
