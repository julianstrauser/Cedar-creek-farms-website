"use client";

import Link from "next/link";
import Image from "next/image";
import SiteFooterLinks from "@/components/SiteFooterLinks";
import { useSiteSettings } from "@/components/SiteSettingsProvider";
import { settingsEmailHref, settingsPhoneHref } from "@/lib/settings-defaults";

export default function SiteFooter() {
  const settings = useSiteSettings();
  const phoneHref = settingsPhoneHref(settings);

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <Link className="brand footer-brand" href="/">
          <Image src="/assets/logo.svg" alt="" width={42} height={42} unoptimized />
          <span>{settings.business_name}</span>
        </Link>
        <p>{settings.footer_note}</p>
        <p className="muted footer-service-area">{settings.service_area}</p>
        <div className="footer-contact">
          <p>
            Email:{" "}
            <a href={settingsEmailHref(settings)}>{settings.contact_email}</a>
          </p>
          <p>
            Phone:{" "}
            {phoneHref ? (
              <a href={phoneHref}>{settings.phone_display}</a>
            ) : (
              settings.phone_display
            )}
          </p>
        </div>
        {settings.facebook_url || settings.instagram_url ? (
          <div className="footer-social">
            {settings.facebook_url ? (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            ) : null}
            {settings.instagram_url ? (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      <SiteFooterLinks />
    </footer>
  );
}
