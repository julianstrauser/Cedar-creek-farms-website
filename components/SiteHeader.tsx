"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        Menu
      </button>
      <nav id="main-nav" className={`main-nav${open ? " open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
