import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import ContactForm, { ContactSidebar } from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import { ScrollReveal } from "@/components/motion";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contact Cedar Creek Farms | Pricing & Availability",
  description:
    "Contact Cedar Creek Farms for current tree pricing, availability, and transplanting questions.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <PublicLayout>
      <ScrollReveal as="section" className="page-hero compact">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact Cedar Creek Farms</h1>
        <p>{settings.contact_page_intro}</p>
      </ScrollReveal>

      <ScrollReveal as="section" className="section contact-layout">
        <ContactForm />
        <ContactSidebar />
      </ScrollReveal>

      <ServiceAreaSection compact />
      <FaqSection title="Common questions" />
    </PublicLayout>
  );
}
