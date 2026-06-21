"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { PageTransition } from "@/components/motion";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <PageTransition key={pathname}>
          <main>{children}</main>
        </PageTransition>
      </AnimatePresence>
      <SiteFooter />
    </>
  );
}
