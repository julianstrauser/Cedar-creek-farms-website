import type { Metadata } from "next";
import PublicLayout from "@/components/PublicLayout";
import ContactForm, { ContactSidebar } from "@/components/ContactForm";
import { ScrollReveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Cedar Creek Farms for current tree pricing, availability, and transplanting questions.",
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <ScrollReveal as="section" className="page-hero compact">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact Cedar Creek Farms</h1>
        <p>
          For current pricing, availability, or questions about trees, please
          contact us directly. Availability is updated regularly, but pricing may
          vary depending on tree type, size, quantity, and delivery needs.
        </p>
      </ScrollReveal>

      <ScrollReveal as="section" className="section contact-layout">
        <ContactForm />
        <ContactSidebar />
      </ScrollReveal>
    </PublicLayout>
  );
}
