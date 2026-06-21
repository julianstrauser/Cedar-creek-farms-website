/** Cedar Creek Farms public contact details — update phone when available. */
export const SITE_CONTACT = {
  email: "cedarcreekfarmstx@gmail.com",
  /** Replace display and tel when the owner phone number is ready. Example: display: "(512) 555-1234", tel: "+15125551234" */
  phone: {
    display: "[OWNER PHONE NUMBER]",
    tel: null as string | null,
  },
} as const;

export const PRICING_HELPER_TEXT =
  "Contact us for current pricing, size options, and availability.";

export function contactEmailHref() {
  return `mailto:${SITE_CONTACT.email}`;
}

export function contactPhoneHref() {
  return SITE_CONTACT.phone.tel ? `tel:${SITE_CONTACT.phone.tel}` : null;
}

export function pricingInquiryMailto(treeName: string) {
  const subject = encodeURIComponent(`Pricing Question About ${treeName}`);
  return `mailto:${SITE_CONTACT.email}?subject=${subject}`;
}
