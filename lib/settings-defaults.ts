import { SITE_CONTACT } from "@/lib/contact";
import type { SiteSettings } from "@/lib/types";

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: "main",
  business_name: "Cedar Creek Farms",
  contact_email: SITE_CONTACT.email,
  phone_display: SITE_CONTACT.phone.display,
  phone_tel: SITE_CONTACT.phone.tel,
  service_area: "West Texas and surrounding areas",
  contact_page_intro:
    "For current pricing, availability, or questions about trees, please contact us directly. Availability is updated regularly, but pricing may vary depending on tree type, size, quantity, and delivery needs.",
  footer_note: "Contact for current pricing and availability.",
  facebook_url: null,
  instagram_url: null,
  updated_at: new Date(0).toISOString(),
};

export function settingsPhoneHref(settings: SiteSettings) {
  return settings.phone_tel ? `tel:${settings.phone_tel}` : null;
}

export function settingsEmailHref(settings: SiteSettings) {
  return `mailto:${settings.contact_email}`;
}
