import Link from "next/link";
import Image from "next/image";
import {
  SITE_CONTACT,
  contactEmailHref,
  contactPhoneHref,
} from "@/lib/contact";

export default function SiteFooter() {
  const phoneHref = contactPhoneHref();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand footer-brand" href="/">
          <Image src="/assets/logo.svg" alt="" width={42} height={42} unoptimized />
          <span>Cedar Creek Farms</span>
        </Link>
        <p>Contact for current pricing and availability.</p>
        <div className="footer-contact">
          <p>
            Email:{" "}
            <a href={contactEmailHref()}>{SITE_CONTACT.email}</a>
          </p>
          <p>
            Phone:{" "}
            {phoneHref ? (
              <a href={phoneHref}>{SITE_CONTACT.phone.display}</a>
            ) : (
              SITE_CONTACT.phone.display
            )}
          </p>
        </div>
      </div>
      <div className="footer-links">
        <Link href="/inventory">Availability</Link>
        <Link href="/services">Services</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
}
