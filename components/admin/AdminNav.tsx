"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="admin-header">
      <div className="admin-header-inner">
        <div>
          <p className="admin-eyebrow">Owner dashboard</p>
          <Link href="/admin" className="admin-brand">
            Cedar Creek Farms Admin
          </Link>
        </div>
        <nav className="admin-nav">
          {links.map((link) => {
            const active = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/" className="admin-nav-muted">
            View site
          </Link>
          <button className="button secondary admin-signout" type="button" onClick={signOut}>
            Sign out
          </button>
        </nav>
      </div>
    </header>
  );
}
