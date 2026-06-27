import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import ContactForm, { ContactSidebar } from "@/components/ContactForm";
import FaqSection from "@/components/FaqSection";
import PageHero from "@/components/PageHero";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
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
      <PageHero
        eyebrow="Get in touch"
        title="Contact Cedar Creek Farms"
        description={settings.contact_page_intro ?? ""}
      />

      <ScrollReveal as="section" className="section">
        <StaggerContainer className="contact-layout">
          <StaggerItem>
            <ContactForm />
          </StaggerItem>
          <StaggerItem>
            <ContactSidebar />
          </StaggerItem>
        </StaggerContainer>
      </ScrollReveal>

      <ServiceAreaSection compact />
      <FaqSection title="Common questions" />
    </PublicLayout>
  );
}
